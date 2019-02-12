const Fs = require('fs'),
      NwGui = require('nw.gui'),
      Path = require('path');

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
     * Constructor.
     *
     * @param {App} app
     */
    constructor(app) {
        this._app = app;
    }

    /**
     * Opens Chrome Dev. Tools.
     */
    showChromeDevTools() {
		NwGui.Window.get().showDevTools();
    }

    /**
     * Starts a watcher, that reloads the window, if a file change will be detected.
     */
    startFileWatcher() {
        const baseDir = process.cwd();

        this._reloadWatchers = [];

        const watchPaths = this._app.packageJson.getDevRoutesWatch();
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
