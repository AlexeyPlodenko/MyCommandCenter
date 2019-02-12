import { AbstractComponent } from "../../components/AbstractComponent.js";
// import { Store } from "../../helpers/Store.js";

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
            throw new Error(
                'Cannot construct AbstractPageComponent instances directly.'
            );
        }

        // if (typeof this.storeUpdated !== 'function') {
        //     throw new Error('Class must implement the method "storeUpdated".');
        // }

        this._providedComponents = {};
        // this.store = new Store();
    }

    /**
     * Registers a component to do automatic maintenance.
     *
     * @param {string} name
     * @param {AbstractComponent} componentInstance
     */
    registerProvidedComponent(name, componentInstance) {
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
