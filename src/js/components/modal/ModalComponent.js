import { AbstractVueComponent } from "../AbstractVueComponent.js";
import { log } from "../../helpers/DevTools.js";

/**
 * @property {string} title
 * @property {string} text
 * @property {string} accept
 * @property {string} cancel
 */
export class ModalComponent extends AbstractVueComponent {
    /**
     * @param {App} app
     * @param {string} id
     */
    constructor(app, id) {
        super(app);
        this._id = id;

        this.data = {
            title: '',
            text: '',
            accept: '',
            cancel: '',
            id: id
        };
    }

    /**
     * @returns {string}
     */
    get id() {
        return this._id;
    }

    /**
     *
     */
    init() {
        this.setVueParam(
            'template',
            `
            <div class="modal fade" :id="id" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="false">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modalLabel" v-if="title">{{ title }}</h5>
                            <button v-if="cancel" type="button" class="close" data-dismiss="modal" :aria-label="cancel">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body" v-if="text">{{ text }}</div>
                        <div class="modal-footer">
                            <button v-if="cancel" type="button" class="btn btn-secondary" data-dismiss="modal">{{ cancel }}</button>
                            <button v-if="accept" type="button" class="btn btn-primary" @click="_accepted();">{{ accept }}</button>
                        </div>
                    </div>
                </div>
            </div>
            `
        );
        this.setVueParam('el', 'modal');
        this.setVueParam('data', () => {
            return this.data;
        });

        super.init();
    }

    /**
     * Set accept callback, which will be called once ACCEPT button is hit.
     *
     * @param {function} callback
     */
    setOnAccept(callback) {
        this._onAccept = callback;
    }

    /**
     * Show the modal window.
     */
    show() {
        $('#'+ this.id).modal('show');
    }

    /**
     * Hide the modal window.
     */
    hide() {
        $('#'+ this.id).modal('hide');
    }

    /**
     * Called if ACCEPT button is clicked in modal.
     */
    _accepted() {
        if (typeof this._onAccept === 'function') {
            (this._onAccept)();
        }
        this.hide();
    }
}
