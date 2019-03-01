import { Abstract } from "../Abstract.js";
import { AppException } from "../../exceptions/AppException.js";

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
        super();

        if (new.target === AbstractDataProvider) {
            throw new AppException(
                'Cannot construct AbstractDataProvider instances directly.'
            );
        }

        if (typeof this.get !== 'function') {
            throw new AppException('Class must implement the method "get".');
        }
        if (typeof this.set !== 'function') {
            throw new AppException('Class must implement the method "set".');
        }
        if (typeof this.remove !== 'function') {
            throw new AppException('Class must implement the method "remove".');
        }
    }
}
