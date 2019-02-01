const Fs = require('fs'),
      Path = require('path'),
      NwGui = require('nw.gui');

import { Ui } from '/src/js/app/Ui.js';
import { Router } from '/src/js/app/Router.js';
import { DevTools } from '/src/js/helpers/DevTools.js';
import { PackageJson } from '/src/js/helpers/PackageJson.js';
import { ClientNwjs } from '/src/js/helpers/client/ClientNwjs.js';
import { ComponentFactory } from '/src/js/features/pages/factories/ComponentFactory.js';

/**
 * Application.
 *
 * @class
 * @constructor
 * @public
 * @property {DevTools} devTools
 * @property {Ui} ui
 * @property {Router} router
 * @property {PackageJson} packageJson
 * @property {string} _env
 * @property {bool} _envIsDev
 */
export class App {
    /**
     * Constructor.
     */
    constructor() {
        this._clearHtmlCache();

        this._loadEnv();

        this.packageJson = new PackageJson(this);

        if (this.isDevEnv()) {
            this.devTools = new DevTools(this);
            this.devTools.showChromeDevTools();
            this.devTools.startFileWatcher();
        }

        this.client = new ClientNwjs();
        this.ui = new Ui(this);
        this.router = new Router(this);
        $(() => {
            this._initUi();
        });
    }

    /**
     * Return if current env. is dev.
     */
    isDevEnv() {
        return this._envIsDev;
    }

    /**
     * Return if current env. is prod.
     */
    isProdEnv() {
        return !this._envIsDev;
    }

    /**
     * Clear HTML cached in Chrome, so the app. would always show the latest version.
     */
    _clearHtmlCache() {
        NwGui.App.clearCache();
        for (const module in global.require.cache){
            delete global.require.cache[module];
        }
    }

    /**
     * Init. logic affecting UI or working with DOM.
     */
    _initUi() {
        this.client.path$.subscribe((path) => {
            console.log('URL path has changed', path);

            const urlPath = this.client.getPath();
            const route = this.router.getRouteByPath(urlPath);
            const comp = ComponentFactory.createComponent(route.component, this);

            comp.state.subscribe((state) => {
                console.log('Component state has changed', state);

                this.ui.renderTemplate(route.template, state);
                comp.onInit();
            });
        });
    }

    /**
     * Read /.env file and set env. of the app. to it, otherwise use "production" be default.
     */
    _loadEnv() {
        const baseDir = process.cwd();
        const envPath = Path.join(baseDir, '/.env');

        if (Fs.existsSync(envPath)) {
            this._env = Fs.readFileSync(envPath, 'utf8');
        } else {
            this._env = 'production';
        }

        this._envIsDev = (this._env === 'development');

        console.log('Current env based on /.env file', this._env);
    }
}

