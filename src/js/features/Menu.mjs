/**
 * Menu.
 *
 * @class
 * @constructor
 * @public
 * @property {App} _app
 */
export class Menu {
    /**
     * Constructor.
     *
     * @param {App} app
     */
    constructor(app) {
        this._app = app;

        this._initExpandableSubMenu();
    }

    /**
     * Register events for handling of sub-menu expanding.
     */
    _initExpandableSubMenu() {
        $('#menu .menu_lvl_2').prevAll('.menu_btn').click((event) => {
            const $subMenu = $(event.currentTarget).nextAll('.menu_lvl_2:first');
            this._app.ui.toggle($subMenu);
        });
    }
}
