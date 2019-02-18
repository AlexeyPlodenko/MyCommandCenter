import { ActionsRepository } from "../../../actions/ActionsRepository.js";
import { AbstractPageComponent } from "../../AbstractPageComponent.js";
import { App } from "../../../../app/App.js";
import { MenuComponent } from "../../../../components/MenuComponent.js";
import { SearchComponent } from "../../../../components/search/SearchComponent.js";
import { log } from "../../../../helpers/DevTools.js";
import { ActionsComponent } from "../../../../components/actions/ActionsComponent.js";

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

        this.actions = new ActionsRepository(app.storage);
        this.actions.load();

        this.registerProvidedComponent(
            'menu',
            MenuComponent
        );
        this.registerProvidedComponent(
            'search',
            SearchComponent
        );
        this.registerProvidedComponent(
            'actions',
            ActionsComponent
        );

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
