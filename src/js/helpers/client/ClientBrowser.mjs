import { AbstractClient } from '/src/js/helpers/client/AbstractClient.mjs';

/**
 * ClientBrowser.
 *
 * @class
 * @constructor
 * @public
 */
export class ClientBrowser extends AbstractClient {
    /**
     * @returns {String}
     */
    getPath() {
        return location.pathname;
    }

    /**
     * @param {String} url
     */
    redirect(url) {
        this.path$.next(url);
        location.href = url;
    }
}
