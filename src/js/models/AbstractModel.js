import { Abstract } from "../helpers/Abstract.js";
import { ActionModel } from "../features/actions/ActionModel.js";
import { VariableHelper } from "../helpers/VariableHelper.js";
import { AppException } from "../exceptions/AppException.js";

/**
 * @class
 */
export class AbstractModel extends Abstract {
    /**
     * Constructor.
     */
    constructor() {
        super();

        if (new.target === AbstractModel) {
            throw new Error(
                'Cannot construct AbstractModel instances directly.'
            );
        }

        // const className = ;
        // const classPointer = eval(this.constructor.name);
// console.log('className', classPointer);
        // if (typeof this.isDataValid !== 'function') {
        //     && window[className].hasOwnProperty('isDataValid')) {
            // check that static method isDataValid is implemented

            // throw new Error('Class must implement the method "isDataValid".');
        // }
    }

    /**
     * Fill the model from the data in the 1st argument.
     *
     * @param {<[string, string|string[]]>} data
     * @param {boolean} abortOnUnknownKey
     * @param {boolean} emptyValuesAllowed
     */
    setData(data, abortOnUnknownKey = true, emptyValuesAllowed = true) {
        for (const key in data) {
            // iterate over the data set and assign the value

            if (this.hasOwnProperty(key)) {
                if (emptyValuesAllowed || !VariableHelper.isEmpty(data[key])) {
                    // store only if empty values are allowed or not empty
                    this[key] = data[key];
                }
                // otherwise skip

            } else if (!abortOnUnknownKey) {
                throw new AppException(
                    'Property "'+ key +'" does not exist in this model. '+
                    'Either set the 2nd argument to TRUE or check data '+
                    'in 1st argument.'
                );
            }
        }
    }

    /**
     * Create an instance of a model and pre-fill it.
     *
     * @param {any} data
     */
    static createFromData(data) {
        const inst = new this();
        inst.setData(data);

        return inst;
    }
}
