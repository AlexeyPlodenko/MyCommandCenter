import { AbstractComponent } from "../../components/AbstractComponent.js";
import { Store } from "../../helpers/Store.js";
import { Abstract } from "../../helpers/Abstract.js";
import { AppException } from "../../exceptions/AppException.js";

/**
 * Component.
 *
 * @class
 * @abstract onInit
 * @property {MenuComponent} _menu
 * @property {AbstractComponent[]} _providedComponents
 */
export class AbstractPageComponent extends AbstractComponent {
    /**
     * Constructor.
     *
     * @param {App} app
     */
    constructor(app) {
        super(app);

        if (new.target === AbstractPageComponent) {
            throw new AppException(
                'Cannot construct AbstractPageComponent instances directly.'
            );
        }

        this._providedComponents = {};
    }

    /**
     * Registers a component to do automatic maintenance.
     *
     * @param {string} name
     * @param {function} component
     */
    registerProvidedComponent(name, component) {
        const componentInstance = new component(this._app);
        componentInstance.setParentComponent(this);

        this._providedComponents[name] = componentInstance;
    }

    /**
     * initProvidedComponents.
     */
    initProvidedComponents() {
        for (const name in this._providedComponents) {
            this._providedComponents[name].init();
        }
    }

    /**
     * @param {string} name
     * @returns {AbstractComponent|undefined}
     */
    getComponent(name) {
        return this._providedComponents[name];
    }
}
