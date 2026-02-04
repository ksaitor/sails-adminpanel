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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const bindTranslations_1 = __importDefault(require("./bindTranslations"));
const bindAuthorization_1 = __importDefault(require("./bindAuthorization"));
const bindAccessRights_1 = __importDefault(require("./bindAccessRights"));
const bindDev_1 = __importStar(require("./bindDev"));
const bindForms_1 = __importDefault(require("./bindForms"));
const bindDashboardWidgets_1 = __importDefault(require("./bindDashboardWidgets"));
const Router_1 = __importDefault(require("./Router"));
async function default_1() {
    // Binding list of function for rendering
    require('./bindResView').default();
    // bind config for views
    require('./bindConfig').default();
    //@ts-ignore
    if (sails.config.adminpanel.instances) {
        sails.log.warn('\x1b[33m%s\x1b[0m', "sails.config.adminpanel.instances is deprecated");
        sails.log.warn('\x1b[33m%s\x1b[0m', "use sails.config.adminpanel.models instead");
        sails.log.warn('\x1b[33m%s\x1b[0m', "sails.config.adminpanel.instances will not be supported anymore in version 3.0.0");
        sails.log.warn('\x1b[33m%s\x1b[0m', "!!! sails.config.adminpanel.models replaced by sails.config.adminpanel.instances !!!");
        //@ts-ignore
        sails.config.adminpanel.models = { ...sails.config.adminpanel.instances };
        //@ts-ignore
        delete sails.config.adminpanel.instances;
    }
    // Auto-expose all models if enabled
    if (sails.config.adminpanel.autoExposeModels === true) {
        (0, bindDev_1.autoExposeModels)(sails.config.adminpanel);
    }
    if ((process.env.DEV && process.env.NODE_ENV !== 'production') || process.env.ADMINPANEL_FORCE_BIND_DEV === "TRUE") {
        (0, bindDev_1.default)(sails.config.adminpanel);
    }
    sails.on('lifted', async function () {
        //binding all routes.
        Router_1.default.bind();
    });
    (0, bindForms_1.default)();
    (0, bindDashboardWidgets_1.default)();
    //bind access rights
    (0, bindAccessRights_1.default)();
    //binding authorization
    await (0, bindAuthorization_1.default)();
    if (sails.hooks.i18n && sails.hooks.i18n.appendLocale) {
        sails.after(["hook:i18n:loaded"], async () => {
            (0, bindTranslations_1.default)();
        });
    }
    else {
        sails.config.adminpanel.translation = false;
    }
    sails.after(["hook:i18n:loaded"], async () => {
        (0, bindTranslations_1.default)();
    });
    /**
     * AfterHook emit
     * This call is used so that other hooks can know that the admin panel is present in the panel and has been loaded, and can activate their logic.
     */
    sails.emit('Adminpanel:afterHook:loaded');
    return;
}
;
