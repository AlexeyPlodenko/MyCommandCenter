const BehaviorSubject = require('rxjs/BehaviorSubject').BehaviorSubject;

import { Menu } from '/src/js/features/Menu.js';

/**
 * Component.
 *
 * @class
 * @constructor
 * @private
 * @property {App} _app
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
        if (new.target === Component) {
            throw 'Cannot construct Component instances directly.';
        }

        if (typeof this.onInit !== 'function') {
            throw 'Class must implement the method "onInit".';
        }

        this._app = app;
        this._menu = new Menu(app);
        this.state = new BehaviorSubject({});
    }
}
