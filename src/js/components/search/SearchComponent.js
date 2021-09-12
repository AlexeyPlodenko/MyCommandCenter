import { AbstractComponent } from "../AbstractComponent.js";

/**
 * Search.
 *
 * @class
 * @property {Boolean} _focusLock
 */
export class SearchComponent extends AbstractComponent {
    /**
     * Constructor.
     *
     * @param {App} app
     */
    constructor(app) {
        super(app);

        this._focusLock = true;
    }

    /**
     * Init.
     */
    init() {
        this.$searchInput = $('#search_input');

        this._setUiFocus();
    }

    /**
     * lockFocus.
     */
    lockFocus() {
        this._focusLock = true;
        this._setUiFocus();
    }

    /**
     * unlockFocus
     */
    unlockFocus() {
        this._focusLock = false;
        this._removeUiFocus();
    }

    /**
     * isFocusLocked.
     *
     * @returns {Boolean}
     */
    isFocusLocked() {
        return this._focusLock;
    }

    /**
     * @protected
     */
    _setUiFocus() {
        this.$searchInput.focus();

        this.$searchInput.on('blur', (ev) => {
            if (this.isFocusLocked()) {
                $(ev.target).focus();
            }
        });
    }

    /**
     * @protected
     */
    _removeUiFocus() {
        this.$searchInput.off('blur');
    }
}
