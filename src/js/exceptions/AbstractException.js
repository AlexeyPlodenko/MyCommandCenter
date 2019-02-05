export class AbstractException extends Error {
    /**
     * Constructor.
     */
    constructor() {
        super();

        if (new.target === AbstractException) {
            throw new Error(
                'Cannot construct AbstractException instances directly.'
            );
        }
    }
}
