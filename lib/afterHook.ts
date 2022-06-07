import bindTranslations from "./bindTranslations";
import bindAuthorization from './bindAuthorization';
import bindAccessRights from "./bindAccessRights";

export default async function () {
    // Binding list of function for rendering
    require('./bindResView').default();

    // bind config for views
    require('./bindConfig').default();

    //binding all routes.
    require('./bindRoutes').default();

    //bind access rights
    bindAccessRights();

    //binding authorization
    await bindAuthorization();

    if (sails.hooks.i18n && sails.hooks.i18n.appendLocale) {
        sails.after(["hook:i18n:loaded"], async () => {
            await bindTranslations();
        })
    }
    return
};
