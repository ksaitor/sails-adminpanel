"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adminUtil_1 = require("../lib/adminUtil");
const accessRightsHelper_1 = require("../helper/accessRightsHelper");
async function editGroup(req, res) {
    let instance = adminUtil_1.AdminUtil.findInstanceObject(req);
    //Check id
    if (!req.param('id')) {
        return res.notFound();
    }
    let users;
    try {
        users = await UserAP.find({ isAdministrator: false }).populate("groups");
    }
    catch (e) {
        sails.log.error(e);
    }
    let group;
    try {
        group = await GroupAP.findOne(req.param('id')).populate("users");
    }
    catch (e) {
        req._sails.log.error('Admin edit error: ');
        req._sails.log.error(e);
        return res.serverError();
    }
    let departments = accessRightsHelper_1.AccessRightsHelper.getAllDepartments();
    let groupedTokens = {};
    for (let department of departments) {
        groupedTokens[department] = accessRightsHelper_1.AccessRightsHelper.getTokensByDepartment(department);
    }
    let reloadNeeded = false;
    if (req.method.toUpperCase() === 'POST') {
        console.log(req.body);
        let allTokens = accessRightsHelper_1.AccessRightsHelper.getTokens();
        let usersInThisGroup = [];
        let tokensOfThisGroup = [];
        for (let key in req.body) {
            if (key.startsWith("user-checkbox-") && req.body[key] === "on") {
                for (let user of users) {
                    if (user.id == key.slice(14)) {
                        usersInThisGroup.push(user.id);
                    }
                }
            }
            if (key.startsWith("token-checkbox-") && req.body[key] === "on") {
                for (let token of allTokens) {
                    if (token.id == key.slice(15)) {
                        tokensOfThisGroup.push(token.id);
                    }
                }
            }
        }
        let updatedGroup;
        try {
            updatedGroup = await GroupAP.update({ id: group.id }, { name: req.body.name, description: req.body.description,
                users: usersInThisGroup, tokens: tokensOfThisGroup }).fetch();
        }
        catch (e) {
            sails.log.error(e);
        }
        reloadNeeded = true;
        console.log("Updated Group", updatedGroup);
    }
    if (reloadNeeded) {
        try {
            group = await GroupAP.findOne(req.param('id')).populate("users");
        }
        catch (e) {
            req._sails.log.error('Admin edit error: ');
            req._sails.log.error(e);
            return res.serverError();
        }
        try {
            users = await UserAP.find({ isAdministrator: false }).populate("groups");
        }
        catch (e) {
            sails.log.error(e);
        }
    }
    console.log("GROUP", group);
    return res.viewAdmin("editGroup", { instance: instance, group: group, users: users, groupedTokens: groupedTokens });
}
exports.default = editGroup;
;
