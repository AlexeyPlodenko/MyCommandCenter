import { AbstractActionExecute } from "./AbstractActionExecute.js";
import { log } from "../../../helpers/DevTools.js";

export class ExeActionExecute extends AbstractActionExecute {
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
        //https://stackoverflow.com/questions/19762350/execute-an-exe-file-using-node-js
        //https://github.com/nwjs/nw.js/issues/2283
        log('execute', action);
    }
}
