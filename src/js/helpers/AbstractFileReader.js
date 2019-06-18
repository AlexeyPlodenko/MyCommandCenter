import {Abstract} from "./Abstract.js";
import {AppException} from "../exceptions/AppException.js";

const Fs = require('fs');

/**
 * @class
 * @constructor
 * @public
 * @abstract
 * @property {string} _filePath
 */
export class AbstractFileReader extends Abstract {
    /**
     * Constructor.
     *
     * @param {string} filePath
     */
    constructor(filePath) {
        super();

        if (new.target === AbstractFileReader) {
            throw new AppException(
                'Cannot construct AbstractFileReader instances directly.'
            );
        }

        this._filePath = filePath;
    }

    /**
     * @returns {boolean}
     */
    fileExists() {
        return Fs.existsSync(this._filePath);
    }

    /**
     * @returns {*}
     */
    readFile() {
        const data = Fs.readFileSync(this._filePath, 'utf8');
        return this._decodeData(data);
    }

    /**
     * Decorator to decode the data from the readFile() method.
     *
     * @param data
     * @returns {*}
     * @private
     */
    _decodeData(data) {
        return data;
    }
}
