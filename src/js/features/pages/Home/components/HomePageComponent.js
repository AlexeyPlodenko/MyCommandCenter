import { ActionsRepository } from "../../../actions/ActionsRepository.js";
import { AbstractPageComponent } from "../../AbstractPageComponent.js";
import { App } from "../../../../app/App.js";
import { SearchComponent } from "../../../../components/search/SearchComponent.js";
import { log } from "../../../../helpers/DevTools.js";
import { ActionsComponent } from "../../../../components/actions/ActionsComponent.js";
import { ActionService } from "../../../actions/ActionService.js";
import { MenuComponent } from "../../../../components/menu/MenuComponent.js";

/**
 * HomePageComponent.
 *
 * @class
 * @property {SearchComponent} _search
 * @property {ActionsRepository} actions
 * @property {ActionService} actionService
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

        this.actionService = new ActionService(app);

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
    }

    /**
     * This method will be called once the component will be created.
     */
    init() {
        $('[data-toggle="tooltip"]').tooltip();
    }
}
