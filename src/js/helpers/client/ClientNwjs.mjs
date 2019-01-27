import { AbstractClient } from '/src/js/helpers/client/AbstractClient.mjs';

/**
 * ClientNwjs.
 *
 * @class
 * @constructor
 * @private
 */
export class ClientNwjs extends AbstractClient {
    /**
     * Constructor;
     */
    constructor() {
        super();

        this.redirect('/');
    }

    /**
     * @returns {String}
     */
    getPath() {
        return this.path$.value;
    }

    /**
     * @param {String} url
     */
    redirect(url) {
        this.path$.next(url);
    }
}
