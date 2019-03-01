import { AppException } from "../exceptions/AppException.js";

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
            throw new AppException(
                'Cannot construct Abstract instances directly.'
            );
        }
    }
}
