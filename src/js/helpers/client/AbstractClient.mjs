import { Abstract } from '../Abstract.mjs';

const BehaviorSubject = require('rxjs/BehaviorSubject').BehaviorSubject;

/**
 * AbstractClient.
 *
 * @class
 * @abstract getPath
 * @abstract redirect
 * @property {BehaviorSubject} path$
 */
export class AbstractClient extends Abstract {
    /**
     * Constructor.
     */
    constructor() {
        super();

        if (new.target === AbstractClient) {
            throw new Error(
                'Cannot construct AbstractClient instances directly.'
            );
        }

        if (typeof this.getPath !== 'function') {
            throw new Error('Class must implement the method "getPath".');
        }
        if (typeof this.redirect !== 'function') {
            throw new Error('Class must implement the method "redirect".');
        }

        this.path$ = new BehaviorSubject('');
    }
}
