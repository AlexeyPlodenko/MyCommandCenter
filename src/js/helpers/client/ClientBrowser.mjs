import { AbstractClient } from "./AbstractClient.mjs";

/**
 * ClientBrowser.
 *
 * @class
 */
export class ClientBrowser extends AbstractClient {
    /**
     * @returns {String}
     */
    getPath() {
        return location.pathname;
    }

    /**
     * @param {string} url
     */
    redirect(url) {
        this.path$.next(url);
        location.href = url;
    }
}
