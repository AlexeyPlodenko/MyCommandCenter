import { log } from "../../../helpers/DevTools.js";
import { AbstractActionExecuteCommand } from "./AbstractActionExecuteCommand.js";

/**
 *
 */
export class BatActionExecuteCommand extends AbstractActionExecuteCommand {
    /**
     * @returns {string[]}
     */
    static getExtensions() {
        return ['bat'];
    }
}
