import { ActionModel } from "./ActionModel.js";
import { AppException } from "../../exceptions/AppException.js";
import { log } from "../../helpers/DevTools.js";
import { UserException } from "../../exceptions/UserException.js";
import { AbstractFactory } from "../../factories/AbstractFactory.js";
import { ExeActionExecuteCommand } from "./ActionExecute/ExeActionExecuteCommand.js";

const actionExecClasses = [
    ExeActionExecuteCommand
];

/**
 * @class
 * @property {App} _app
 */
export class ActionExecuteCommandFactory extends AbstractFactory {
    /**
     * Constructor.
     *
     * @param {App} app
     */
    constructor(app) {
        super();

        this._app = app;
    }

    makeActionExecuteCommand(action) {

    }

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
            throw new UserException(`Extension .${ext} is not supported yet.`);
        }

        const actionExecName = this._actionExecutors[ext];

        return this._actionExecutorRegistry[actionExecName];
    }

    /**
     * _initExtMap
     */
    _initExtMap() {
        this._actionExecutorRegistry = {};
        this._actionExecutors = {};

        const actExecReg = this._actionExecutorRegistry;
        actionExecClasses.forEach(execClass => {
            const execClassName = execClass.name;
            if (actExecReg[execClassName] === undefined) {
                actExecReg[execClassName] = new execClass(this._app);
            }

            const exts = actExecReg[execClassName].getExtensions();
            exts.forEach(ext => {
                this._actionExecutors[ext] = execClassName;
            });
        });
    }
}
