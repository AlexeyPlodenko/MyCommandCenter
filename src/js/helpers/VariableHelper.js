import { Abstract } from "./Abstract.js";

const isEmpty = require('is-empty');

export class VariableHelper extends Abstract {
    /**
     * Check if the parameter is an empty variable.
     * @author https://www.npmjs.com/package/is-empty
     *
     * @param {any} data
     */
    static isEmpty(data) {
        return isEmpty(data);
    }
}
