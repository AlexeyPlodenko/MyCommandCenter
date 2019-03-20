import { log } from "../../../helpers/DevTools.js";
import { AbstractActionExecuteCommand } from "./AbstractActionExecuteCommand.js";

export class ExeActionExecuteCommand extends AbstractActionExecuteCommand {
    /**
     * @returns {string[]}
     */
    static getExtensions() {
        return ['exe'];
    }
}
