import { AbstractActionExecute } from "./AbstractActionExecute.js";
import { log } from "../../../helpers/DevTools.js";

const exec = require('child_process').execFile;

export class ExeActionExecute extends AbstractActionExecute {
    /**
     * @returns {string[]}
     */
    getExtensions() {
        return ['exe', 'bat'];
    }

    /**
     * @param {ActionModel} action
     */
    execute(action) {
        exec(action.path, action.arguments, (err, data) => {
            if (err) {
                this._app.ui.showNotificationModal('Error', err);
            } else {
                this._app.ui.showNotificationModal(
                    'The app. is running',
                    data.toString()
                );
            }
        });
    }
}
