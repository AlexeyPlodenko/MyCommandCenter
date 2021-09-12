import { Abstract } from "../Abstract.js";
import { AppException } from "../../exceptions/AppException.js";

/**
 * @class
 * @abstract get
 * @abstract set
 * @abstract remove
 */
export class AbstractDataStorage extends Abstract {
    /**
     * Constructor.
     */
    constructor() {
        super();

        if (new.target === AbstractDataStorage) {
            throw new AppException(
                'Cannot construct AbstractDataStorage instances directly.'
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
