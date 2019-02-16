import { AbstractDataProvider } from "./AbstractDataProvider.js";

/**
 * LocalStorageDataProvider.
 */
export class LocalStorageDataProvider extends AbstractDataProvider {
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
     * @param {any} value
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
