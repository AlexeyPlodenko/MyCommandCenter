const BehaviorSubject = require('rxjs/BehaviorSubject').BehaviorSubject;

import { Abstract } from '/src/js/helpers/Abstract.js';

/**
 * AbstractClient.
 *
 * @class
 * @constructor
 * @public
 * @property {BehaviorSubject} path$
 */
export class AbstractClient extends Abstract {
    /**
     * Constructor.
     */
    constructor() {
        super();

        if (new.target === AbstractClient) {
            throw 'Cannot construct AbstractClient instances directly.';
        }

        if (typeof this.getPath !== 'function') {
            throw 'Class must implement the method "getPath".';
        }
        if (typeof this.redirect !== 'function') {
            throw 'Class must implement the method "redirect".';
        }

        this.path$ = new BehaviorSubject();
    }
}
