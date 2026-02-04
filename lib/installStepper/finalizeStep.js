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
const InstallStepAbstract_1 = __importDefault(require("./InstallStepAbstract"));
const path = __importStar(require("path"));
const installStepper_1 = require("./installStepper");
class FinalizeStep extends InstallStepAbstract_1.default {
    constructor() {
        super(...arguments);
        this.canBeSkipped = false;
        this.description = '';
        this.ejsPath = path.resolve(__dirname, '../../views/ejs/installer/partials/finalize.ejs');
        this.id = 'finalize';
        this.scriptsUrl = '';
        this.sortOrder = 0;
        this.stylesUrl = '';
        this.title = 'Finalize Step';
        this.badge = '';
        this.isSkipped = false;
        this.settingsKeys = [];
        this.renderer = "ejs";
        this.isProcessed = false;
    }
    async check() {
        if (this.isProcessed) {
            return true;
        }
        else {
            let installStepper = installStepper_1.InstallStepper.getInstance();
            if (!installStepper.hasUnfinalizedSteps()) {
                this.canBeSkipped = true;
            }
        }
    }
    async process(data) {
        let installStepper = installStepper_1.InstallStepper.getInstance();
        if (!installStepper.hasUnfinalizedSteps()) {
            this.isProcessed = true;
        }
    }
    async skip() {
        let installStepper = installStepper_1.InstallStepper.getInstance();
        if (!installStepper.hasUnfinalizedSteps()) {
            this.isProcessed = true;
        }
    }
    finally() {
        return;
    }
    toFinally() {
        return;
    }
}
exports.default = FinalizeStep;
