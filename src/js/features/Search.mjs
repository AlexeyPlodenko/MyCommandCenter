/**
 * Search.
 *
 * @class
 * @constructor
 * @public
 */
export class Search {
    /**
     * Constructor.
     *
     * @param {App} app
     */
    constructor(app) {
        this._uiFocusInit();
    }
    
    /**
     *
     */
    _uiFocusInit() {
        let $search_input = $('#search_input');
        $search_input.focus();
        $search_input.on('blur', function () {
            $(this).focus();
        });
    }
}
