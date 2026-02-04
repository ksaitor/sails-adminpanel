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
exports.FormHelper = void 0;
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
class FormHelper {
    static async get(slug) {
        if (sails.config.adminpanel.forms && sails.config.adminpanel.forms !== null) {
            return sails.config.adminpanel.forms.data[slug];
        }
    }
    static async loadForms(formsPath) {
        try {
            let formsDirectoryPath = path.resolve(formsPath);
            let forms = fs.readdirSync(formsDirectoryPath).filter(function (file) {
                return path.extname(file).toLowerCase() === ".json";
            });
            for (let formJson of forms) {
                if (path.extname(formJson).toLowerCase() !== ".json") {
                    continue;
                }
                let form = path.basename(formJson, '.json');
                try {
                    let jsonData = require(`${formsDirectoryPath}/${formJson}`);
                    sails.config.adminpanel.forms.data[form] = jsonData;
                }
                catch (error) {
                    sails.log.error(`Adminpanel > Error when reading ${formJson}: ${error}`);
                }
            }
        }
        catch (e) {
            sails.log.error("Adminpanel > Error when loading forms", e);
        }
    }
}
exports.FormHelper = FormHelper;
