import { ActionsRepository } from "../../../actions/ActionsRepository.mjs";
import { AbstractPageComponent } from "../../AbstractPageComponent.mjs";
import { App } from "../../../../app/App.mjs";
import { MenuComponent } from "../../../../components/MenuComponent.mjs";
import { SearchComponent } from "../../../../components/search/SearchComponent.mjs";
import { ActionsComponent } from "../../../../components/actions/ActionsComponent.mjs";

/**
 * HomePageComponent.
 *
 * @class
 * @property {SearchComponent} _search
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
        this.registerProvidedComponent(
            'actions',
            new ActionsComponent(this._app)
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
