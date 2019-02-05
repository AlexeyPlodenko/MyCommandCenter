import { log, DevTools } from '../helpers/DevTools.js';
import { Ui } from './Ui.js';
import { Router } from './Router.js';
import { PackageJson } from '../helpers/PackageJson.js';
import { ClientNwjs } from '../helpers/client/ClientNwjs.js';
import { ComponentFactory } from '../factories/ComponentFactory.js';

const Fs = require('fs'),
      Path = require('path'),
      NwGui = require('nw.gui');

/**
 * Application.
 *
 * @class
 * @property {DevTools} devTools
 * @property {Ui} ui
 * @property {Router} router
 * @property {PackageJson} packageJson
 * @property {ComponentFactory} componentFactory
 * @property {string} _env
 * @property {boolean} _envIsDev
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
        this.componentFactory = new ComponentFactory(this);
        $(() => {
            this.ui.init();
        });
    }

    /**
     * Return if current env. is dev.
     * 
     * @returns {boolean}
     */
    isDevEnv() {
        return this._envIsDev;
    }

    /**
     * Return if current env. is prod.
     * 
     * @returns {boolean}
     */
    isProdEnv() {
        return !this._envIsDev;
    }

    /**
     * Clear HTML cached in Chrome, so the app. would always show
     * the latest version.
     */
    _clearHtmlCache() {
        NwGui.App.clearCache();
        for (const module in global.require.cache){
            delete global.require.cache[module];
        }
    }
    /**
     * Read /.env file and set env. of the app. to it, otherwise
     * use "production" be default.
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

        log('Current environment based on .env file - ', this._env);
    }
}

