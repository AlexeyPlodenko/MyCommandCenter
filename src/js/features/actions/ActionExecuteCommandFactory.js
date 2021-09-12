import { ActionModel } from "./ActionModel.js";
import { AppException } from "../../exceptions/AppException.js";
import { log } from "../../helpers/DevTools.js";
import { UserException } from "../../exceptions/UserException.js";
import { AbstractFactory } from "../../factories/AbstractFactory.js";
import { ExeActionExecuteCommand } from "./ActionExecute/ExeActionExecuteCommand.js";
import { BatActionExecuteCommand } from "./ActionExecute/BatActionExecuteCommand.js";
import { AbstractActionExecuteCommand } from "./ActionExecute/AbstractActionExecuteCommand.js";

/**
 * @var AbstractActionExecute[]
 */
const actionExecClasses = [
    ExeActionExecuteCommand,
    BatActionExecuteCommand
];

/**
 * @class
 * @property {App} _app
 */
export class ActionExecuteCommandFactory extends AbstractFactory {
    /**
     * @param {ActionModel} action
     * @returns {AbstractActionExecuteCommand}
     */
    makeActionExecuteCommand(action) {
        if (!/\.[a-z\d_-]+/i.test(action.path)) {
            throw new AppException('Could not find extension in the path.');
        }

        const ext = action.path.split('.').pop().toLowerCase();
        const actionExecCommand = this._getExtExecutor(ext);
        return new actionExecCommand(action);
    }

    // /**
    //  * @param {ActionModel} action
    //  */
    // runAction(action) {
    //     if (!/\.[a-z\d_-]+/i.test(action.path)) {
    //         throw new AppException('Could not find extension in the path.');
    //     }

    //     const ext = action.path.split('.').pop().toLowerCase();
    //     const executor = this._getExtExecutor(ext);
    //     executor.execute(action);
    // }

    /**
     * @returns {function}
     */
    _getExtExecutor(ext) {
        if (this._actionExecutorCommands === undefined) {
            this._initExtMap();
        }

        if (this._actionExecutorCommands[ext] === undefined) {
            throw new UserException(`Extension .${ext} is not supported yet.`);
        }

        return this._actionExecutorCommands[ext];
    }

    /**
     * _initExtMap
     */
    _initExtMap() {
        this._actionExecutorCommands = {};

        actionExecClasses.forEach(execClass => {
            const exts = execClass.getExtensions();
            exts.forEach(ext => {
                this._actionExecutorCommands[ext] = execClass;
            });
        });
    }
}
