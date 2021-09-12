import { Ui } from '../app/Ui.js';

/**
 * @type {Ui}
 */
let instance;

/**
 * @returns {Ui}
 */
export function makeUi() {
    if (!instance) {
        instance = new Ui();
    }

    return instance;
}
