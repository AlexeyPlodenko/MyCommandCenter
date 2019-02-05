import { Abstract } from '../helpers/Abstract.js';
import { App } from './App.js';
import { log } from '../helpers/DevTools.js';

const JsRender = require('jsrender/jsrender-node');

/**
 * UI.
 *
 * @class
 * @property {App} _app
 * @property {JQuery} _$body
 */
export class Ui extends Abstract {
    /**
     * Constructor.
     *
     * @param {App} app
     */
    constructor(app) {
        super();

        this._app = app;
        this._$body = $('body');
    }

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
     * Render template and insert into HTML body tag.
     *
     * @param {string} tmplName
     * @param {any} data
     */
    renderTemplate(tmplName, data) {
        const tmpl = this._getTemplateInstance(tmplName);

        const componentNodeId = this._getComponentNodeId(tmplName);

        let html = tmpl.render(data);
        html = `<span id="${componentNodeId}">${html}</span>`;

        const $compNode = $(html);

        this._$body.empty();
        this._$body.append($compNode);

        $('body').html(html);
    }

    /**
     * Init. logic affecting UI or working with DOM.
     */
    init() {
        this._app.client.path$.subscribe((path) => {
            log('URL path has changed', path);

            const urlPath = this._app.client.getPath();
            const route = this._app.router.getRouteByPath(urlPath);

            const comp = this._app.componentFactory.createComponent(
                route.component
            );

            comp.state.subscribe((state) => {
                log('Current component state has changed: ', state);

                this._app.ui.renderTemplate(route.template, state);

                setTimeout(() => {
                    // wait until element is in DOM.
                    // @TODO rewrite with mutationObserver

                    comp.init();
                }, 0);
            });
        });
    }

    /**
     * @param {string} tmplName
     * @returns {string}
     */
    _getComponentNodeId(tmplName) {
        return tmplName +'Component';
    }

    /**
     * @param {string} tmplName
     * @returns {any}
     */
    _getTemplateInstance(tmplName) {
        if (this._tpls === undefined) {
            this._tpls = {};
        }

        if (!this._tpls.hasOwnProperty(tmplName)) {
            const tmplPath = './src/js/features/pages/'+ tmplName +
                             '/templates/'+ tmplName +'.html';

            this._tpls[tmplName] = JsRender.templates(tmplPath);
        }

        return this._tpls[tmplName];
    }

    /**
     * Expand selector to jQuery instance from the string or jQuery instance.
     *
     * @param {string|JQuery} selector
     * @returns {JQuery}
     */
    _expandSelectorToJquery(selector) {
        let $selector;

        if (typeof selector === 'string') {
            $selector = $(selector);
        } else if (typeof selector === 'object') {
            if (selector instanceof HTMLElement) {
                $selector = $(selector);
            } else if (selector instanceof jQuery) {
                $selector = selector;
            } else {
                throw new Error('Unsupported type of selector supplied.');
            }
        } else {
            throw new Error('Unsupported type of selector supplied.');
        }

        return $selector;
    }
}
