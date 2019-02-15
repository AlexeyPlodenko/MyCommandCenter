import { AbstractComponent } from "../AbstractComponent.mjs";
import { FormHelper } from "../../helpers/ui/FormHelper.mjs";


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
     * @param {App} app
     */
    constructor($container, app) {
        super(app);

        this._$container = $container;
        this._selectorField = '.dynamic_field';
        this._selectorAddFieldBtn = '.dynamic_field_add';
        this._selectorRemoveFieldBtn = '.dynamic_field_remove';
        this._elementsCounter = 1;
        this._maxElements = 0; // 0 - to disable the limit
    }

    /**
     * Attach event listeners to DOM elements.
     */
    init() {
        // clone element, once "add" button is clicked
        $(document).on('click', this._selectorAddFieldBtn, (ev) => {
            if (!this._maxElements || this._elementsCounter < this._maxElements) {
                // add one more, only if limit is not reached

                const $fieldContainer = $(ev.target).closest(this._selectorField);

                const $inputCopy = $fieldContainer.clone();
                FormHelper.resetElements($inputCopy.find('input'));
                $fieldContainer.after($inputCopy);


                $fieldContainer.find(this._selectorAddFieldBtn).hide();
                $fieldContainer.find(this._selectorRemoveFieldBtn).show();

                this._elementsCounter++;
            }
        });

        // remove element, once "remove" button is clicked
        $(document).on('click', this._selectorRemoveFieldBtn, (ev) => {
            $(ev.target).closest(this._selectorField).remove();

            this._elementsCounter--;
        });
    }
}
