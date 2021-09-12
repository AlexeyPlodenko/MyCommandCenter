import { ClientNwjs } from '../helpers/client/ClientNwjs.js';

/**
 * @type {ClientNwjs}
 */
let instance;

/**
 * @returns {ClientNwjs}
 */
export function makeClientNwjs() {
    if (!instance) {
        instance = new ClientNwjs();
    }

    return instance;
}
