import { AppException } from '../exceptions/AppException.js';
import {JsonFileReader} from "./JsonFileReader.js";

const pathJoin = require('path').join;

/**
 * PackageJson.
 *
 * @TODO rename this to config. provider
 * @class
 * @property {Object} _packageData
 */
export class PackageJson {
    /**
     * Constructor.
     */
    constructor() {
        this._loadPackageJson();

        this._packageData = null;
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
        this._loadPackageJson();
        return this._packageData[keyName];
    }

    /**
     * Read /package.json file, parse it and keep for later usage.
     */
    _loadPackageJson() {
        if (this._packageData === null) {
            const baseDir = process.cwd();
            const packagePath = pathJoin(baseDir, '/package.json');

            const reader = new JsonFileReader(packagePath);
            if (!reader.fileExists()) {
                throw new AppException('File /package.json does not exist.');
            }

            this._packageData = reader.readFile();
        }
    }
}
