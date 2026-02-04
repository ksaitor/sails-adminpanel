'use strict';
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
exports.FileStorageHelper = void 0;
const fs = __importStar(require("fs"));
class FileStorageHelper {
    static _init() {
        if (!fs.existsSync(`${process.cwd()}/.tmp`)) {
            fs.mkdirSync(`${process.cwd()}/.tmp`);
        }
        if (fs.existsSync(`${process.cwd()}/${this._filePath}`)) {
            let rawStorage = fs.readFileSync(`${process.cwd()}/${this._filePath}`, "utf-8");
            try {
                this._storage = JSON.parse(rawStorage);
                this._isInitialized = true;
            }
            catch (e) {
                throw new Error("Couldn't read storage file: " + e);
            }
        }
    }
    static get(slug, key) {
        if (!this._isInitialized) {
            this._init();
        }
        if (this._storage[slug]) {
            return this._storage[slug][key];
        }
        else {
            return undefined;
        }
    }
    static set(slug, key, value) {
        if (!this._storage[slug]) {
            this._storage[slug] = {};
        }
        this._storage[slug][key] = value;
        fs.writeFileSync(this._filePath, JSON.stringify(this._storage));
    }
}
exports.FileStorageHelper = FileStorageHelper;
FileStorageHelper._storage = {};
FileStorageHelper._filePath = ".tmp/adminpanel_file_storage.json";
FileStorageHelper._isInitialized = false;
