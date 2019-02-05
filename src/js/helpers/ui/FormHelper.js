import { Abstract } from "../Abstract.js";

/**
 * @class
 */
export class FormHelper extends Abstract {
    /**
     * Reset elements to it default state and clear text inputs.
     * 
     * @param {JQuery} $elements 
     * @returns {JQuery}
     */
    static resetElements($elements) {
        // https://stackoverflow.com/questions/6364289/clear-form-fields-with-jquery
        $elements
            .removeAttr('checked')
            .removeAttr('selected')
            .not(':checkbox, :radio, select')
            .val('');
    }

    /**
     * Extract values from the form elements and return. Elements, which name
     * ends with [], will be returned as arrays of strings.
     * 
     * @param {JQuery} $elements
     * @returns {object}
     */
    static getValues($elements) {
        const values = {};

        $elements.each(function(key, node) {
            const $node = $(node);
            const value = $node.val();
            const name = $node.prop('name');

            if (!name) {
                throw new Error('Name property is missing in some elements.');
            }

            if (name.slice(-2) === '[]') {
                // there can be multiple nodes with same name in the form,
                // we should store the data as an array

                const nameOnly = name.slice(0, -2);

                if (!values.hasOwnProperty(nameOnly)) {
                    values[nameOnly] = [];
                }
                values[nameOnly].push(value);

            } else {
                values[name] = value;
            }
        });

        return values;
    }

    /**
     * Return a jQuery collection of elements that are editable.
     * 
     * @param {JQuery} $container 
     * @returns {JQuery}
     */
    static getEditableElements($container) {
        return $container.find(
            ':input:not([type=button]):not([type=submit]):not([type=reset])'
        );
    }
}
