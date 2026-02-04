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
exports.default = bindTranslations;
const translationHelper_1 = require("../helper/translationHelper");
const fs = __importStar(require("fs"));
function bindTranslations() {
    // load adminpanel translations
    translationHelper_1.TranslationHelper.loadTranslations(`${sails.config.adminpanel.rootPath}/translations`);
    if (typeof sails.config.adminpanel.translation === 'boolean') {
        if (sails.config.adminpanel.translation === true) {
            sails.log.warn("sails.config.adminpanel.translation is TRUE, is not mater");
        }
        return;
    }
    if (fs.existsSync(sails.config.adminpanel.translation.path)) {
        let translationsDir = fs.readdirSync(sails.config.adminpanel.translation.path);
        if (translationsDir.length) {
            // load project translations
            translationHelper_1.TranslationHelper.loadTranslations(`${process.cwd()}/${sails.config.adminpanel.translation.path}`);
        }
    }
}
