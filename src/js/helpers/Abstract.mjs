/**
 * Abstract.
 *
 * @class
 */
export class Abstract {
    /**
     * Constructor.
     */
    constructor() {
        if (new.target === Abstract) {
            throw new Error('Cannot construct Abstract instances directly.');
        }
    }
}
