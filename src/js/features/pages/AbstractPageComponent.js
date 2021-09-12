import { AbstractComponent } from "../../components/AbstractComponent.js";
import { AppException } from "../../exceptions/AppException.js";

/**
 * AbstractPageComponent.
 *
 * @class
 * @property {MenuComponent} _menu
 * @property {AbstractComponent[]} _providedComponents
 */
export class AbstractPageComponent extends AbstractComponent {
    /**
     * Constructor.
     */
    constructor() {
        super();

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
        const componentInstance = new component();
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
