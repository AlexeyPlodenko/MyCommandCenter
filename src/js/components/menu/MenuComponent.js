import { AbstractVueComponent } from "../AbstractVueComponent.js";
import { log } from "../../helpers/DevTools.js";
import { ActionModel } from "../../features/actions/ActionModel.js";
import { DynamicInputComponent } from "../dynamic_input/DynamicInputComponent.js";
import { FormHelper } from "../../helpers/ui/FormHelper.js";
import { ActionTypes } from "../../features/actions/ActionTypes.js";
import { Variable } from "../../helpers/Variable.js";

/**
 * Actions.
 *
 * @class
 * @property {Map} items
 * @property {ActionsRepository} _actions
 */
export class MenuComponent extends AbstractVueComponent {
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

        for (const key in ActionTypes) {
            const actionType = ActionTypes[key];
            this.items.set('menu_add_'+ actionType.uid, actionType.ui);
        };

        this.items.set('menu_add_category', {
            open: false,
            needsFocus: true,
            focusOnOpen: false
        });

        this.openItemId = '';
    }

    /**
     * init
     */
    init() {
        this._actions = this.getParentComponent().actions;

        this.setVueParam(
            'template',
            `
<div class="menu" id="menu">
    <i class="menu_collapse fas fa-grip-lines-vertical"></i>

    <div id="menu_home" class="d-flex flex-column h-100">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb small">
                <li class="breadcrumb-item" aria-current="page">Menu</li>
            </ol>
        </nav>
        <ul class="menu_lvl_1 nav flex-column flex-grow-1">
            <li class="menu_item nav-item">
                <a href="" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Add</a>
                <div class="dropdown-menu" id="menu_add">
                    <a class="dropdown-item" href="" data-show-menu-item="menu_add_${ActionTypes.FILE.uid}" data-toggle="tooltip" data-placement="left" title="Any type of file. A proper application will run to handle it.">File</a>
                    <a class="dropdown-item" href="" data-show-menu-item="menu_add_${ActionTypes.CLI.uid}">CLI command</a>
                    <a class="dropdown-item" href="" data-show-menu-item="menu_add_${ActionTypes.WEB.uid}">Web link</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="" data-show-menu-item="menu_add_category">Category</a>
                </div>
            </li>
            <li class="menu_item nav-item small mt-auto">
                <a href="" class="nav-link">Preferences</a>
            </li>
            <li class="menu_item nav-item small">
                <a href="" class="nav-link">Close</a>
            </li>
        </ul>
    </div>

    <div id="menu_add_${ActionTypes.FILE.uid}">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb small">
                <li class="breadcrumb-item"><a href="" data-show-menu-item="menu_home">Menu</a></li>
                <li class="breadcrumb-item active" aria-current="page">Add file</li>
            </ol>
        </nav>
        <form>
            <div class="form-group">
                <div class="col">
                    <label for="menu_add_${ActionTypes.FILE.uid}_file">Choose a file</label>
                    <input type="file" class="form-control-file" name="path" id="menu_add_${ActionTypes.FILE.uid}_file" required="required">
                    <small class="form-text text-muted">Choose any type of file. A proper application will run to handle it, if file is not of an executable type.</small>
                </div>
            </div>

            <div class="form-group">
                <div class="col">
                    <label>Arguments</label>
                    <div class="input-group dynamic_field">
                            <input class="form-control" name="arguments[]" type="text">
                            <div class="input-group-append">
                                <span class="input-group-text btn btn-danger dynamic_field_remove">x</span>
                                <span class="input-group-text btn btn-primary dynamic_field_add">+</span>
                            </div>
                    </div>
                    <small class="form-text text-muted">Input arguments to be passed to the app. Enter the args. as you would do in the console. For example, <span class="text-nowrap">--testRun</span> or <span class="text-nowrap">-name=John</span>.</small>
                </div>
            </div>

            <div class="form-group">
                <div class="col">
                    <button type="submit" class="btn btn-primary">Add</button>
                </div>
            </div>
        </form>
    </div>

    <div id="menu_add_${ActionTypes.CLI.uid}">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb small">
                <li class="breadcrumb-item"><a href="" data-show-menu-item="menu_home">Menu</a></li>
                <li class="breadcrumb-item active" aria-current="page">Add CLI command</li>
            </ol>
        </nav>
        <form>
            <div class="form-group">
                <div class="col">
                    <label>Command</label>
                    <div class="input-group dynamic_field">
                        <textarea class="form-control" name="arguments[]" type="text" rows="10"></textarea>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <div class="col">
                    <button type="submit" class="btn btn-primary">Add</button>
                </div>
            </div>
        </form>
    </div>

    <div id="menu_add_${ActionTypes.WEB.uid}">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb small">
                <li class="breadcrumb-item"><a href="" data-show-menu-item="menu_home">Menu</a></li>
                <li class="breadcrumb-item active" aria-current="page">Add web link</li>
            </ol>
        </nav>
    </div>

    <div id="menu_add_category">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb small">
                <li class="breadcrumb-item"><a href="" data-show-menu-item="menu_home">Menu</a></li>
                <li class="breadcrumb-item active" aria-current="page">Add category</li>
            </ol>
        </nav>
    </div>
</div>
            `
        );
        this.setVueParam('el', 'menu');

        this.setVueParam('mounted', this.afterMount.bind(this));

        super.init();
    }

    /**
     * Initialization to run after Vue element is mounted.
     */
    afterMount() {
        const $menu = $('#menu');

        $menu.find('a[data-show-menu-item]').click((ev) => {
            // ugly hack, closing bootstrap's drop-down @TODO implement properly
            this._app.ui.$body.trigger('click');

            const itemIdClicked = $(ev.target).attr('data-show-menu-item');
            this.openMenuItem(itemIdClicked);

            return false;
        });

        $menu.find('#menu_add_'+ ActionTypes.FILE.uid +' form').submit((ev) => {
            const $this = $(ev.target);
            const $elements = FormHelper.getEditableElements($this);
            const data = FormHelper.getValues($elements);

            // remove empty arguments
            if (Variable.hasKey(data, 'arguments')
                && Variable.isArray(data.arguments)
                && !Variable.isEmpty(data.arguments)) {

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
