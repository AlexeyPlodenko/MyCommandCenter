import { PageComponentFactory } from '../factories/PageComponentFactory.js';

/**
 * @type {PageComponentFactory}
 */
let instance;

/**
 * @returns {PageComponentFactory}
 */
export function makePageComponentFactory() {
    if (!instance) {
        instance = new PageComponentFactory();
    }

    return instance;
}
