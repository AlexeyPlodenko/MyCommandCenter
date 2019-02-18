import { App } from "../app/App.js";
import { AbstractComponent } from "./AbstractComponent.js";
import { log } from "../helpers/DevTools.js";

/**
 * Component.
 *
 * @class
 * @abstract onInit
 * @property {App} _app
 * @property {boolean} reusable If true, the component would not be removed
 *                              from memory once user will leave the page.
 *                              On come back the same component will be used.
 *                              Otherwise an new instance will be created.
 * @property {Vue} _vueInst
 */
export class AbstractVueComponent extends AbstractComponent {
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

        // if (typeof this.init !== 'function') {
        //     throw new Error('Class must implement the method "init".');
        // }

        this._app = app;
        this._vueComponentParams = {};
        this._vueInst = null;
    }

    /**
     * @param {string} name
     * @param {any} value
     */
    setVueComponentParam(name, value) {
        this._vueComponentParams[name] = value;
    }

    init() {
        this._vueInst = new Vue(this._vueComponentParams);
log('AbstractVueComponent.init()', this._vueComponentParams, this._vueInst);
    }

    destroy() {
        this._vueInst = null;
    }
}