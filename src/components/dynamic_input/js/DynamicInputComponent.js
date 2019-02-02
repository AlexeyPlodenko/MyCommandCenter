import { AbstractComponent } from "../../../js/components/AbstractComponent.js";
import { FormHelpers } from "../../../js/helpers/ui/FormHelpers.js";

/**
 * DynamicInput.
 *
 * @class
 * @constructor
 * @public
 * @property {jQuery} _$container
 * @property {string} _selectorField
 * @property {string} _selectorAddFieldBtn
 * @property {string} _selectorRemoveFieldBtn
 * @property {number} _elementsCounter
 */
export class DynamicInputComponent extends AbstractComponent {
    /**
     * Constructor.
     * 
     * @param {JQuery} $container 
     */
    constructor($container) {
        super();

        this._$container = $container;
        this._selectorField = '.dynamic_field';
        this._selectorAddFieldBtn = '.dynamic_field_add';
        this._selectorRemoveFieldBtn = '.dynamic_field_remove';
        this._elementsCounter = 1;
    }

    /**
     * Attach event listeners to DOM elements.
     */
    init() {
        // clone element, once "add" button is clicked
        $(document).on('click', this._selectorAddFieldBtn, (ev) => {
            const $fieldContainer = $(ev.target).closest(this._selectorField);
            
            const $inputCopy = $fieldContainer.clone();
            FormHelpers.resetElements($inputCopy.find('input'));
            $fieldContainer.after($inputCopy);

            $fieldContainer.find(this._selectorAddFieldBtn).hide();
            $fieldContainer.find(this._selectorRemoveFieldBtn).show();

            this._elementsCounter++;
        });

        // remove element, once "remove" button is clicked
        $(document).on('click', this._selectorRemoveFieldBtn, (ev) => {
            $(ev.target).closest(this._selectorField).remove();

            this._elementsCounter--;
        });
    }
}
