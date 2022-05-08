import { AdminUtil } from "../lib/adminUtil";

export default async function remove(req, res) {
    //Checking id of the record
    if (!req.param('id')) {
        req._sails.log.error(new Error('Admin panel: No id for record provided'));
        return res.notFound();
    }

    let instance = AdminUtil.findInstanceObject(req);
    if (!instance.model) {
        req._sails.log.error(new Error('Admin panel: no model found'));
        return res.notFound();
    }

    if (!instance.config.remove) {
        return res.redirect(instance.uri);
    }

    if (!sails.adminpanel.havePermission(req, instance.config, __filename)) {
        return res.redirect('/admin/userap/login');
    }

    if (sails.config.adminpanel.auth) {
        req.locals.user = req.session.UserAP;
    }

    /**
     * Searching for record by model
     */
    let record;
    try {
        record = await instance.model.findOne(req.param('id'));
    } catch (e) {
        if (req.wantsJSON) {
            return res.json({
                success: false,
                message: e.message
            });
        }
        return res.serverError(e);
    }

    if (!record) {
        let msg = 'Admin panel: No record found with id: ' + req.param('id');
        if (req.wantsJSON) {
            return res.json({
                success: false,
                message: msg
            });
        }
        return res.notFound();
    }
    console.log('admin > remove > record > ', record);

    let destroyedRecord;
    try {
        destroyedRecord = await instance.model.destroyOne(record[instance.config.identifierField || req._sails.config.adminpanel.identifierField]);
    } catch (e) {
        sails.log.error('adminpanel > error', e);
    }

    if (destroyedRecord) {
        req.flash('adminSuccess', 'Record was removed successfully');
    } else {
        req.flash('adminError', 'Record was not removed');
    }

    res.redirect(instance.uri);
};
