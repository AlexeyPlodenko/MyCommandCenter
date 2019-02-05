/**
 * Menu.
 *
 * @class
 * @property {App} _app
 * @property {Map} items A collection of menu items, that are shown in UI.
 * @property {string} openItemId 
 */
export class Menu {
    /**
     * Constructor.
     *
     * @param {App} app
     */
    constructor(app) {
        this._app = app;

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
}
