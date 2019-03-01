import { Abstract } from "../../../helpers/Abstract.js";
import { AppException } from "../../../exceptions/AppException.js";

export class AbstractActionExecute extends Abstract {
    /**
     * Constructor.
     */
    constructor() {
        super();

        if (new.target === AbstractActionExecute) {
            throw new AppException(
                'Cannot construct AbstractActionExecute instances directly.'
            );
        }

        if (typeof this.execute !== 'function') {
            throw new AppException(
                'Class must implement the method "execute".'
            );
        }

        if (typeof this.getExtensions !== 'function') {
            throw new AppException(
                'Class must implement the method "getExtensions".'
            );
        }

        const exts = this.getExtensions();
        if (typeof exts !== 'object'
            || !(exts instanceof Array)
            || exts.length === 0)
        {
            throw new AppException(
                'The method "getExtensions" must return an array of extensions.'
            );
        }
    }
}
