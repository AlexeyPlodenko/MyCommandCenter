import { App } from "./app/App.js";
import { logError, log } from "./helpers/DevTools.js";

const VueRx = require('vue-rx');

// const optionDefinitions = [
//     { name: 'verbose', alias: 'v', type: Boolean },
//     { name: 'src', type: String, multiple: true, defaultOption: true },
//     { name: 'timeout', alias: 't', type: Number },
// ];
// const commandLineArgs = require('command-line-args');
// const options = commandLineArgs(optionDefinitions, {
//     argv: ['-v', '--timeout=1000', '/asda/asdas/dasd/asd/', '/345435/34534/5345/']
// });
// console.log(options);

/**
 * A bootstrap's error handling class.
 * Lets keep it here so errors may be caught early.
 *
 * @class
 * @property {string} _storageKey A name of the key to use in localstorage.
 * @property {number} _maxErrors Max. amount of errors to store. The rest
 *                               would be popped out.
 */
class ErrorsStorage {
    /**
     * Constructor.
     */
    constructor() {
        this._storageKey = '_errors';
        this._maxErrors = 10;
    }

    /**
     * @param {*} error
     */
    add(error) {
        error.date = new Date();

        const storedErrors = this.getAll();
        storedErrors.unshift(error);
        storedErrors.splice(this._maxErrors);

        const storedErrorsJson = JSON.stringify(storedErrors);
        localStorage.setItem(this._storageKey, storedErrorsJson);
    }

    /**
     * Load the errors from the localstorage and return.
     *
     * @returns {array}
     */
    getAll() {
        const storedErrorJson = localStorage.getItem(this._storageKey);

        let storedError;
        if (storedErrorJson) {
            try {
                storedError = JSON.parse(storedErrorJson);
            } catch (ex) {
                // JSON is corrupt. This should not happen. But we would be ready.
                logError(
                    'Failed to parse JSON with stored errors. Clearing. '+
                    'Reload the app. to continue.'
                );
                this.clear();
                storedError = [];
            }
        } else {
            storedError = [];
        }

        return storedError;
    }

    /**
     * Remove the stored errors from the localstorage.
     */
    clear() {
        localStorage.removeItem(this._storageKey);
    }
}
// ------------------------------------------------------------------------

const errors = new ErrorsStorage();

// handling exceptions from Node
process.on('unhandledRejection', function (reason, promise) {
    handleNodeJsException('UnhandledRejection', reason, promise);
});
process.on('uncaughtException', function (reason, promise) {
    handleNodeJsException('UncaughtException', reason, promise);
});
function handleNodeJsException(type, reason, promise) {
    logError(reason, promise);

    errors.add({
        type: type,
        stack: reason.stack,
        reason: reason,
        promise: promise
    });
}

// handling errors in Chrome
window.onerror = function myErrorHandler(msg, url, lineNo, columnNo, error) {
    errors.add({
        type: 'OnError',
        msg: msg,
        url: url,
        lineNo: lineNo,
        columnNo: columnNo,
        stack: error.stack
    });
    return false;
};

// handling Vue errors
Vue.config.errorHandler = function (err) {
    logError(err);

    errors.add({
        type: 'VueException',
        err: err
    });
};

// show the errors from the last run time
(function() {
    const errorList = errors.getAll();
    if (errorList.length > 0) {
        logError(
            'Errors have occurred during the last run. The app. was reloaded '+
            'to prevent any inconsistency or data corruption. '+
            'Check the list below.'
        );
        for (let i = 0, total = errorList.length; i < total; i++) {
            const error = errorList[i];

            let msg;
            let stack;
            switch (error.type) {
                case 'OnError':
                    // msg = error.msg;
                    stack = error.stack;

                    delete error.stack;
                    delete error.msg;

                    break;
            }

            console.group('#'+ (i + 1));

            if (msg !== undefined) {
                logError(msg);
            }
            if (stack !== undefined) {
                logError(stack);
            }
            logError(error);

            console.groupEnd();
        }
        errors.clear();
    }
})();

Vue.use(VueRx);

// run the app.
try {
    window.app = new App();
} catch (ex) {
    // handling errors from the App. itself

    if (ex.isShowToUser !== undefined && ex.isShowToUser()) {
        alert(ex.getMessage());
    } else {
        logError('AppException', ex);
    }
}
