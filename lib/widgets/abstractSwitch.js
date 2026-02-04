"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstractWidgetBase_1 = __importDefault(require("./abstractWidgetBase"));
class SwitchBase extends abstractWidgetBase_1.default {
    constructor() {
        super(...arguments);
        this.widgetType = "switcher";
    }
}
exports.default = SwitchBase;
