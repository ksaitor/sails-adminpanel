export declare class MenuHelper {
    private static config;
    constructor(config: any);
    /**
     * Checks if brand exists
     *
     * @returns {boolean}
     */
    static hasBrand(): any;
    /**
     * Get menu brand link
     *
     * @returns {string}
     */
    static getBrandLink(): any;
    /**
     * Get menu brand title
     *
     * @returns {string}
     */
    getBrandTitle(): any;
    /**
     * Check if global actions buttons added to action
     *
     * @param {Object} ModelConfig
     * @param {string=} [action] Defaults to `list`
     * @returns {boolean}
     */
    hasGlobalActions(ModelConfig: any, action: any): boolean;
    /**
     * Check if inline actions buttons added to action
     *
     * @param {Object} ModelConfig
     * @param {string=} [action] Defaults to `list`
     * @returns {boolean}
     */
    hasInlineActions(ModelConfig: any, action: any): boolean;
    /**
     * Get list of custom global buttons for action
     *
     * @param {Object} ModelConfig
     * @param {string=} [action]
     * @returns {Array}
     */
    getGlobalActions(ModelConfig: any, action: any): any;
    /**
     * Get list of custom inline buttons for action
     *
     * @param {Object} ModelConfig
     * @param {string=} [action]
     * @returns {Array}
     */
    getInlineActions(ModelConfig: any, action: any): any;
    /**
     * Replace fields in given URL and binds to model fields.
     *
     * URL can contain different properties from given model in such notation `:propertyName`.
     * If model wouldn't have such property it will be left as `:varName`
     *
     * @param {string} url URL with list of variables to replace '/admin/test/:id/:title/'
     * @param {Object} model
     * @returns {string}
     */
    static replaceModelFields(url: any, model: any): any;
    /**
     * Get list of entity menus that was not bound to groups
     *
     * @returns {Array}
     */
    getMenuItems(): any[];
}
