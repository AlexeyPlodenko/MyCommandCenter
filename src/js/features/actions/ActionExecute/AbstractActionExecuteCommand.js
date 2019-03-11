import { Abstract } from "../../../helpers/Abstract.js";
import { AppException } from "../../../exceptions/AppException.js";
import { Variable } from "../../../helpers/Variable.js";

export class AbstractActionExecuteCommand extends Abstract {
    /**
     * Constructor.
     *
     * @param {App} app
     */
    constructor(app) {
        super();

        this._app = app;

        if (new.target === AbstractActionExecuteCommand) {
            throw new AppException(
                'Cannot construct AbstractActionExecuteCommand '
                +'instances directly.'
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
        if (!Variable.isArray(exts)
            || exts.length === 0) {

            throw new AppException(
                'The method "getExtensions" must return an array of extensions.'
            );
        }
    }
}
