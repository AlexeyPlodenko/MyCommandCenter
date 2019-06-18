import { Abstract } from "../../../helpers/Abstract.js";
import { AppException } from "../../../exceptions/AppException.js";
import { Variable } from "../../../helpers/Variable.js";
import { log } from "../../../helpers/DevTools.js";

const exec = require('child_process').execFile;
const spawn = require('child_process').spawn;

/**
 * @property {App} _app
 * @property {ActionModel} _action
 */
export class AbstractActionExecuteCommand extends Abstract {
    /**
     * Constructor.
     *
     * @param {App} app
     * @param {ActionModel} action
     */
    constructor(app, action) {
        super();

        this._app = app;
        this._action = action;

        this._exe = null;

        this._onStdOutCbs = [];
        this._onStdErrCbs = [];

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

        // if (typeof this.getExtensions !== 'function') {
        //     throw new AppException(
        //         'Class must implement the method "getExtensions".'
        //     );
        // }

        // const exts = this.getExtensions();
        // if (!Variable.isArray(exts)
        //     || exts.length === 0) {

        //     throw new AppException(
        //         'The method "getExtensions" must return an array of extensions.'
        //     );
        // }
    }

    /**
     * execute
     * @returns {AbstractActionExecuteCommand}
     */
    execute() {
        this._run();

        // setTimeout(() => {
        //     this._disconnect();
        // }, 1000);
        return this;
    }

    /**
     * @param {function} cb
     * @returns {AbstractActionExecuteCommand}
     */
    onStdOut(cb) {
        this._onStdOutCbs.push(cb);

        return this;
    }

    /**
     * @param {function} cb
     * @returns {AbstractActionExecuteCommand}
     */
    onStdErr(cb) {
        this._onStdErrCbs.push(cb);

        return this;
    }

    /**
     * Execute the application and assign listeners.
     */
    _run() {
        this._exe = spawn(this._action.path, this._action.arguments);

        this._exe.stdout.on('data', (data) => {
            for (let i = 0, total = this._onStdOutCbs.length; i < total; i++) {
                (this._onStdOutCbs[i])(data);
            }
        });

        this._exe.stderr.on('data', (data) => {
            for (let i = 0, total = this._onStdErrCbs.length; i < total; i++) {
                (this._onStdErrCbs[i])(data);
            }
        });

        this._exe.on('disconnect', (code) => {
            this._exe = null;
console.log(`child process disconnectect with code ${code}`);
        });

        this._exe.on('close', (code) => {
            this._exe = null;
console.log(`child process exited with code ${code}`);
        });
        // (err, stdout, stderr) => {
        //     log('exec', err, stdout, stderr);
        //     if (err) {
        //         this._app.ui.showNotificationModal('Error', err);
        //     } else {
        //         this._app.ui.showNotificationModal(
        //             'The app. is running',
        //             stdout.toString().trim()
        //         );
        //     }
        // }
    }

    /**
     * Stop listening to the app. messages.
     */
    _disconnect() {
        if (this._exe !== null && this._exe.connected) {
            this._exe.disconnect();
            this._exe = null;
        }
    }
}
