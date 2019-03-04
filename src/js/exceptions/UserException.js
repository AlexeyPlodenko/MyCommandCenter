import { AbstractException } from "./AbstractException.js";

/**
 * @class
 */
export class UserException extends AbstractException {
    /**
     * Constructor
     */
    constructor(msg) {
        super(msg);

        this._showToUser = true;
    }
}
