import { Abstract } from "../helpers/Abstract.js";
import { Menu } from "../features/Menu.js";
import { App } from "../app/App.js";

const BehaviorSubject = require('rxjs/BehaviorSubject').BehaviorSubject;

/**
 * Component.
 *
 * @class
 * @abstract onInit
 * @property {App} _app
 * @property {BehaviorSubject} state
 * @property {boolean} reusable If true, the component would not be removed
 *                              from memory once user will leave the page.
 *                              On come back the same component will be used.
 *                              Otherwise an new instance will be created.
 */
export class AbstractComponent extends Abstract {
    /**
     * Constructor.
     *
     * @param {App} app
     */
    constructor(app) {
        super();
        
        if (new.target === AbstractComponent) {
            throw new Error(
                'Cannot construct AbstractComponent instances directly.'
            );
        }

        if (typeof this.init !== 'function') {
            throw new Error('Class must implement the method "init".');
        }

        this._app = app;
        this.state = new BehaviorSubject({});
        this.reusable = true;
    }
}