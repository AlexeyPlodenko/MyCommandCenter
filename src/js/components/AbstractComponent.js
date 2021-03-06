import { Abstract } from "../helpers/Abstract.js";
import { App } from "../app/App.js";
import { Store } from "../helpers/Store.js";
import { log } from "../helpers/DevTools.js";
import { AppException } from "../exceptions/AppException.js";

/**
 * Component.
 *
 * @class
 * @abstract init
 * @property {App} _app
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
            throw new AppException(
                'Cannot construct AbstractComponent instances directly.'
            );
        }

        if (typeof this.init !== 'function') {
            throw new AppException('Class must implement the method "init".');
        }

        this._app = app;
        this.reusable = false;
        this.state = new Store();
        this._parentComponent = null;
    }

    /**
     * @param {AbstractComponent} parentComponent
     */
    setParentComponent(parentComponent) {
        this._parentComponent = parentComponent;
    }

    /**
     * @returns {AbstractComponent}
     */
    getParentComponent() {
        return this._parentComponent;
    }
}