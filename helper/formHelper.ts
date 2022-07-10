import * as path from "path";
import * as fs from "fs";

export class FormHelper {
    private static _forms = sails.config.adminpanel.generator ? sails.config.adminpanel.generator.forms : null;

    public static async update(slug: string, data: object): Promise<void> {
        // custom setter
        if (sails.config.adminpanel.generator.set) {
            return sails.config.adminpanel.generator.set(slug, data);
        }

        for (let field in data) {
            try {
                this._forms[slug][field].value = JSON.parse(data[field])
            } catch (e) {
                this._forms[slug][field].value = data[field]
            }
        }

        this.updateFormFile(`${process.cwd()}/.tmp/forms`, slug, this._forms[slug])
    }

    public static get(slug: string): object {
        let form = {};

        // custom getter
        if (sails.config.adminpanel.generator.get) {
            form = sails.config.adminpanel.generator.get(slug)
            return form;
        }

        if (!this._forms[slug]) {
            return
        }

        for (let field in this._forms[slug]) {
            form[field] = this._forms[slug][field];
            if (process.env[`${slug}_${field}`]) {
                form[field].value = process.env[`${slug}_${field}`];
            }
        }

        return form
    }

    public static loadForms(formsPath: string): void {

        try {
            let formsDirectoryPath = path.resolve(formsPath);
            let forms = fs.readdirSync(formsDirectoryPath).filter(function (file) {
                return path.extname(file).toLowerCase() === ".json";
            });

            for (let form of forms) {
                try {
                    let jsonData = require(`${formsDirectoryPath}/${form}`)
                    sails.config.adminpanel.generator.forms[path.basename(form, '.json')] = jsonData;
                } catch (error) {
                    sails.log.error(`Adminpanel > Error when reading ${form}.json: ${error}`);
                }
            }
        } catch (e) {
            sails.log.error("Adminpanel > Error when loading forms", e)
        }
    }

    public static updateFormFile(formsPath: string, slug: string, data: object): void {
        try {
            let formsDirectoryPath = path.resolve(formsPath);

            try {
                fs.writeFileSync(`${formsDirectoryPath}/${slug}.json`, JSON.stringify(data))
            } catch (error) {
                sails.log.error(`Adminpanel > Error when updating ${slug}.json: ${error}`);
            }
        } catch (e) {
            sails.log.error("Adminpanel > Error when loading forms", e)
        }
    }
}
