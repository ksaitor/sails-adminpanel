import { AdminUtil } from "../lib/adminUtil";
let request = require('../lib/requestProcessor');
import { FieldsHelper } from "../helper/fieldsHelper";

export default async function edit(req, res) {
    //Check id
    if (!req.param('id')) {
        return res.notFound();
    }

    let instance = AdminUtil.findInstanceObject(req);
    if (!instance.model) {
        return res.notFound();
    }

    if (!instance.config.edit) {
        return res.redirect(instance.uri);
    }

    if (!sails.adminpanel.havePermission(req, instance.config, __filename)) {
        return res.redirect('/admin/userap/login');
    }

    if (sails.config.adminpanel.auth) {
        req.locals.user = req.session.UserAP;
    }

    let record;
    try {
        record = await instance.model.findOne(req.param('id')).populateAll();
    } catch(e) {
        req._sails.log.error('Admin edit error: ');
        req._sails.log.error(e);
        return res.serverError();
    }

    let fields = FieldsHelper.getFields(req, instance, 'edit');
    let reloadNeeded = false;

    fields = await FieldsHelper.loadAssociations(fields);

    if (req.method.toUpperCase() === 'POST') {
        let reqData = request.processRequest(req, fields);
        let params = {};
        params[instance.config.identifierField || req._sails.config.adminpanel.identifierField] = req.param('id');

        for (let prop in reqData) {
            if (Number.isNaN(reqData[prop]) || reqData[prop] === undefined || reqData[prop] === null) {
                delete reqData[prop]
            }

            if (fields[prop] && fields[prop].model && fields[prop].model.type === 'json' && reqData[prop] !== '') {
                try {
                    reqData[prop] = JSON.parse(reqData[prop]);
                } catch (e) {
                    sails.log.error(e);
                }
            }
        }

        // callback before save instance
        if (typeof instance.config.edit.instanceModifier === "function") {
            reqData = instance.config.edit.instanceModifier(reqData);
        }

        try {
            let newRecord = await instance.model.update(params, reqData).fetch();
            sails.log(`Record was updated: ${newRecord}`);
            req.flash('adminSuccess', 'Your record was updated !');
            reloadNeeded = true;
        } catch (e) {
            req._sails.log.error(e);
            req.flash('adminError', e.message || 'Something went wrong...');
            return e;
        }
    }

    if (reloadNeeded) {
        try {
            record = await instance.model.findOne(req.param('id')).populateAll();
        } catch (e) {
            req._sails.log.error('Admin edit error: ');
            req._sails.log.error(e);
            return res.serverError();
        }
    }

    res.viewAdmin({
        instance: instance,
        record: record,
        fields: fields
    });
};
