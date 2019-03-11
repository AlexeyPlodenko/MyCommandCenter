import { Abstract } from "./Abstract.js";

export class AbstractCommand extends Abstract {
    /**
     * Constructor.
     */
    constructor() {
        super();

        if (new.target === AbstractCommand) {
            throw new AppException(
                'Cannot construct AbstractCommand instances directly.'
            );
        }
    }
}
