import { App } from "../app/App.js";
import { AbstractComponent } from "./AbstractComponent.js";
import { log } from "../helpers/DevTools.js";
import { AppException } from "../exceptions/AppException.js";

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
 * @property {array} _excludeProtoMethods
 */
export class AbstractVueComponent extends AbstractComponent {
    /**
     * Constructor.
     *
     * @param {App} app
     */
    constructor(app) {
        super(app);

        if (new.target === AbstractComponent) {
            throw new AppException(
                'Cannot construct AbstractComponent instances directly.'
            );
        }

        this._vueParams = {};
        this._vueInst = null;

        this._excludeProtoMethods = [
            'constructor',
            'init'
        ];
    }

    /**
     * @param {string} name
     * @param {any} value
     */
    setVueParam(name, value) {
        this._vueParams[name] = value;
    }

    /**
     * @param {string} name
     * @param {any} valueIfNotExists
     * @returns {any}
     */
    getVueParam(name, valueIfNotExists) {
        return this._vueParams.hasOwnProperty(name)
                ? this._vueParams[name]
                : valueIfNotExists;
    }

    /**
     *
     */
    init() {
        this._importMethodsIntoVue(this._excludeProtoMethods);

        this._vueInst = new Vue(this._vueParams);
    }

    /**
     *
     */
    destroy() {
        this._vueInst = null;
    }

    /**
     * @param {string[]} excludeMethods
     */
    _importMethodsIntoVue(excludeMethods) {
        const vueMethods = this.getVueParam('methods', {});
        const objProto = Object.getPrototypeOf(this);
        Object.getOwnPropertyNames(objProto)
                    .forEach(name => {
                        if (excludeMethods.indexOf(name) === -1
                            && typeof this[name] === 'function') {
                            vueMethods[name] = this[name].bind(this);
                        }
                    });

        this.setVueParam('methods', vueMethods);
    }
}
