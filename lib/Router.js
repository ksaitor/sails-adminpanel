"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const processInstallStep_1 = __importDefault(require("../controllers/processInstallStep"));
const processInstallFinalize_1 = __importDefault(require("../controllers/processInstallFinalize"));
const dashboard_1 = __importDefault(require("../controllers/dashboard"));
const welcome_1 = __importDefault(require("../controllers/welcome"));
const list_1 = __importDefault(require("../controllers/list"));
const listJson_1 = __importDefault(require("../controllers/listJson"));
const edit_1 = __importDefault(require("../controllers/edit"));
const add_1 = __importDefault(require("../controllers/add"));
const view_1 = __importDefault(require("../controllers/view"));
const remove_1 = __importDefault(require("../controllers/remove"));
const upload_1 = __importDefault(require("../controllers/upload"));
const ckeditorUpload_1 = __importDefault(require("../controllers/ckeditorUpload"));
const form_1 = __importDefault(require("../controllers/form"));
const normalizeNavigationConfig_1 = __importDefault(require("../controllers/normalizeNavigationConfig"));
const bindPolicies_1 = __importDefault(require("../lib/bindPolicies"));
const switch_1 = require("../controllers/widgets/switch");
const widgetHandler_1 = require("./widgets/widgetHandler");
const widgetHandler_2 = require("./widgets/widgetHandler");
const Info_1 = require("../controllers/widgets/Info");
const Action_1 = require("../controllers/widgets/Action");
const Custom_1 = require("../controllers/widgets/Custom");
const utils_decorators_1 = require("utils-decorators");
const Catalog_1 = require("../controllers/catalog/Catalog");
let Router = (() => {
    var _a;
    let _staticExtraInitializers = [];
    let _static_bind_decorators;
    return _a = class Router {
            /**
             * The idea is that all methods within the first 3 seconds after start call this method, and as soon as all have been loaded, the loading will be blocked
             */
            static bind() {
                if (this.onlyOnce) {
                    sails.log.error(`This method allowed for run only one time`);
                    return;
                }
                /**
                 * List or one policy that should be bound to actions
                 * @type {string|Array}
                 */
                let config = sails.config.adminpanel;
                let policies = config.policies || "";
                /**
                 * Widgets All
                 */
                sails.router.bind(`${config.routePrefix}/widgets-get-all`, (0, bindPolicies_1.default)(policies, widgetHandler_1.getAllWidgets));
                /**
                 * Widgets All from DB
                 */
                sails.router.bind(`${config.routePrefix}/widgets-get-all-db`, (0, bindPolicies_1.default)(policies, widgetHandler_2.widgetsDB));
                /**
                 * Widgets Switch
                 */
                sails.router.bind(`${config.routePrefix}/widgets-switch/:widgetId`, (0, bindPolicies_1.default)(policies, switch_1.widgetSwitchController));
                /**
                 * Widgets Info
                 */
                sails.router.bind(`${config.routePrefix}/widgets-info/:widgetId`, (0, bindPolicies_1.default)(policies, Info_1.widgetInfoController));
                /**
                 * Widgets Action
                 */
                sails.router.bind(`${config.routePrefix}/widgets-action/:widgetId`, (0, bindPolicies_1.default)(policies, Action_1.widgetActionController));
                /**
                 * Widgets Custom
                 */
                sails.router.bind(`${config.routePrefix}/widgets-action/:widgetId`, (0, bindPolicies_1.default)(policies, Custom_1.widgetCustomController));
                /**
                 * Module Install Stepper
                 * */
                sails.router.bind(`${config.routePrefix}/install/:id`, (0, bindPolicies_1.default)(policies, processInstallStep_1.default));
                sails.router.bind(`${config.routePrefix}/install/:id/finalize`, (0, bindPolicies_1.default)(policies, processInstallFinalize_1.default));
                /**
                 * Edit form
                 * */
                sails.router.bind(`${config.routePrefix}/form/:slug`, (0, bindPolicies_1.default)(policies, form_1.default));
                // upload files to form
                sails.router.bind(`${config.routePrefix}/form/:slug/upload`, (0, bindPolicies_1.default)(policies, upload_1.default));
                //Create a base entity route
                let baseRoute = config.routePrefix + "/:entityType/:entityName";
                /**
                 * Do widget helper functions (for now only one case handled)
                 * @todo for custom widgets api we will have to create universal controller that will call methods from any custom widgets
                 */
                sails.router.bind(baseRoute + "/widget", (0, bindPolicies_1.default)(policies, normalizeNavigationConfig_1.default));
                /**
                * Catalog
                */
                sails.router.bind(`${config.routePrefix}/catalog/:slug/:id`, (0, bindPolicies_1.default)(policies, Catalog_1.catalogController));
                sails.router.bind(`${config.routePrefix}/catalog/:slug`, (0, bindPolicies_1.default)(policies, Catalog_1.catalogController));
                /**
                 * List of records
                 */
                sails.router.bind(baseRoute, (0, bindPolicies_1.default)(policies, list_1.default));
                if (config.models) {
                    for (let model of Object.keys(config.models)) {
                        /**
                         * Create new record
                         */
                        if (config.models[model].add) {
                            let addHandler = config.models[model].add;
                            if (addHandler.controller) {
                                let controller = require(addHandler.controller);
                                sails.router.bind(`${config.routePrefix}/model/${model}/add`, (0, bindPolicies_1.default)(policies, controller.default));
                            }
                            else {
                                sails.router.bind(`${config.routePrefix}/model/${model}/add`, (0, bindPolicies_1.default)(policies, add_1.default));
                            }
                        }
                        else {
                            sails.router.bind(`${config.routePrefix}/model/${model}/add`, (0, bindPolicies_1.default)(policies, add_1.default));
                        }
                        /**
                         * Edit existing record
                         */
                        if (config.models[model].edit) {
                            let editHandler = config.models[model].edit;
                            if (editHandler.controller) {
                                let controller = require(editHandler.controller);
                                sails.router.bind(`${config.routePrefix}/model/${model}/edit/:id`, (0, bindPolicies_1.default)(policies, controller.default));
                            }
                            else {
                                sails.router.bind(`${config.routePrefix}/model/${model}/edit/:id`, (0, bindPolicies_1.default)(policies, edit_1.default));
                            }
                        }
                        else {
                            sails.router.bind(`${config.routePrefix}/model/${model}/edit/:id`, (0, bindPolicies_1.default)(policies, edit_1.default));
                        }
                    }
                }
                /**
                 * View record details
                 */
                sails.router.bind(baseRoute + "/view/:id", (0, bindPolicies_1.default)(policies, view_1.default));
                sails.router.bind(baseRoute + "/json", (0, bindPolicies_1.default)(policies, listJson_1.default));
                /**
                 * Remove record
                 */
                sails.router.bind(baseRoute + "/remove/:id", (0, bindPolicies_1.default)(policies, remove_1.default));
                /**
                 * Upload files
                 */
                sails.router.bind(baseRoute + "/upload", (0, bindPolicies_1.default)(policies, upload_1.default));
                /**
                 * Upload images CKeditor5
                 */
                sails.router.bind(`${baseRoute}/ckeditor5/upload`, (0, bindPolicies_1.default)(policies, ckeditorUpload_1.default));
                /**
                 * Create a default dashboard
                 * @todo define information that should be shown here
                 */
                if (Boolean(config.dashboard)) {
                    sails.router.bind(config.routePrefix, (0, bindPolicies_1.default)(policies, dashboard_1.default));
                }
                else {
                    sails.router.bind(config.routePrefix, (0, bindPolicies_1.default)(policies, welcome_1.default));
                }
                sails.emit("adminpanel:router:binded");
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _static_bind_decorators = [(0, utils_decorators_1.debounce)(5000)];
            __esDecorate(_a, null, _static_bind_decorators, { kind: "method", name: "bind", static: true, private: false, access: { has: obj => "bind" in obj, get: obj => obj.bind }, metadata: _metadata }, null, _staticExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a.onlyOnce = (__runInitializers(_a, _staticExtraInitializers), false),
        _a;
})();
exports.default = Router;
