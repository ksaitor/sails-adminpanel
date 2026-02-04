"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let attributes = {
    name: { type: 'string', required: true, unique: true },
    description: 'string',
    tokens: { type: 'json' },
    users: { collection: 'userap', via: 'groups' },
};
let model = {
    beforeCreate: (item, next) => {
        return next();
    },
};
module.exports = {
    attributes: attributes,
    ...model,
};
