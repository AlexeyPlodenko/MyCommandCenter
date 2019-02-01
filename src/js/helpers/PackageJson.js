const Fs = require('fs'),
      Path = require('path');

/**
 * PackageJson.
 *
 * @class
 * @constructor
 * @public
 * @property {Object} _packageData
 */
export class PackageJson {
    /**
     * Constructor.
     *
     * @param {App} app
     */
    constructor(app) {
        this._loadPackageJson();
    }

    /**
     * Return routes from package.json.
     *
     * @returns {String|Array|Object|Number}
     */
    getRoutes() {
        return this._getByKey('routes');
    }

    /**
     * Return devRoutesWatch from package.json.
     *
     * @returns {String[]}
     */
    getDevRoutesWatch() {
        return this._getByKey('devRoutesWatch');
    }

    /**
     * @param {String} keyName
     * @returns {Array|Object|String|Number}
     */
    _getByKey(keyName) {
        return this._packageData[keyName];
    }

    /**
     * Read /package.json file, parse it and keep for later usage.
     */
    _loadPackageJson() {
        const baseDir = process.cwd();
        const packagePath = Path.join(baseDir, '/package.json');

        if (!Fs.existsSync(packagePath)) {
            throw 'File /package.json does not exist.';
        }

        const packageJson = Fs.readFileSync(packagePath, 'utf8');

        this._packageData = JSON.parse(packageJson);
    }
}
