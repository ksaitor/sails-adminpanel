import {AccessRightsHelper} from "../helper/accessRightsHelper";
import {FormHelper} from "../helper/formHelper";

export default async function form(req, res) {
    let slug = req.param('slug');

    //Check slug
    if (!slug) {
        return res.notFound();
    }

    if (sails.config.adminpanel.auth) {
        if (!req.session.UserAP) {
            return res.redirect(`${sails.config.adminpanel.routePrefix}/model/userap/login`);
        } else if (!AccessRightsHelper.havePermission(`update-${slug}-form`, req.session.UserAP)) {
            return res.sendStatus(403);
        }
    }

    for (let prop in req.body) {
        try {
            req.body[prop] = JSON.parse(req.body[prop]);
        } catch (e) {
            if (typeof req.body[prop] === "string" && req.body[prop].replace(/(\r\n|\n|\r|\s{2,})/gm, "") &&
                e.message !== "Unexpected end of JSON input" && !/Unexpected (token .|number) in JSON at position \d/.test(e.message)) {
                sails.log.error(JSON.stringify(req.body[prop]), e);
            }
        }
    }

    let form = await FormHelper.get(slug);

    if (!form) {
        return res.status(404).send("Adminpanel > Form not found")
    }


    if (req.method.toUpperCase() === 'POST') {

        if (!req.body) {
            return res.status(500).send("Data is empty")
        }


        for (let field of Object.keys(req.body)) {
            // false is undefined 
            if (form[field].type === "boolean" && !req.body[field]) {
                await sails.config.adminpanel.forms.set(slug, field, false);
            } else {
                await sails.config.adminpanel.forms.set(slug, field, req.body[field])
            }
        }
    }

    for (let key of Object.keys(form)) {
        try {
            form[key].value = await sails.config.adminpanel.forms.get(slug, key);
        } catch (e) {
            sails.log.silly(`'${slug}' property was not found in storage, using source file`)
        }
    }

    res.viewAdmin("form", {formData: form, slug: slug});
};
