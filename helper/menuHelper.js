"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuHelper = void 0;
/**
 * Menu helper
 *
 * @constructor
 */
let _ = require("lodash"); // заменить lodash реджексом
class MenuHelper {
    constructor(config) {
        MenuHelper.config = config;
    }
    /**
     * Checks if brand exists
     *
     * @returns {boolean}
     */
    static hasBrand() {
        return Boolean(this.config.menu && this.config.menu.brand);
    }
    /**
     * Get menu brand link
     *
     * @returns {string}
     */
    static getBrandLink() {
        if (!this.config.menu || !this.config.menu.brand || typeof this.config.menu.brand !== "object" ||
            !this.config.menu.brand.link) {
            return '/admin';
        }
        return this.config.menu.brand.link;
    }
    /**
     * Get menu brand title
     *
     * @returns {string}
     */
    static getBrandTitle() {
        if (!this.config.menu || !this.config.menu.brand) {
            return 'Sails-adminpanel';
        }
        if (typeof this.config.menu.brand === "string") {
            return this.config.menu.brand;
        }
        if (typeof this.config.menu.brand === "object" && typeof this.config.menu.brand.title === "string") {
            return this.config.menu.brand.title;
        }
        return 'Sails-adminpanel';
    }
    /**
     * Check if global actions buttons added to action
     *
     * @param {Object} instanceConfig
     * @param {string=} [action] Defaults to `list`
     * @returns {boolean}
     */
    static hasGlobalActions(instanceConfig, action) {
        action = action || 'list';
        if (!instanceConfig[action] || !instanceConfig[action].actions || !instanceConfig[action].actions.global) {
            return false;
        }
        let actions = instanceConfig[action].actions.global;
        return actions.length > 0;
    }
    /**
     * Check if inline actions buttons added to action
     *
     * @param {Object} instanceConfig
     * @param {string=} [action] Defaults to `list`
     * @returns {boolean}
     */
    static hasInlineActions(instanceConfig, action) {
        action = action || 'list';
        if (!instanceConfig[action] || !instanceConfig[action].actions || !instanceConfig[action].actions.inline) {
            return false;
        }
        let actions = instanceConfig[action].actions.inline;
        return actions.length > 0;
    }
    /**
     * Get list of custom global buttons for action
     *
     * @param {Object} instanceConfig
     * @param {string=} [action]
     * @returns {Array}
     */
    static getGlobalActions(instanceConfig, action) {
        // TODO: fix this
        // action = action || 'list';
        // if (!this.hasGlobalActions(instanceConfig, action)) {
        //     return [];
        // }
        // return instanceConfig[action].actions.global;
        return;
    }
    /**
     * Get list of custom inline buttons for action
     *
     * @param {Object} instanceConfig
     * @param {string=} [action]
     * @returns {Array}
     */
    static getInlineActions(instanceConfig, action) {
        action = action || 'list';
        if (!this.hasInlineActions(instanceConfig, action)) {
            return [];
        }
        return instanceConfig[action].actions.inline;
    }
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
    static replaceModelFields(url, model) {
        // TODO: fix this
        // // Check for model existence
        // if (!model) {
        //     return url;
        // }
        // let words = _.words(url, /\:+[a-z\-_]*/gi);
        // // Replacing props
        // words.forEach(function(word) {
        //     let variable = word.replace(':', '');
        //     if (model && model[variable]) {
        //         url = url.replace(word, model[variable]);
        //     }
        // });
        //
        // return url;
        return;
    }
    /**
     * Will create a list of groups to show
     *
     * @returns {Array}
     */
    static getGroups() {
        let groups = this.config.menu.groups || [];
        groups.forEach(function (group, idx) {
            if (!group.key)
                return;
            // Clear menus to avoid data duplication
            groups[idx].menues = [];
            MenuHelper.config.instances.forEach(function (val, key) {
                if (val.menuGroup && val.menuGroup == group.key) {
                    groups[idx].menues.push({
                        link: MenuHelper.config.routePrefix + '/' + key,
                        title: val.title,
                        icon: val.icon || null
                    });
                }
            });
            if (MenuHelper.config.menu.actions && MenuHelper.config.menu.actions.length > 0) {
                MenuHelper.config.menu.actions.forEach(function (menu) {
                    if (!menu.link || !menu.title || !menu.menuGroup || menu.menuGroup != group.key) {
                        return;
                    }
                    groups[idx].menues.push({
                        link: menu.link,
                        title: menu.title,
                        icon: menu.icon || null
                    });
                });
            }
        });
        return groups;
    }
    /**
     * Get list of instance menus that was not bound to groups
     *
     * @returns {Array}
     */
    static getMenuItems() {
        let menus = [];
        this.config.instances.forEach(function (val, key) {
            if (val.menuGroup) {
                return;
            }
            if (val.actions && val.actions.length > 0 && val.actions[0].title !== "Overview") {
                val.actions.unshift({
                    link: MenuHelper.config.routePrefix + '/' + key,
                    title: "Overview",
                    icon: ""
                });
            }
            menus.push({
                link: MenuHelper.config.routePrefix + '/' + key,
                title: val.title,
                icon: val.icon || null,
                actions: val.actions || null,
                id: val.id || val.title.replace(" ", "_"),
                instanceName: key
            });
        });
        if (this.config.menu.actions && this.config.menu.actions.length > 0) {
            this.config.menu.actions.forEach(function (menu) {
                if (!menu.link || !menu.title || menu.menuGroup || menu.disabled) {
                    return;
                }
                menus.push({
                    link: menu.link,
                    title: menu.title,
                    id: menu.id || menu.title.replace(" ", "_"),
                    icon: menu.icon || null
                });
            });
        }
        return menus;
    }
}
exports.MenuHelper = MenuHelper;
