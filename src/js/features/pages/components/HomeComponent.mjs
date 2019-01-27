import { Component } from '/src/js/features/pages/components/Component.mjs';
import { Search } from '/src/js/features/Search.mjs';

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

        this._search = new Search(app);
    }
}
