import { AdminUtil } from "../lib/adminUtil";
import { FieldsHelper } from "../helper/fieldsHelper";

export default async function list(req, res) {
    let instance = AdminUtil.findInstanceObject(req);
    if (!instance.model) {
        return res.notFound();
    }

    let fields = FieldsHelper.getFields(req, instance, 'list');

    res.viewAdmin({
        instance: instance,
        fields: fields,
        config: sails.adminpanel
    });

};
