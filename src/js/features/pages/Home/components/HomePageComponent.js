import { ActionsRepository } from "../../../actions/ActionsRepository.js";
import { AbstractPageComponent } from "../../AbstractPageComponent.js";
import { SearchComponent } from "../../../../components/search/SearchComponent.js";
import { ActionExecuteCommandFactory } from "../../../actions/ActionExecuteCommandFactory.js";
import { MenuComponent } from '../../../../components/menu/MenuComponent.js';
import { ApplicationsComponent } from '../../../../components/actions/ApplicationsComponent.js';
import { makeLocalStorageDataStorage } from '../../../../providers/LocalStorageDataStorageProvider.js';

/**
 * HomePageComponent.
 *
 * @class
 * @property {SearchComponent} _search
 * @property {ActionsRepository} actions
 * @property {ActionExecuteCommandFactory} actionExecuteCommandFactory
 */
export class HomePageComponent extends AbstractPageComponent {
    /**
     * Constructor.
     */
    constructor() {
        super();

        const storage = makeLocalStorageDataStorage();
        this.actions = new ActionsRepository(storage);
        this.actions.load();

        this.actionExecuteCommandFactory = new ActionExecuteCommandFactory();

        this.registerProvidedComponent(
            'search',
            SearchComponent
        );
        this.registerProvidedComponent(
            'menu',
            MenuComponent
        );
        this.registerProvidedComponent(
            'applications',
            ApplicationsComponent
        );
    }

    /**
     * This method will be called once the component will be created.
     */
    init() {
        $('[data-toggle="tooltip"]').tooltip();
    }
}
