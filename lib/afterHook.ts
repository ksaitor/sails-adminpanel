import bindTranslations from "./bindTranslations";
import bindAuthorization from './bindAuthorization';
import bindAccessRights from "./bindAccessRights";
import bindDev from "./bindDev";
import bindForms from "./bindForms";
import {FileStorageHelper} from "../helper/fileStorageHelper";

export default async function () {
    // Binding list of function for rendering
    require('./bindResView').default();

    // bind config for views
    require('./bindConfig').default();

    if (!sails.config.adminpanel.models && sails.config.adminpanel.instances) {
        sails.log.warn('\x1b[33m%s\x1b[0m', "sails.config.adminpanel.instances is deprecated")
        sails.log.warn('\x1b[33m%s\x1b[0m', "use sails.config.adminpanel.models instead")
        sails.log.warn('\x1b[33m%s\x1b[0m', "sails.config.adminpanel.instances will not be supported anymore in version 3.0.0")
        sails.config.adminpanel.models = {...sails.config.adminpanel.instances}
        delete sails.config.adminpanel.instances;
    }

    if (process.env.DEV && process.env.NODE_ENV !== 'production') {
        bindDev(sails.config.adminpanel)
    }

    sails.on('lifted', async function() {
        //binding all routes.
        require('./bindRoutes').default();
    })

    //bind access rights
    bindAccessRights();

    //binding authorization
    await bindAuthorization();

    // binding forms from files
    bindForms();

    if (sails.hooks.i18n && sails.hooks.i18n.appendLocale) {
        sails.after(["hook:i18n:loaded"], async () => {
            bindTranslations();
        })
    } else {
        sails.config.adminpanel.translation = false
    }
    return
};
