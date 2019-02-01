/**
 * Search.
 *
 * @class
 * @constructor
 * @public
 * @property {Boolean} _focusLock
 */
export class Search {
    /**
     * Constructor.
     *
     * @param {App} app
     */
    constructor(app) {
        this._focusLock = true;

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
     * _setUiFocus
     */
    _setUiFocus() {
        const $search_input = $('#search_input');
        
        $search_input.focus();

        $search_input.on('blur', (ev) => {
            if (this.isFocusLocked()) {
                $(ev.target).focus();
            }
        });
    }

    /**
     * _removeUiFocus.
     */
    _removeUiFocus() {
        $('#search_input').off('blur');
    }
}
