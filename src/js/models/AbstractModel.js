import { Abstract } from "../helpers/Abstract.js";
import { AppException } from "../exceptions/AppException.js";
import { Variable } from "../helpers/Variable.js";

/**
 * @class
 * @property {*} _data
 */
export class AbstractModel extends Abstract {
    /**
     * Constructor.
     */
    constructor() {
        super();

        if (new.target === AbstractModel) {
            throw new AppException(
                'Cannot construct AbstractModel instances directly.'
            );
        }

        // const className = ;
        // const classPointer = eval(this.constructor.name);
// console.log('className', classPointer);
        // if (typeof this.isDataValid !== 'function') {
        //     && window[className].hasOwnProperty('isDataValid')) {
            // check that static method isDataValid is implemented

            // throw new AppException(
                // 'Class must implement the method "isDataValid".'
                // );
        // }

        this._data = {};
    }

    /**
     * Get a list of model's properties.
     *
     * @returns {string[]}
     */
    getModelPropertyNames() {
        return Object.getOwnPropertyNames(this);
    }

    /**
     * Fill the model from the data in the 1st argument.
     *
     * @param {*} data
     * @param {boolean} throwExceptionOnUnknownKey
     * @param {boolean} emptyValuesAllowed
     */
    setData(data,
            throwExceptionOnUnknownKey = true,
            emptyValuesAllowed = true) {
        for (const key in data) {
            // iterate over the data set and assign the value

            if (key in this._data) {
                if (emptyValuesAllowed || !Variable.isEmpty(data[key])) {
                    // store only if empty values are allowed or not empty
                    this._data[key] = data[key];
                }
                // otherwise skip

            } else if (!throwExceptionOnUnknownKey) {
                throw new AppException(
                    `Property "${key}" does not exist in this model. `+
                    'Either set the 2nd argument to TRUE or check data '+
                    'in 1st argument.'
                );
            }
        }
    }

    /**
     * @returns {*}
     */
    getData() {
        return this._data;
    }

    /**
     * @returns {*}
     */
    toJSON() {
        return this._data;
    }

    /**
     * Create an instance of a model and pre-fill it.
     *
     * @param {*} data
     */
    static fromJSON(data) {
        return AbstractModel.createFromData(data);
    }

    /**
     * Create an instance of a model and pre-fill it.
     *
     * @param {*} data
     */
    static createFromData(data) {
        const inst = new this();
        inst.setData(data);

        return inst;
    }
}
