import { Abstract } from "./Abstract.mjs";

const isEmpty = require('is-empty');

export class VariableHelper extends Abstract {
    /**
     * Check if the parameter is an empty variable.
     * @author https://www.npmjs.com/package/is-empty
     *
     * @param {any} data
     */
    static isEmpty(data) {
        return isEmpty(data);
    }

    /**
     * Check that variable is an array.
     *
     * @param {any} data
     */
    static isArray(data) {
        return Array.isArray(data);
    }

    /**
     * Check if the key exists in data set.
     *
     * @param {any} data
     * @param {string} key
     */
    static hasKey(data, key) {
        return data.hasOwnProperty(key);
    }
}
