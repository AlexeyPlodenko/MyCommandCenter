import { Abstract } from '../helpers/Abstract.mjs';
import { App } from './App.mjs';
import { AbstractPageComponent } from '../features/pages/AbstractPageComponent.mjs';

const JsRender = require('jsrender/jsrender-node');

/**
 * UI.
 *
 * @class
 * @property {App} _app
 * @property {JQuery} $body
 * @property {AbstractPageComponent} _currentPageComponent
 *
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
        this.$body = $('body');
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

        this.$body.empty();
        this.$body.append($compNode);

        this.$body.html(html);
    }

    /**
     * Init. logic affecting UI or working with DOM.
     */
    init() {
        this._app.client.path$.subscribe((path) => {
            // create component based on the updated path

            const urlPath = this._app.client.getPath();
            const route = this._app.router.getRouteByPath(urlPath);

            /* @type {AbstractPageComponent} */
            this._currentPageComponent = this._app.pageComponentFactory
                                                            .createComponent(
                                                                route.component
                                                            );

            // this._currentPageComponent.store.state$.subscribe((state) => {
                // once component is ready, render the template

                // this._app.ui.renderTemplate(route.template, state);
                this._app.ui.renderTemplate(route.template, {});

                setTimeout(() => {
                    // wait for the template to render in DOM and then run
                    // the component
                    // @TODO rewrite setTimeout with mutationObserver

                    this._currentPageComponent.init();
                    this._currentPageComponent.initProvidedComponents();
                    // this._currentPageComponent.storeUpdated(state);
                }, 0);
            // });
        });
    }

    /**
     * @returns {AbstractPageComponent}
     */
    getCurrentPageComponent() {
        return this._currentPageComponent;
    }

    /**
     * @param {string} tmplName
     * @returns {string}
     */
    _getComponentNodeId(tmplName) {
        return tmplName +'PageComponent';
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
