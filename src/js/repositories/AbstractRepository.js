import { Abstract } from "../helpers/Abstract.js";

/**
 * AbstractRepository.
 * 
 * @class
 */
export class AbstractRepository extends Abstract {
    /**
     * Constructor.
     */
    constructor() {
        super();

        if (new.target === AbstractRepository) {
            throw new Error(
                'Cannot construct AbstractRepository instances directly.'
            );
        }
    }
}
