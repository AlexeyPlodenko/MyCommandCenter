const Fs = require('fs'),
      Path = require('path');

import { Ui } from '/src/js/app/Ui.mjs';

/**
 * Responsible for routing URL to components.
 *
 * @class
 * @constructor
 * @public
 * @property {Object} _routes
 * @property {App} _app
 * @property {BehaviorSubject} path
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

        // an empty path means a page not found, which should not be possible to call manually
        if (urlPath === '') {
            urlPath = '/';
        }

        // remove slash duplicates, just in case
        urlPath = urlPath.replace(/\/+$/, '/');

        const routes = this._app.packageJson.getRoutes();

        let route;
        if (urlPath in routes) {
            route = routes[urlPath];
        } else {
            route = routes[''];
        }

        return route;
    }
}
