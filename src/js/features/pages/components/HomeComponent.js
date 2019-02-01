import { Component } from '/src/js/features/pages/components/Component.js';
import { Search } from '/src/js/features/Search.js';

const menuItems = new Map();
menuItems.set('menu_home', {
    open: true,
    needsFocus: false,
    focusOnOpen: false
});
menuItems.set('menu_add_app', {
    open: false,
    needsFocus: true,
    focusOnOpen: '#menu_add_app_file'
});
menuItems.set('menu_add_cli_comm', {
    open: false,
    needsFocus: true,
    focusOnOpen: false
});
menuItems.set('menu_add_web_link', {
    open: false,
    needsFocus: true,
    focusOnOpen: false
});
menuItems.set('menu_add_category', {
    open: false,
    needsFocus: true,
    focusOnOpen: false
});

let menuOpenItemId;

/**
 * HomeComponent.
 *
 * @class
 * @constructor
 * @public
 * @property {Search} _search
 */
export class HomeComponent extends Component {
    /**
     * Constructor.
     *
     * @param {App} app
     */
    constructor(app) {
        super(app);
    }

    /**
     * onInit.
     */
    onInit() {
        this._search = new Search(this._app);

        for (const [itemId, item] of menuItems) {
            if (!item.open) {
                $('#'+ itemId).hide();
            } else {
                menuOpenItemId = itemId;
            }
        }

        $('#menu a[data-show-menu-item]').click((ev) => {
            // ugly hack, closing bootstrap's drop-down @TODO implement properly
            $('body').trigger('click');

            const itemIdClicked = $(ev.target).attr('data-show-menu-item');
            this.openMenuItem(itemIdClicked);
            
            return false;
        });

        $('[data-toggle="tooltip"]').tooltip();
    }

    /**
     * openMenuItem
     *
     * @param {String} itemId
     */
    openMenuItem(itemId) {
        $('#'+ menuOpenItemId).hide();
        $('#'+ itemId).show();
        menuOpenItemId = itemId;

        const menuItem = menuItems.get(itemId);

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
