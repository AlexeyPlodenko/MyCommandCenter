import { Abstract } from "./Abstract.js";

const isEmpty = require('is-empty');

export class Variable extends Abstract {
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

    /**
     * Check if data is of a scalar type.
     *
     * @param {any} data
     */
    static isScalar(data) {
        const dataType = typeof data;
        return dataType === 'string'
            || dataType === 'number'
            || dataType === 'boolean'
            || dataType === 'undefined'
            || dataType === 'null'
            || dataType === 'symbol';
    }

    /**
     * Checks the data type.
     *
     * @param {any} data
     * @param {string} type
     */
    static isOfType(data, type) {
        return typeof data === type;
    }
}
