import { Abstract } from "../helpers/Abstract.js";

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
    }

    /**
     * Fill the model from the data in the 1st argument.
     * 
     * @param {<[string, string|string[]]>} data 
     * @param {boolean} week 
     */
    setData(data, week) {
        for (const key in data) {
            if (this.hasOwnProperty(key)) {
                this[key] = data[key];
            } else if (!week) {
                throw new Error(
                    'Property "'+ key +'" does not exist in this model. '+
                    'Either set the 2nd argument to TRUE or check data '+
                    'in 1st argument.'
                );
            }
        }
    }

    // static createFromData(data) {

    //     t.setData(data);
    // }
}
