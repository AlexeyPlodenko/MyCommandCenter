const BehaviorSubject = require('rxjs/BehaviorSubject').BehaviorSubject;

import { Menu } from '/src/js/features/Menu.mjs';

/**
 * Component.
 *
 * @class
 * @constructor
 * @private
 * @property {Menu} _menu
 * @property {BehaviorSubject} state
 */
export class Component {
    /**
     * Constructor.
     *
     * @param {App} app
     */
    constructor(app) {
        this._menu = new Menu(app);

        this.state = new BehaviorSubject({});
    }
}
