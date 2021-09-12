import { Router } from '../app/Router.js';

/**
 * @type {Router}
 */
let instance;

/**
 * @returns {Router}
 */
export function makeRouter() {
    if (!instance) {
        instance = new Router();
    }

    return instance;
}
