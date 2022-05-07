/**
 * Will generate dashboard controller
 *
 * @param {*} req
 * @param {*} res
 * @returns {dashboardController}
 */
export default function(req, res) {
    if (!req.session.UserAP && sails.config.adminpanel.auth) {
        return res.redirect('/admin/userap/login');
    }

    if (sails.config.adminpanel.auth) {
        req.locals.user = req.session.UserAP;
    }

    return res.viewAdmin('dashboard', { instance: "instance"});
};
