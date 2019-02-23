import { AbstractVueComponent } from "../AbstractVueComponent.js";

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
    }

    init() {
        this.setVueComponentParam('el', '#actions');
        this.setVueComponentParam('subscriptions', {
            actions$: this.getParentComponent().actions.models$
        });

        super.init();
    }
}
