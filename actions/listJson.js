"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adminUtil_1 = require("../lib/adminUtil");
const fieldsHelper_1 = require("../helper/fieldsHelper");
const configHelper_1 = require("../helper/configHelper");
async function listJson(req, res) {
    let instance = adminUtil_1.AdminUtil.findInstanceObject(req);
    if (!instance.model) {
        return res.notFound();
    }
    if (!sails.adminpanel.havePermission(req, instance.config, __filename)) {
        return res.redirect("/admin/userap/login");
    }
    if (sails.config.adminpanel.auth) {
        req.locals.user = req.session.UserAP;
    }
    let records = [];
    let fields = fieldsHelper_1.FieldsHelper.getFields(req, instance, 'list');
    let query;
    try {
        query = await instance.model.find();
    }
    catch (e) {
        sails.log.error(e);
    }
    fieldsHelper_1.FieldsHelper.getFieldsToPopulate(fields).forEach(function (val) {
        query.populate(val);
    });
    records = await waterlineExec(query);
    let identifierField = configHelper_1.ConfigHelper.getIdentifierField(instance.config.model);
    let keyFields = Object.keys(fields);
    let result = [];
    records.forEach((instance) => {
        let a = [];
        a.push(instance[identifierField]); // Push ID for Actions
        keyFields.forEach((key) => {
            let fieldData = "";
            let displayField = fields[key].config.displayField;
            if (fields[key].model.model) {
                if (!instance[key]) {
                    fieldData = "";
                }
                else {
                    // Model
                    fieldData = instance[key][displayField];
                }
            }
            else if (fields[key].model.collection) {
                if (!instance[key] || !instance[key].length) {
                    fieldData = "";
                }
                else {
                    // Collection
                    instance[key].forEach((item) => {
                        if (fieldData !== "")
                            fieldData += ", ";
                        fieldData += !item[displayField] ? item[fields[key].config.identifierField] : item[displayField];
                    });
                }
            }
            else {
                // Plain data
                fieldData = instance[key];
            }
            if (typeof fields[key].config.displayModifier === "function") {
                a.push(fields[key].config.displayModifier(fieldData));
            }
            else {
                a.push(fieldData);
            }
        });
        result.push(a);
    });
    res.json({
        data: result
    });
}
exports.default = listJson;
;
async function waterlineExec(query) {
    return new Promise((resolve, reject) => {
        query.exec(function (err, records) {
            if (err)
                reject(err);
            resolve(records);
        });
    });
}
