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
exports.default = bindDashboardWidgets;
const widgetHandler_1 = require("./widgets/widgetHandler");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
async function bindDashboardWidgets() {
    if (sails.config.adminpanel.dashboard && typeof sails.config.adminpanel.dashboard !== "boolean" && sails.config.adminpanel.dashboard.autoloadWidgetsPath) {
        try {
            const files = fs.readdirSync(sails.config.adminpanel.dashboard.autoloadWidgetsPath);
            const jsFiles = files.filter(file => file.endsWith('.js'));
            for (const file of jsFiles) {
                const filePath = path.join(process.cwd(), sails.config.adminpanel.dashboard.autoloadWidgetsPath, file);
                try {
                    const _import = require(filePath);
                    if (_import.default) {
                        const ImportedClass = _import.default;
                        const instance = new ImportedClass();
                        widgetHandler_1.WidgetHandler.add(instance);
                    }
                }
                catch (error) {
                    sails.log.error(`Error when connecting and creating an instance of a class from a file ${filePath}:`, error);
                }
            }
        }
        catch (err) {
            sails.log.error('Error reading folder:', err);
        }
    }
}
