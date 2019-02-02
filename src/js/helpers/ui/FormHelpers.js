import { Abstract } from "../Abstract.js";

export class FormHelpers {
    /**
     * Reset elements to it default state and clear text inputs.
     * 
     * @param {JQuery} $elements 
     * @returns {JQuery}
     */
    static resetElements($elements) {
        // // https://stackoverflow.com/questions/6364289/clear-form-fields-with-jquery
        $elements
            .removeAttr('checked')
            .removeAttr('selected')
            .not(':checkbox, :radio, select')
            .val('');
    }
}
