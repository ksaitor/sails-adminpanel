"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = bindForms;
const fs = __importStar(require("fs"));
const formHelper_1 = require("../helper/formHelper");
async function bindForms() {
    // and try to load from sails.config.adminpanel.forms.path
    if (fs.existsSync(sails.config.adminpanel.forms.path)) {
        let formsDir = fs.readdirSync(sails.config.adminpanel.forms.path);
        if (formsDir.length) {
            formHelper_1.FormHelper.loadForms(`${process.cwd()}/${sails.config.adminpanel.forms.path}`);
        }
    }
    sails.after(["hook:orm:loaded"], async () => {
        // Seeding forms data
        for (let form in sails.config.adminpanel.forms.data) {
            for (let key in sails.config.adminpanel.forms.data[form]) {
                if (await sails.config.adminpanel.forms.get(form, key) === undefined) {
                    await sails.config.adminpanel.forms.set(form, key, sails.config.adminpanel.forms.data[form][key].value);
                }
            }
        }
    });
}
