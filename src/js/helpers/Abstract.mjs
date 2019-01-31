/**
 * Abstract.
 *
 * @class
 * @constructor
 * @private
 */
export class Abstract {
    /**
     * Constructor.
     */
    constructor() {
        if (new.target === Abstract) {
            throw 'Cannot construct Abstract instances directly.';
        }
    }
}
