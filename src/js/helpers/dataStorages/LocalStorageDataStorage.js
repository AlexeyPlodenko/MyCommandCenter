import { AbstractDataStorage } from "./AbstractDataStorage.js";

/**
 * LocalStorageDataStorage.
 */
export class LocalStorageDataStorage extends AbstractDataStorage {
    /**
     * Constructor.
     */
    constructor() {
        super();
    }

    /**
     * @param {string} key
     */
    get(key) {
        return localStorage.getItem(key);
    }

    /**
     * @param {string} key
     * @param {*} value
     */
    set(key, value) {
        localStorage.setItem(key, value);
    }

    /**
     * @param {string} key
     */
    remove(key) {
        localStorage.removeItem(key);
    }
}
