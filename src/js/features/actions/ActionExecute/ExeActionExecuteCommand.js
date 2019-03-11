import { log } from "../../../helpers/DevTools.js";
import { AbstractActionExecuteCommand } from "./AbstractActionExecuteCommand.js";

const exec = require('child_process').execFile;

export class ExeActionExecuteCommand extends AbstractActionExecuteCommand {
    /**
     * @returns {string[]}
     */
    getExtensions() {
        return ['exe'];
    }

    /**
     * @param {ActionModel} action
     */
    execute(action) {
log('execute', action.path);
        exec(action.path, action.arguments, (err, stdout, stderr) => {
log('exec', err, stdout, stderr);
            if (err) {
                this._app.ui.showNotificationModal('Error', err);
            } else {
                this._app.ui.showNotificationModal(
                    'The app. is running',
                    stdout.toString().trim()
                );
            }
        });
    }


}
