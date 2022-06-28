import {AccessRightsHelper} from "../helper/accessRightsHelper";

export default function bindAccessRights() {
    if (sails.config.adminpanel.instances) {
        let instances = sails.config.adminpanel.instances;
        for (let key of Object.keys(instances)) {
            let department = `Section ${key}`;

            // create
            AccessRightsHelper.registerToken({id: `create-${key}-instance`, name: "Create",
                description: "Access to creating record in database", department: department});

            // read
            AccessRightsHelper.registerToken({id: `read-${key}-instance`, name: "Read",
                description: "Access to reading records in database", department: department});

            // update
            AccessRightsHelper.registerToken({id: `update-${key}-instance`, name: "Update",
                description: "Access to updating records in database", department: department});

            // delete
            AccessRightsHelper.registerToken({id: `delete-${key}-instance`, name: "Delete",
                description: "Access to deleting records in database", department: department});
        }
    }

    if (sails.config.adminpanel.forms && sails.config.adminpanel.forms.data) {
        let forms = sails.config.adminpanel.forms.data;
        for (let key of Object.keys(forms)) {
            let department = `Form ${key}`;

            // create
            AccessRightsHelper.registerToken({id: `create-${key}-form`, name: "Create",
                description: "Access to creating form in database", department: department});

            // read
            AccessRightsHelper.registerToken({id: `read-${key}-form`, name: "Read",
                description: "Access to reading form in database", department: department});

            // update
            AccessRightsHelper.registerToken({id: `update-${key}-form`, name: "Update",
                description: "Access to updating form in database", department: department});

            // delete
            AccessRightsHelper.registerToken({id: `delete-${key}-form`, name: "Delete",
                description: "Access to deleting form in database", department: department});
        }
    }
}
