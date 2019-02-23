/**
 * Responsible for routing URL to components.
 *
 * @class
 * @property {App} _app
 */
export class Router {
    /**
     * Constructor
     *
     * @param {App} app
     */
    constructor(app) {
        this._app = app;
    }

    /**
     * Get route based on the path.
     *
     * @param {String} urlPath
     * @returns {Object}
     */
    getRouteByPath(urlPath) {
        // remove trailing slash, just in case
        urlPath = urlPath.replace(/\/*$/, '');

        // an empty path means a page not found,
        // which should not be possible to call manually
        if (urlPath === '') {
            urlPath = '/';
        }

        // remove slash duplicates, just in case
        urlPath = urlPath.replace(/\/+$/, '/');

        const routes = this._app.packageJson.getRoutes();

        let route;
        if (routes.hasOwnProperty(urlPath)) {
            route = routes[urlPath];
        } else {
            route = routes[''];
        }

        return route;
    }
}
