import { AdminUtil } from "../lib/adminUtil";
import { FieldsHelper } from "../helper/fieldsHelper";
import { ConfigHelper } from "../helper/configHelper";
import {AccessRightsHelper} from "../helper/accessRightsHelper";

export default async function listJson(req, res) {
    let entity = AdminUtil.findEntityObject(req);
    if (!entity.model) {
        return res.notFound();
    }

    if (sails.config.adminpanel.auth) {
        if (!req.session.UserAP) {
            return res.redirect(`${sails.config.adminpanel.routePrefix}/model/userap/login`);
        } else if (!AccessRightsHelper.havePermission(`read-${entity.name}-model`, req.session.UserAP)) {
            return res.sendStatus(403);
        }
    }

    let records: any = [];
    let fields = FieldsHelper.getFields(req, entity, 'list');

    let query;
    try {
        // adminpanel design do not support list of more than 50000 lines per request
        // !TODO take off this limit :)
        query = entity.model.find({}).limit(50000);
    } catch (e) {
        sails.log.error(e);
    }

    FieldsHelper.getFieldsToPopulate(fields).forEach(function(val) {
        query.populate(val);
    });

    records = await waterlineExec(query);

    let identifierField = ConfigHelper.getIdentifierField(entity.config.model);
    let keyFields = Object.keys(fields);
    let result = [];

    records.reverse().forEach((entity) => {
        let a = [];
        a.push(entity[identifierField]); // Push ID for Actions
        keyFields.forEach((key) => {
            let fieldData = "";
            let displayField = fields[key].config.displayField;
            if(fields[key].model.model){
                if (!entity[key]){
                    fieldData = ""
                } else {
                    // Model
                    fieldData = entity[key][displayField];
                }
            } else if (fields[key].model.collection) {
                if (!entity[key] || !entity[key].length) {
                    fieldData = ""
                }
                else {
                    // Collection
                    entity[key].forEach((item)=>{
                        if (fieldData !== "") fieldData += ", "
                        fieldData += !item[displayField] ? item[fields[key].config.identifierField] : item[displayField];
                    })
                }

            } else {
                // Plain data
                fieldData = entity[key];
            }

            if (typeof fields[key].config.displayModifier === "function") {
                a.push(fields[key].config.displayModifier(entity[key]));
            } else {
                a.push(fieldData);
            }
        });
        result.push(a);
    });

    res.json({
        data: result
    });
};

async function waterlineExec(query) {
    return new Promise((resolve, reject) => {
        query.exec(function(err, records) {
            if (err) reject(err);
            resolve(records)
        });
    });
}
