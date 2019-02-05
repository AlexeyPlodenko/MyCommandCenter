import { DynamicInputComponent } from "../../../../../components/dynamic_input/js/DynamicInputComponent.js";
import { FormHelper } from "../../../../helpers/ui/FormHelper.js";
import { log } from "../../../../helpers/DevTools.js";
import { ActionModel } from "../../../actions/ActionModel.js";
import { ActionsRepository } from "../../../actions/ActionsRepository.js";
import { Search } from "../../../Search.js";
import { AbstractPageComponent } from "../../AbstractPageComponent.js";

/**
 * HomeComponent.
 *
 * @class
 * @property {Search} _search
 * @property {DynamicInputComponent} _menuAddFileArguments
 * @property {ActionsRepository} _actions
 */
export class HomeComponent extends AbstractPageComponent {
    /**
     * This method will be called once the component will be created.
     */
    init() {
        this._search = new Search(this._app);
        this._actions = new ActionsRepository();

        for (const [itemId, item] of this.menu.items) {
            if (!item.open) {
                this._app.ui.hide('#'+ itemId);
            } else {
                this.menu.openItemId = itemId;
            }
        }

        const $menu = $('#menu');

        $menu.find('a[data-show-menu-item]').click((ev) => {
            // ugly hack, closing bootstrap's drop-down @TODO implement properly
            $('body').trigger('click');

            const itemIdClicked = $(ev.target).attr('data-show-menu-item');
            this.openMenuItem(itemIdClicked);
            
            return false;
        });

        $menu.find('form').submit((ev) => {
            const $this = $(ev.target);
            const $elements = FormHelper.getEditableElements($this);
            const data = FormHelper.getValues($elements);

            const action = new ActionModel();
            action.setData(data);
            
log('data', action);
            return false;
        });

        $('[data-toggle="tooltip"]').tooltip();

        this._menuAddFileArguments = new DynamicInputComponent($menu);
        this._menuAddFileArguments.init();
    }

    /**
     * openMenuItem.
     *
     * @param {String} itemId
     */
    openMenuItem(itemId) {
        this._app.ui.hide('#'+ this.menu.openItemId);
        this._app.ui.show('#'+ itemId);

        this.menu.openItemId = itemId;

        const menuItem = this.menu.items.get(itemId);

        if (menuItem.needsFocus) {
            this._search.unlockFocus();

            if (menuItem.focusOnOpen !== false) {
                $(menuItem.focusOnOpen).focus();
            }

        } else {
            this._search.lockFocus();
        }
    }
}
