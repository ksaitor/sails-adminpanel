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
exports.default = bindPolicies;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
sails.after(["hook:policies:loaded"], () => {
    // write out policies to config
    try {
        let policiesDir = fs.readdirSync(__dirname + "/../policies");
        for (let policy of policiesDir) {
            if (path.extname(policy).toLowerCase() === ".js") {
                let policyFile = require(__dirname + "/../policies/" + policy);
                if (typeof policyFile === "function" && Array.isArray(sails.config.adminpanel.policies)) {
                    sails.config.adminpanel.policies.push(policyFile);
                }
                else {
                    sails.log.error(`Adminpanel > Policy ${policyFile} is not a function`);
                }
            }
        }
    }
    catch (e) {
        sails.log.error("Adminpanel > Could not load policies", e);
    }
});
function bindPolicies(policies, action) {
    /**
     * Bind policy to action
     *
     * @param {string|function} policy
     */
    function bindPolicy(policy) {
        if (typeof policy === "function") {
            result.push(policy);
            return;
        }
        else if (typeof policy === "string") {
            //Check for policy existence
            if (!sails.hooks.policies.middleware[policy.toLowerCase()]) {
                sails.log.error("AdminPanel: No policy exist: " + policy);
            }
            else {
                result.push(sails.hooks.policies.middleware[policy.toLowerCase()]);
            }
        }
        else {
            sails.log.error("AdminPanel: Policy format unknown: " + policy);
        }
    }
    ;
    let result = [];
    if (Array.isArray(policies)) {
        policies.forEach(bindPolicy);
    }
    else {
        bindPolicy(policies);
    }
    if (result.length === 0) {
        return action;
    }
    result.push(action);
    return result;
}
