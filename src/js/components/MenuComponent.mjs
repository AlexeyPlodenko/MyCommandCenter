import { AbstractComponent } from "./AbstractComponent.mjs";
import { AppException } from "../exceptions/AppException.mjs";
import { FormHelper } from "../helpers/ui/FormHelper.mjs";
import { VariableHelper } from "../helpers/VariableHelper.mjs";
import { ActionModel } from "../features/actions/ActionModel.mjs";
import { log } from "../helpers/DevTools.mjs";
import { DynamicInputComponent } from "./dynamic_input/DynamicInputComponent.mjs";

/**
 * Menu.
 *
 * @class
 * @property {Map} items A collection of menu items, that are shown in UI.
 * @property {string} openItemId
 */
export class MenuComponent extends AbstractComponent {
    /**
     * Constructor.
     *
     * @param {App} app
     */
    constructor(app) {
        super(app);

        this.items = new Map();

        this.items.set('menu_home', {
            open: true,
            needsFocus: false,
            focusOnOpen: false
        });
        this.items.set('menu_add_app', {
            open: false,
            needsFocus: true,
            focusOnOpen: '#menu_add_app_file'
        });
        this.items.set('menu_add_cli_comm', {
            open: false,
            needsFocus: true,
            focusOnOpen: false
        });
        this.items.set('menu_add_web_link', {
            open: false,
            needsFocus: true,
            focusOnOpen: false
        });
        this.items.set('menu_add_category', {
            open: false,
            needsFocus: true,
            focusOnOpen: false
        });

        this.openItemId = '';
    }

    init() {
        const $menu = $('#menu');

        $menu.find('a[data-show-menu-item]').click((ev) => {
            // ugly hack, closing bootstrap's drop-down @TODO implement properly
            this._app.ui.$body.trigger('click');

            const itemIdClicked = $(ev.target).attr('data-show-menu-item');
            this.openMenuItem(itemIdClicked);

            return false;
        });

        $menu.find('#menu_add_app form').submit((ev) => {
            const $this = $(ev.target);
            const $elements = FormHelper.getEditableElements($this);
            const data = FormHelper.getValues($elements);

            // remove empty arguments
            if (VariableHelper.hasKey(data, 'arguments')
                && VariableHelper.isArray(data.arguments)
                && !VariableHelper.isEmpty(data.arguments)) {

                // trim each argument
                data.arguments.forEach(arg => {
                    arg = arg.trim();
                });

                // and remove empty ones
                data.arguments = data.arguments.filter(arg => arg.length > 0);
            }

            const action = ActionModel.createFromData(data);

            /** @type {HomePageComponent} */
            const homePage = this._app.ui.getCurrentPageComponent();
            homePage.actions.addActionModel(action);

log('data', action);
            return false;
        });

        for (const [itemId, item] of this.items) {
            if (!item.open) {
                this._app.ui.hide('#'+ itemId);
            } else {
                if (this.openItemId !== '') {
                    throw new AppException(
                        'There are more then 1 item marked as open in the '+
                        'menu config. map. There should be only one.'
                    );
                }

                this.openItemId = itemId;
            }
        }

        this._menuAddFileArguments = new DynamicInputComponent($menu);
        this._menuAddFileArguments.init();
    }

    /**
     * openMenuItem.
     *
     * @param {String} itemId
     */
    openMenuItem(itemId) {
        this._app.ui.hide('#'+ this.openItemId);
        this._app.ui.show('#'+ itemId);

        this.openItemId = itemId;

        const menuItem = this.items.get(itemId);

        const currentPageComponent = this._app.ui.getCurrentPageComponent();
        const searchComp = currentPageComponent.getComponent('search');
        if (menuItem.needsFocus) {
            searchComp.unlockFocus();

            if (menuItem.focusOnOpen !== false) {
                $(menuItem.focusOnOpen).focus();
            }

        } else {
            searchComp.lockFocus();
        }
    }
}
