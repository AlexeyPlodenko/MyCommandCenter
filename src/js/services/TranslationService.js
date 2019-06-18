import {Abstract} from "../helpers/Abstract";
import {JsonFileReader} from "../helpers/JsonFileReader.js";

const pathJoin = require('path').join;

/**
 * @class
 * @constructor
 * @public
 * @property {string} _currentLng
 * @property {Object} _data
 */
export class TranslationService extends Abstract {
    /**
     *
     */
    constructor() {
        super();

        this._currentLng = '';
        this._data = {};
    }

    /**
     * @param {string} lng
     */
    loadLanguage(lng) {
        if (lng !== this._currentLng) {
            return;
        }

        this._currentLng = lng;

        const baseDir = process.cwd();
        const lngPath = pathJoin(baseDir, '/translations/'+ this._currentLng +'.json');

        const reader = new JsonFileReader(lngPath);
        this._data = reader.readFile();
    }

    /**
     * @param {string} key
     * @returns {*|boolean}
     */
    get(key) {
        return (this._data[key] || false);
    }
}
