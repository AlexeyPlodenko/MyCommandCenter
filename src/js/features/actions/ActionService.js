import { ActionModel } from "./ActionModel.js";
import { AppException } from "../../exceptions/AppException.js";
import { ExeActionExecute } from "./ActionExecute/ExeActionExecute.js";
import { log } from "../../helpers/DevTools.js";
import { Abstract } from "../../helpers/Abstract.js";

const actionExecClasses = [
    ExeActionExecute
];

export class ActionService extends Abstract {
    /**
     * @param {ActionModel} action
     */
    runAction(action) {
        if (!/\.[a-z\d_-]+/i.test(action.path)) {
            throw new AppException('Could not find extension in the path.');
        }

        const ext = action.path.split('.').pop().toLowerCase();
        const executor = this._getExtExecutor(ext);
        executor.execute(action);
    }

    /**
     * @returns {AbstractActionExecute}
     */
    _getExtExecutor(ext) {
        if (this._actionExecutors === undefined) {
            this._initExtMap();
        }

        if (this._actionExecutors[ext] === undefined) {
            throw new UserException(`Extension ${ext} is not supported yet.`);
        }

        const actionExecName = this._actionExecutors[ext];

        return this._actionExecutorRegistry[actionExecName];
    }

    _initExtMap() {
        this._actionExecutorRegistry = {};
        this._actionExecutors = {};

        const actExecReg = this._actionExecutorRegistry;
        actionExecClasses.forEach(execClass => {
            const execClassName = execClass.name;
            if (actExecReg[execClassName] === undefined) {
                actExecReg[execClassName] = new execClass();
            }

            const exts = actExecReg[execClassName].getExtensions();
            exts.forEach(ext => {
                this._actionExecutors[ext] = execClassName;
            });
        });
    }
}
