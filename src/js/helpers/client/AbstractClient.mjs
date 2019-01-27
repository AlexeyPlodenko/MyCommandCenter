const BehaviorSubject = require('rxjs/BehaviorSubject').BehaviorSubject;

import { Abstract } from '/src/js/helpers/Abstract.mjs';

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

        if (typeof this.getPath !== 'function') {
            throw 'Class must implement the method "getPath".';
        }
        if (typeof this.redirect !== 'function') {
            throw 'Class must implement the method "redirect".';
        }

        this.path$ = new BehaviorSubject();
    }
}
