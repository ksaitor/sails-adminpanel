"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = bindDev;
exports.autoExposeModels = autoExposeModels;
function bindDev(adminpanelConfig) {
    if (adminpanelConfig.models) {
        Object.keys(sails.models).forEach((modelname) => {
            let modelName = sails.models[modelname].globalId;
            adminpanelConfig.models[`dev-${modelName}`] = {
                title: `dev-${modelName}`,
                model: modelName,
                icon: "cube"
            };
        });
    }
}
/**
 * Auto-expose all models with default configuration
 * This allows you to focus on hiding/customizing models instead of defining them all
 *
 * @param adminpanelConfig - The adminpanel configuration object
 */
function autoExposeModels(adminpanelConfig) {
    // Initialize models object if it doesn't exist
    if (!adminpanelConfig.models) {
        adminpanelConfig.models = {};
    }
    // Get the list of models to exclude (defaults to internal adminpanel models)
    const excludeModels = adminpanelConfig.excludeModels || ['userap', 'groupap', 'archive'];
    // Get the list of attributes to hide globally
    const hideAttributes = adminpanelConfig.hideAttributes || [];
    Object.keys(sails.models).forEach((modelname) => {
        const model = sails.models[modelname];
        const modelName = model.globalId;
        // Skip if model doesn't have a globalId
        if (!modelName) {
            return;
        }
        // Skip if model is in exclusion list (case-insensitive)
        if (excludeModels.some(excluded => excluded.toLowerCase() === modelname.toLowerCase())) {
            return;
        }
        // Skip if model is already configured (don't override user config)
        if (adminpanelConfig.models[modelname]) {
            return;
        }
        // Create a human-readable title from model name
        const title = modelName
            .replace(/([A-Z])/g, ' $1') // Add space before capital letters
            .trim()
            .replace(/^./, str => str.toUpperCase()); // Capitalize first letter
        // Build fields configuration by reading model attributes
        const fields = {};
        if (model.attributes) {
            Object.keys(model.attributes).forEach((attrName) => {
                // Skip globally hidden attributes
                if (hideAttributes.includes(attrName)) {
                    return;
                }
                const attr = model.attributes[attrName];
                // Create a human-readable field title
                const fieldTitle = attrName
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/_/g, ' ')
                    .trim()
                    .replace(/^./, str => str.toUpperCase());
                fields[attrName] = {
                    title: fieldTitle
                };
            });
        }
        // Auto-generate the model configuration
        adminpanelConfig.models[modelname] = {
            title: title,
            model: modelName,
            icon: "cube",
            list: {
                fields: fields
            },
            add: {
                fields: fields
            },
            edit: {
                fields: fields
            }
        };
    });
}
