import { AbstractVueComponent } from "../AbstractVueComponent.js";
import { ActionService } from "../../features/actions/ActionService.js";
import { AppException } from "../../exceptions/AppException.js";
import { log } from "../../helpers/DevTools.js";

/**
 * Actions.
 *
 * @class
 * @property {ActionsRepository} _actions
 */
export class ActionsComponent extends AbstractVueComponent {
    /**
     *
     */
    init() {
        this._actions = this.getParentComponent().actions;

        this.setVueParam(
            'template',
            `<div id="actions" class="actions">
                <div class="search">
                    <input type="text" id="search_input" class="search_input" autocomplete="off" placeholder="Start typing to find the action...">
                </div>

                <div class="card">
                    <h5 class="card-header small">Featured</h5>
                    <div class="card-body">
                        <template v-for="(action, ix) in actions$">
                            <div class="card action" style="width: 8rem;" @click.stop="runAction(ix);">
                                <span class="clickable close-icon action_close_icon" data-effect="fadeOut" @click.stop="removeAction(ix);"><i class="fa fa-times-circle"></i></span>
                                <img class="card-img-top" src="https://scontent.fmla1-2.fna.fbcdn.net/v/t1.0-9/17992046_283665712077913_3617269335840491740_n.jpg?_nc_ht=scontent.fmla1-2.fna&oh=e6ed2d33c35f1835c4f6fed7d53f41a0&oe=5CBDAC48">
                                <div class="card-body small p-1 action_name">{{ action.getName() }}</div>
                            </div>
                        </template>
                    </div>
                </div>
             </div>`
        );
        this.setVueParam('el', 'actions');
        this.setVueParam('subscriptions', {
            actions$: this._actions.models$
        });

        super.init();
    }

    /**
     * @param {number} actionId
     */
    runAction(actionId) {
        const action = this._actions.get(actionId);
        if (action === undefined) {
            throw AppException(
                'Failed to find action with this ID in registry.'
            );
        }
        this.getParentComponent().actionService.runAction(action);
    }

    /**
     * @param {number} actionId
     */
    removeAction(actionId) {
        const action = this._actions.get(actionId);
        if (action === undefined) {
            throw AppException(
                'Failed to find action with this ID in registry.'
            );
        }

        const modal = this._app.ui.showModal(
            'Confirmation',
            'Are you sure you want to remove this action?'
        );
        modal.setOnAccept(() => {
            this._actions.remove(actionId);
            this._actions.save();
        });
    }
}
