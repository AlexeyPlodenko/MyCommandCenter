const Fs = require('fs'),
      Path = require('path');

import { Ui } from '/src/js/app/Ui.mjs';
import { Router } from '/src/js/app/Router.mjs';
import { DevTools } from '/src/js/helpers/DevTools.mjs';
import { PackageJson } from '/src/js/helpers/PackageJson.mjs';
import { ClientNwjs } from '/src/js/helpers/client/ClientNwjs.mjs';
import { ComponentFactory } from '/src/js/features/pages/factories/ComponentFactory.mjs';

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
        const baseDir = process.cwd();

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

        this.client.path$.subscribe((path) => {
            console.log('URL path has changed', path);
            
            const urlPath = this.client.getPath();
            const route = this.router.getRouteByPath(urlPath);
            const comp = ComponentFactory.createComponent(route.component, this);

            comp.state.subscribe((state) => {
                console.log('Component state has changed', state);
                
                this.ui.renderTemplate(route.template, state);
            });
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

