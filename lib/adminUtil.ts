import {Entity} from "../interfaces/types";
import {EntityConfig} from "../interfaces/adminpanelConfig";
import ORMModel from "../interfaces/ORMModel";

export class AdminUtil {

    /**
     * Default configuration for entity
     *
     * @see AdminUtil.findConfig
     */
    private static _defaultEntityConfig = {
        list: true,
        add: true,
        edit: true,
        remove: true,
        view: true
    };

    /**
     * Default configs that will be returned for action. If nothing exists in config file.
     *
     * @see AdminUtil.findActionConfig
     */
    private static _defaultActionConfig = {
        fields: {}
    };

    /**
     * Check if given entity config has all required properties
     *
     * @param {Object} config
     * @returns {boolean}
     * @private
     */
    private static _isValidEntityConfig(config) {
        return (typeof config === "object" && typeof config.model === "string");
    };

    /**
     * Normalizing entity config.
     * Will return fulfilled configuration object.
     *
     * @see AdminUtil._isValidEntityConfig
     * @param {Object} config
     * @returns {Object}
     * @private
     */
    private static _normalizeEntityConfig(config) {
        if (!this._isValidEntityConfig(config)) {
            sails.log.error('Wrong entity configuration, using default');
            config = {};
        }
        config = {...this._defaultEntityConfig, ...config};

        //Check limits
        if (typeof config.list === "boolean") {
            config.list = {
                limit: 15
            };
        }
        if (typeof config.list.limit !== "number") {
            config.list.limit = 15;
        }
        return config;
    };

    /**
     * Normalize action config object
     *
     * @param {Object} config
     * @returns {Object}
     * @private
     */
    private static _normalizeActionConfig(config) {
        //Adding fields
        config.fields = config.fields || {};
        return {...this._defaultActionConfig, ...config};
    };

    /**
     * Get admin panel config
     *
     * @returns {Object}
     */
    public static config() {
        return sails.config.adminpanel || {};
    }

    /**
     * Get model from system
     *
     * @param {string} name
     * @returns {?Model}
     */
    public static getModel(name: string): ORMModel {
        //Getting model
        // console.log('admin > model > ', sails.models);
        let Model = sails.models[name.toLowerCase()];
        if (!Model) {
            if (!sails) {
                console.log('No model found in sails.');
            } else {
                sails.log.error('No model found in sails.');
            }
            return null;
        }
        return Model;
    }

    /**
     * Get entity name
     *
     * @param {Request} req
     * @returns {?string}
     */
    public static findEntityName(req): string {
      if (!req.param('entity')) {
          let entityName = req.originalUrl.split('/')[2];
          if (!this.config().entities || !this.config().entities[entityName]) {
              return null;
          } else {
              return entityName
          }
      }
      return req.param('entity');
    };

    /**
     * Searches for config from admin panel
     *
     * @param {Request} req
     * @param {String} entityName
     * @returns {?Object}
     */
    public static findEntityConfig(req, entityName): EntityConfig {
        if (!this.config().entities || !this.config().entities[entityName]) {
            req._sails.log.error('No such route exists');
            return null;
        }
        return this._normalizeEntityConfig(this.config().entities[entityName] || {});
    }

    /**
     * Will get action config from configuration file depending to given action
     *
     * Config will consist of all configuration props from config file.
     *
     * @example
     *
     *  {
     *      'fields': {
     *          name: 'Name',
     *          email: true,
     *          anotherField: {
     *              title: 'Another field',
     *              //... some more options here
     *          }
     *      }
     *  }
     *
     * @throws {Error} if req or actionType not passed
     * @param {Object} entity Entity object with `name`, `config`, `model` {@link AdminUtil.findEntityObject}
     * @param {string} actionType Type of action that config should be loaded for. Example: list, edit, add, remove, view.
     * @returns {Object} Will return object with configs or default configs.
     */
    public static findActionConfig(entity, actionType) {
        if (!entity || !actionType) {
            throw new Error('No `entity` or `actionType` passed !');
        }
        let result = {...this._defaultActionConfig};
        if (!entity.config || !entity.config[actionType]) {
            return result;
        }
        /**
         * Here we could get true/false so need to update it to Object for later manipulations
         * In this function
         */
        if (typeof entity.config[actionType] === "boolean") {
            return result;
        }
        return this._normalizeActionConfig(entity.config[actionType]);
    }

    /**
     * Trying to find model by request
     *
     * @see AdminUtil._isValidEntityConfig
     * @param {Request} req
     * @param {Object} entityConfig
     * @returns {?Model}
     */
    public static findModel(req, entityConfig): ORMModel {
        if (!this._isValidEntityConfig(entityConfig)) {
            return null;
        }
        return this.getModel(entityConfig.model);
    }

    /**
     * Will create entity object from request.
     *
     * Entity Object will have this format:
     *
     * @example
     * ```javascript
     * {
     *  name: 'user',
     *  model: Model,
     *  config: { ... },
     *  uri: ''
     * }
     * ```
     *
     * @param req
     * @returns {Object}
     */
    public static findEntityObject(req): Entity {
        let entityName = this.findEntityName(req);
        let entityConfig = this.findEntityConfig(req, entityName);
        let entityModel = this.findModel(req, entityConfig);
        let entityUri = this.config().routePrefix + '/' + entityName;
        return {
            name: entityName,
            config: entityConfig,
            model: entityModel,
            uri: entityUri,
            type: "model"
        };
    }
}
