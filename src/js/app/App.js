import { log } from "../helpers/DevTools.js";
import { makeUi } from '../providers/UiProvider.js';
import { makeDevTools } from '../providers/DevToolsProvider.js';

const Fs = require('fs');
const Path = require('path');
const NwGui = require('nw.gui');

/**
 * Application.
 *
 * @class
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

        if (this.isDevEnv()) {
            this.devTools = makeDevTools();
            this.devTools.showChromeDevTools();
            this.devTools.startFileWatcher();
        }

        $(() => {
            // init. the app's UI as soon as DOM is ready

            makeUi().init();
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
     * @protected
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
     * @protected
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

        log('Current environment based on the .env file -', this._env);
    }
}

