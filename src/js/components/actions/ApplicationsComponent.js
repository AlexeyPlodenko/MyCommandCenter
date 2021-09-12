import { AbstractVueComponent } from "../AbstractVueComponent.js";
import { AppException } from "../../exceptions/AppException.js";
import { log } from "../../helpers/DevTools.js";
import { makeUi } from '../../providers/UiProvider.js';

/**
 * Actions.
 *
 * @class
 * @property {ActionsRepository} _actions
 */
export class ApplicationsComponent extends AbstractVueComponent {
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
                    <h5 class="card-header small">Global</h5>
                    <div class="card-body">
                        <template v-for="(action, ix) in actions$">
                            <div class="action" style="width: 8rem;" @click.stop="runApplication(ix);">
                                <span class="clickable close-icon action_close_icon" data-effect="fadeOut" @click.stop="removeApplication(ix);"><i class="fa fa-times-circle"></i></span>
                                <div class="small p-1 action_name">{{ action.getName() }}</div>
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
    runApplication(actionId) {
        const action = this._actions.get(actionId);
        if (action === undefined) {
            throw new AppException(
                'Failed to find action with this ID in registry.'
            );
        }

        const modalUi = makeUi().showNotificationModal(
                            'Output',
                            'Starting the app...'
                        );

        const actionExecCommand = this.getParentComponent()
                                            .actionExecuteCommandFactory
                                            .makeActionExecuteCommand(action);

        const actionExecMsgHandler = (data) => {
            const msg = data.toString('utf8').trim();
            modalUi.data.text += "\n"+ msg;
// console.clear();
log('onStdOut', modalUi.data.text);
        };
        actionExecCommand.onStdOut(actionExecMsgHandler);
        actionExecCommand.onStdErr(actionExecMsgHandler);

        actionExecCommand.execute();
    }

    /**
     * @param {number} actionId
     */
    removeApplication(actionId) {
        const action = this._actions.get(actionId);
        if (action === undefined) {
            throw new AppException(
                'Failed to find action with this ID in registry.'
            );
        }

        const modal = makeUi().showConfirmationModal(
            'Confirmation',
            'Are you sure you want to remove this action?'
        );
        modal.setOnAccept(() => {
            this._actions.remove(actionId);
            this._actions.save();
        });
    }
}
