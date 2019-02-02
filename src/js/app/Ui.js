const Fs = require('fs'),
      Path = require('path');
//const JsRender = require('jsrender');
const JsRender = require('jsrender/jsrender-node');
//var tmpl = $.templates("./templates/myTemplate.html");

/**
 * UI.
 *
 * @class
 * @constructor
 * @public
 */
export class Ui {
    /**
     * Constructor.
     *
     * @param {App} app
     */
    constructor(app) {}

    /**
     * Show element in DOM.
     *
     * @param {string} selector
     */
    show(selector) {
        this._expandSelectorToJquery(selector).removeClass('hidden');
    }

    /**
     * Hide element in DOM.
     *
     * @param {string} selector
     */
    hide(selector) {
        this._expandSelectorToJquery(selector).addClass('hidden');
    }

    /**
     * Show or hide element in DOM based on its current status.
     *
     * @param {string} selector
     */
    toggle(selector) {
        let $node = this._expandSelectorToJquery(selector);
        if ($node.hasClass('hidden')) {
            this.show($node);
        } else {
            this.hide($node);
        }
    }

    /**
     * Render template into HTML body tag
     *
     * @param {String} tmplName
     * @param {Object} data
     */
    renderTemplate(tmplName, data) {
        const tmpl = this._getTemplateInstance(tmplName);
        const html = tmpl.render(data);

        $('body').html(html);
    }

    /**
     * @param {String} tmplName
     * @returns {Object}
     */
    _getTemplateInstance(tmplName) {
        if (this._tpls === undefined) {
            this._tpls = {};
        }

        if (!this._tpls.hasOwnProperty(tmplName)) {
            const tmplPath = './src/templates/pages/' + tmplName +'.html';

            this._tpls[tmplName] = JsRender.templates(tmplPath);
        }

        return this._tpls[tmplName];
    }

    /**
     * Expand selector to jQuery instance from the string or jQuery instance.
     *
     * @param {string|jQuery} selector
     * @returns {jQuery}
     */
    _expandSelectorToJquery(selector) {
        if (typeof selector === 'string') {
            selector = $(selector);
        } else if (typeof selector === 'object') {
            if (selector instanceof HTMLElement) {
                selector = $(selector);
            } else if (!(selector instanceof jQuery)) {
                throw 'Unsupported type of selector supplied.';
            }
        } else {
            throw 'Unsupported type of selector supplied.';
        }

        return selector;
    }
}
