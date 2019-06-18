import {AbstractFileReader} from "./AbstractFileReader.js";

/**
 * @class
 * @constructor
 * @public
 */
export class JsonFileReader extends AbstractFileReader {
    /**
     * Decorator to decode the data from the readFile() method.
     *
     * @param data
     * @returns {*}
     * @private
     * @throws SyntaxError
     */
    _decodeData(data) {
        return JSON.parse(data);
    }
}
