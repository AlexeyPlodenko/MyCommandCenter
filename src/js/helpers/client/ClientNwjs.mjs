import { AbstractClient } from "./AbstractClient.mjs";


/**
 * ClientNwjs.
 *
 * @class
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
     * @returns {string}
     */
    getPath() {
        return this.path$.value;
    }

    /**
     * @param {string} url
     */
    redirect(url) {
        this.path$.next(url);
    }
}
