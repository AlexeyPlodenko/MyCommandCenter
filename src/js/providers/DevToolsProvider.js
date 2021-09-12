import { DevTools } from '../helpers/DevTools.js';

/**
 * @type {DevTools}
 */
let instance;

/**
 * @returns {DevTools}
 */
export function makeDevTools() {
    if (!instance) {
        instance = new DevTools();
    }

    return instance;
}
