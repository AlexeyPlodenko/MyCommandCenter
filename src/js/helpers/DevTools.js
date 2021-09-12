import { makePackageJson } from '../providers/PackageJsonProvider.js';

const Fs = require('fs');
const NwGui = require('nw.gui');
const Path = require('path');

/**
 * DevTools.
 *
 * @class
 * @constructor
 * @public
 * @property {App} _app
 * @property {Array} _reloadWatchers
 */
export class DevTools {
    /**
     * Opens Chrome Dev. Tools.
     */
    showChromeDevTools() {
        // blank dev. tools shown? Do npm install nw --nwjs_build_type=sdk
        // https://github.com/nwjs/nw.js/issues/4383
		NwGui.Window.get().showDevTools();
    }

    /**
     * Starts a watcher, that reloads the window, if a file change will be detected.
     */
    startFileWatcher() {
        const baseDir = process.cwd();

        this._reloadWatchers = [];

        const watchPaths = makePackageJson().getDevRoutesWatch();
        for (let i = watchPaths.length - 1; i >= 0; i--) {
            const path = Path.join(baseDir, watchPaths[i]);

            console.log('Live reload started for path', path);

            this._reloadWatchers[i] = Fs.watch(path, {recursive: true}, (evType, filename) => {
                if (filename) {
                    console.log('Live change detected in file', filename ,'. Reloading...');

                    for (let i = this._reloadWatchers.length - 1; i >= 0; i--) {
                        this._reloadWatchers[i].close();
                    }

                    window.location.reload(true);
                }
            });
        }
    }
}

/**
 * @param  {...any} params
 */
export function log(...params) {
    console.log(...params);
}

/**
 * @param  {...any} params
 */
export function logError(...params) {
    console.error(...params);
}
