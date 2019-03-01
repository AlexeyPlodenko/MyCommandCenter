/**
 * @class
 * @property {boolean} _showToUser Should the error be shown in modal
 *                                 to the user, or just logged to the console.
 */
export class AbstractException extends Error {
    /**
     * Constructor.
     */
    constructor() {
        super();

        if (new.target === AbstractException) {
            throw new Error(
                'Cannot construct AbstractException instances directly.'
            );
        }

        this._showToUser = false;
    }

    /**
     * @returns {boolean}
     */
    isShowToUser() {
        return this._showToUser;
    }

    /**
     * @returns {string}
     */
    getMessage() {
        return '';
    }
}
