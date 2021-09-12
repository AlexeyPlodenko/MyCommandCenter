import { LocalStorageDataStorage } from '../helpers/dataStorages/LocalStorageDataStorage.js';

/**
 * @type {LocalStorageDataStorage}
 */
let instance;

/**
 * @returns {LocalStorageDataStorage}
 */
export function makeLocalStorageDataStorage() {
    if (!instance) {
        instance = new LocalStorageDataStorage();
    }

    return instance;
}
