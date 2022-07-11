import { AdminUtil } from "../lib/adminUtil";
import { RequestProcessor } from "../lib/requestProcessor";
import { FieldsHelper } from "../helper/fieldsHelper";
import { CreateUpdateConfig } from "../interfaces/adminpanelConfig";
import {AccessRightsHelper} from "../helper/accessRightsHelper";

export default async function edit(req, res) {
    //Check id
    if (!req.param('id')) {
        return res.notFound();
    }

    console.log("REQ", req.body)

    let entity = AdminUtil.findEntityObject(req);
    if (!entity.model) {
        return res.notFound();
    }

    if (!entity.config.edit) {
        return res.redirect(entity.uri);
    }

    if (sails.config.adminpanel.auth) {
        if (!req.session.UserAP) {
            return res.redirect(`${sails.config.adminpanel.routePrefix}/userap/login`);
        } else if (!AccessRightsHelper.havePermission(`update-${entity.name}-entity`, req.session.UserAP)) {
            return res.sendStatus(403);
        }
    }

    let record;
    try {
        record = await entity.model.findOne(req.param('id')).populateAll();
    } catch(e) {
        req._sails.log.error('Admin edit error: ');
        req._sails.log.error(e);
        return res.serverError();
    }

    let fields = FieldsHelper.getFields(req, entity, 'edit');
    let reloadNeeded = false;

    fields = await FieldsHelper.loadAssociations(fields);

    if (req.method.toUpperCase() === 'POST') {
        let reqData = RequestProcessor.processRequest(req, fields);
        let params = {};
        params[entity.config.identifierField || req._sails.config.adminpanel.identifierField] = req.param('id');

        for (let prop in reqData) {
            if (Number.isNaN(reqData[prop]) || reqData[prop] === undefined || reqData[prop] === null) {
                delete reqData[prop]
            }

            if (fields[prop] && fields[prop].model && fields[prop].model.type === 'json' && reqData[prop] !== '') {
                try {
                    reqData[prop] = JSON.parse(reqData[prop]);
                } catch (e) {
                    if (typeof reqData[prop] === "string" && reqData[prop].replace(/(\r\n|\n|\r|\s{2,})/gm, "")) {
                        sails.log.error(JSON.stringify(reqData[prop]), e);
                    }
                }
            }

            // delete whitespace characters from association-many and association
            if (fields[prop] && fields[prop].model && (fields[prop].model.type === 'association-many' || fields[prop].model.type === 'association')) {
                if (!reqData[prop]) {
                    reqData[prop] = "null";
                }
            }

            // split string for association-many
            if (fields[prop] && fields[prop].model && fields[prop].model.type === 'association-many' && reqData[prop]) {
                reqData[prop] = reqData[prop].split(",")
            }
        }

        // callback before save entity
        let entityEdit = entity.config.edit as CreateUpdateConfig;
        if (typeof entityEdit.entityModifier === "function") {
            reqData = entityEdit.entityModifier(reqData);
        }

        try {
            let newRecord = await entity.model.update(params, reqData).fetch();
            sails.log(`Record was updated: `, newRecord);
            req.session.messages.adminSuccess.push('Your record was updated !');
            reloadNeeded = true;
        } catch (e) {
            req._sails.log.error(e);
            req.session.messages.adminError.push(e.message || 'Something went wrong...');
            return e;
        }
    }

    if (reloadNeeded) {
        try {
            record = await entity.model.findOne(req.param('id')).populateAll();
        } catch (e) {
            req._sails.log.error('Admin edit error: ');
            req._sails.log.error(e);
            return res.serverError();
        }
    }

    res.viewAdmin({
        entity: entity,
        record: record,
        fields: fields
    });
};
