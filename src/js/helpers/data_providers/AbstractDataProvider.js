import { Abstract } from "../Abstract.js";

/**
 * @class
 * @abstract get
 * @abstract set
 * @abstract remove
 */
export class AbstractDataProvider extends Abstract {
    /**
     * Constructor.
     */
    constructor() {
        if (new.target === AbstractDataProvider) {
            throw new Error(
                'Cannot construct AbstractDataProvider instances directly.'
            );
        }

        if (typeof this.get !== 'function') {
            throw new Error('Class must implement the method "get".');
        }
        if (typeof this.set !== 'function') {
            throw new Error('Class must implement the method "set".');
        }
        if (typeof this.remove !== 'function') {
            throw new Error('Class must implement the method "remove".');
        }
    }
}
