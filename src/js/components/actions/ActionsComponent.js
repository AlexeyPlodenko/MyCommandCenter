import { AbstractVueComponent } from "../AbstractVueComponent.js";
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
                                <img class="card-img-top" src="https://scontent.fmla1-1.fna.fbcdn.net/v/t31.0-8/322310_240368599342071_2554949_o.jpg?_nc_cat=109&_nc_ht=scontent.fmla1-1.fna&oh=66302d3c034dd1cfc7e4e42afbe1a3e6&oe=5CE4D2C2">
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
            throw new AppException(
                'Failed to find action with this ID in registry.'
            );
        }

        const modalUi = this._app.ui.showNotificationModal(
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
    removeAction(actionId) {
        const action = this._actions.get(actionId);
        if (action === undefined) {
            throw new AppException(
                'Failed to find action with this ID in registry.'
            );
        }

        const modal = this._app.ui.showConfirmationModal(
            'Confirmation',
            'Are you sure you want to remove this action?'
        );
        modal.setOnAccept(() => {
            this._actions.remove(actionId);
            this._actions.save();
        });
    }
}
