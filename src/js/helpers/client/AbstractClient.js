import { Abstract } from '../Abstract.js';
import { AppException } from '../../exceptions/AppException.js';

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
            throw new AppException(
                'Cannot construct AbstractClient instances directly.'
            );
        }

        if (typeof this.getPath !== 'function') {
            throw new AppException(
                'Class must implement the method "getPath".'
            );
        }
        if (typeof this.redirect !== 'function') {
            throw new AppException(
                'Class must implement the method "redirect".'
            );
        }

        this.path$ = new BehaviorSubject('');
    }
}
