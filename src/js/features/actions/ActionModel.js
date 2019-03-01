import { AbstractModel } from "../../models/AbstractModel.js";
import { VariableHelper } from "../../helpers/VariableHelper.js";

/**
 * @class
 *
 * @property {string} path
 * @property {string[]} arguments
 */
export class ActionModel extends AbstractModel {
    /**
     * Constructor.
     *
     * @param {any} data
     */
    constructor(data) {
        super(data);

        this._data.name = '';
        this._data.path = '';
        this._data.arguments = [];

        // @TODO find a better way to set the initial model data
        if (!VariableHelper.isEmpty(data)) {
            this.setData(data);
        }
    }

    /**
     *
     * @param {any} data
     * @returns {boolean}
     */
    static isDataValid(data) {
        return false;
    }

    /**
     * @returns {string}
     */
    getName() {
        return this._data.name || this._data.path.split(/[\\\/]/).pop();
    }

    /**
     * @returns {string}
     */
    get name() {
        return this._data.name;
    }

    /**
     * @param {string} value
     */
    set name(value) {
        this._data.name = value;
    }

    /**
     * @returns {string}
     */
    get path() {
        return this._data.path;
    }

    /**
     * @param {string} value
     */
    set path(value) {
        this._data.path = value;
    }

    /**
     * @returns {string[]}
     */
    get arguments() {
        return this._data.arguments;
    }

    /**
     * @param {string[]} value
     */
    set arguments(value) {
        this._data.arguments = value;
    }
}
