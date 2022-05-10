import * as serveStatic from 'serve-static';
import * as path from "path";

export default function(sails: any) {
    sails.hooks.http.app.use('/admin/assets', serveStatic(path.join(__dirname, '../assets')));
};
