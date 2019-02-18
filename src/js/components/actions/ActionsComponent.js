import { AbstractVueComponent } from "../AbstractVueComponent.js";
import { log } from "../../helpers/DevTools.js";

/**
 * Actions.
 *
 * @class
 */
export class ActionsComponent extends AbstractVueComponent {
    /**
     * Constructor.
     *
     * @param {App} app
     */
    constructor(app) {
        super(app);

        this.setVueComponentParam('el', '#actions');
        // this.setVueComponentParam('props', ['actions']);
        this.setVueComponentParam('subscriptions', function() {
            return {
                actions: this.getParentComponent().actions.models$
                // this.getParentComponent().actions.models$
            };
        });
    }

    init() {}
}
