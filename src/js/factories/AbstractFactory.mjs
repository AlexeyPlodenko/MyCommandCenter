import { Abstract } from "../helpers/Abstract.mjs";

export class AbstractFactory extends Abstract {
    /**
     * Constructor.
     */
    constructor() {
        super();

        if (new.target === AbstractFactory) {
            throw new Error(
                'Cannot construct AbstractFactory instances directly.'
            );
        }
    }
}
