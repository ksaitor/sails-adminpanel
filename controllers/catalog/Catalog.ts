import {CatalogHandler} from "./CatalogHandler";
import {AccessRightsHelper} from "../../helper/accessRightsHelper";

export async function catalogController(req, res) {
	if (sails.config.adminpanel.auth) {
		if (!req.session.UserAP) {
			return res.redirect(`${sails.config.adminpanel.routePrefix}/model/userap/login`);
		}
	}
	const slug = req.param('slug');
	const id = req.param('id') ? req.param('id') : '';
	const method = req.method.toUpperCase();
	if (method === 'GET') {
		return res.viewAdmin('catalog', {entity: "entity", slug: slug, id: id});
	}
	if (method === 'POST' || method === 'PUT') {
		const data = req.body
		const catalog = CatalogHandler.getCatalog(slug)
		catalog.setID(id)
		const item = catalog.getItemType(data.type)
		switch (method) {
			case 'POST':
				switch (data._method) {
					case 'getHTML':
						return res.json(catalog.getAddHTML(item))
					case 'getCatalog':
						return res.json({
							'items': catalog.getItems(),
							'catalog': await catalog.getCatalog()
						})
					case 'createItem':
						return res.json({'data': await catalog.createItem(item, data.data)})
					case 'getChilds':
						return res.json({data: await catalog.getChilds(data.data)})
				}
				break;
			case 'PUT':
				switch (data._method) {
					case 'sortOrder':
						return res.json({data: await catalog.setSortOrder(data.data)})
				}
		}
	}
}

export async function getAction(req, res) {
	if (sails.config.adminpanel.auth) {
		if (!req.session.UserAP) {
			return res.redirect(`${sails.config.adminpanel.routePrefix}/model/userap/login`);
		}
	}
	const method = req.method.toUpperCase();
	if (method === 'POST') {
		const body = req.body
		const catalog = CatalogHandler.getCatalog(body.slug)
	}
}
