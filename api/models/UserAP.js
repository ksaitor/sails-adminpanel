"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let passwordHash = require('password-hash');
let attributes = {
    // id: {
    //     type:'integer',
    //     primaryKey: true,
    //     autoIncrement: true
    // },
    username: {
        type: 'string',
    },
    password: {
        type: 'string'
    },
    passwordHashed: {
        type: 'string'
    },
    permission: {
        type: 'json'
    }
};
let model = {
    beforeCreate: (values, next) => {
        values.passwordHashed = passwordHash.generate(values.username + values.password);
        values.password = '';
        return next();
    }
    /** ... Any model methods here ... */
};
module.exports = {
    primaryKey: "id",
    attributes: attributes,
    ...model,
};
