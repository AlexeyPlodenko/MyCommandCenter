import { App } from "./app/App.mjs";
import { logError } from "./helpers/DevTools.mjs";

/**
 * A bootstrap's error handling class.
 * Lets keep it here so errors may be caught early.
 *
 * @class
 * @property {string} _storageKey A name of the key to use in localstorage.
 * @property {number} _maxErrors Max. ammount of errors to store. The rest
 *                              would be popped out.
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
     * @param {any} error
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
                // JSON is corrupty. This should not happen.
                // But we would be ready.
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

// handling exception from Node
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

// show the errors from the last run time
(function() {
    const errorList = errors.getAll();
    if (errorList.length > 0) {
        logError(
            'Errors have occured during the last run. The app. was reloaded '+
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

                    delete error.stack, error.msg;

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

// run the app.
try {
    const app = new App();
} catch (ex) {
    // handling errors from the App. itself

    // errors.add({
    //     type: 'AppException',
    //     exception: ex // @TOOD if use this way, need to store ex. properly
    // });
    logError('AppException', ex);
}
