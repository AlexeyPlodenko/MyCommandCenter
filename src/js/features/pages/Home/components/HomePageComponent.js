import { ActionsRepository } from "../../../actions/ActionsRepository.js";
import { AbstractPageComponent } from "../../AbstractPageComponent.js";
import { SearchComponent } from "../../../SearchComponent.js";
import { MenuComponent } from "../../../MenuComponent.js";
import { App } from "../../../../app/App.js";

/**
 * HomePageComponent.
 *
 * @class
 * @property {SearchComponent} _search
 * @property {DynamicInputComponent} _menuAddFileArguments
 * @property {ActionsRepository} actions
 */
export class HomePageComponent extends AbstractPageComponent {
    /**
     * Constructor.
     *
     * @param {App} app
     */
    constructor(app) {
        super(app);

        this.registerProvidedComponent(
            'menu',
            new MenuComponent(this._app)
        );
        this.registerProvidedComponent(
            'search',
            new SearchComponent(this._app)
        );

        this.actions = new ActionsRepository(app.storage);
        this.actions.load();

        // this.store.setStateItem('actions', this.actions.models);
    }

    /**
     * This method will be called once the component will be created.
     */
    init() {
        $('[data-toggle="tooltip"]').tooltip();
    }

    // storeUpdated(state) {
    //     console.log('storeUpdated', state);
    // }
}
