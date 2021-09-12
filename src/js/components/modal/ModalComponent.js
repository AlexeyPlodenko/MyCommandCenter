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
     * @param {string} id
     */
    constructor(id) {
        super();
        this._id = id;

        this.data = {
            title: '',
            text: '',
            html: '',
            accept: '',
            cancel: '',
            id: id
        };

        this.js = {
            afterMount: null
        };
    }

    /**
     * @returns {string}
     */
    get id() {
        return this._id;
    }

    /**
     * init.
     */
    init() {
        this.setVueParam(
            'template',
            `
            <div class="modal fade" :id="id" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="false" @keypress="keyPressed">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modalLabel" v-if="title">{{ title }}</h5>
                            <button v-if="cancel" type="button" class="close" data-dismiss="modal" :aria-label="cancel">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body" v-if="text">{{ text }}</div>
                        <div class="modal-body" v-if="html" v-html="html"></div>
                        <div class="modal-footer">
                            <button v-if="cancel" type="button" class="btn btn-secondary" data-dismiss="modal">{{ cancel }}</button>
                            <button v-if="accept" type="button" class="btn btn-primary" @click="accepted();">{{ accept }}</button>
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

        this.setVueParam('mounted', this.afterMount.bind(this));

        super.init();
    }

    /**
     * @param {string} title
     */
    setTitle(title) {
        this.data.title = title;
    }

    /**
     * @param {string} text
     */
    setText(text) {
        this.data.text = text;
    }

    /**
     * @param {string} html
     */
    setHtml(html) {
        this.data.html = html;
    }

    /**
     * @param {string} accept
     */
    setAccept(accept) {
        this.data.accept = accept;
    }

    /**
     * @param {string} cancel
     */
    setCancel(cancel) {
        this.data.cancel = cancel;
    }

    /**
     * @param {function} jsCallback
     */
    setBeforeShow(jsCallback) {
        this.data.jsCallback = jsCallback;
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
     * @param {function} [callbackOnInit = null]
     * @param {function} [callbackOnShown = null]
     */
    show(callbackOnInit = null, callbackOnShown = null) {
        $('#'+ this.id)
            .on('shown.bs.modal', () => {
                if (callbackOnShown) {
                    (callbackOnShown)();
                }
            })
            .modal('show');

        if (callbackOnInit) {
            (callbackOnInit)();
        }
    }

    /**
     * Hide the modal window.
     * @param {function} [callback = null]
     */
    hide(callback = null) {
        $('#'+ this.id).modal('hide');

        if (callback) {
            (callback)();
        }
    }

    /**
     * Handling of key press events.
     */
    keyPressed(ev) {
        if (ev.key === 'Enter') {
            this.accepted();
        }
    }

    /**
     * Called if ACCEPT button is clicked in modal.
     */
    accepted() {
        if (typeof this._onAccept === 'function') {
            (this._onAccept)();
        }
        this.hide();
    }

    /**
     * @protected
     */
    afterMount() {
        if (this.js.afterMount) {
            (this.js.afterMount)();
        }
    }
}
