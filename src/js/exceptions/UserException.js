import { AbstractException } from "./AbstractException.js";

/**
 * @class
 */
export class UserException extends AbstractException {
    /**
     * Constructor
     */
    constructor() {
        super();

        this._showToUser = true;
    }
}
