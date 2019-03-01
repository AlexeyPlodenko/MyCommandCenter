import { Abstract } from "../helpers/Abstract.js";
import { AppException } from "../exceptions/AppException.js";

export class AbstractFactory extends Abstract {
    /**
     * Constructor.
     */
    constructor() {
        super();

        if (new.target === AbstractFactory) {
            throw new AppException(
                'Cannot construct AbstractFactory instances directly.'
            );
        }
    }
}
