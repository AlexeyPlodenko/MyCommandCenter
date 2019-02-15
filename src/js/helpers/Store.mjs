const BehaviorSubject = require('rxjs/BehaviorSubject').BehaviorSubject;

/**
 * Component.
 *
 * @class
 * @property {BehaviorSubject} _state$
 * @property {Observable} state$
 */
export class Store {
    /**
     * Constructor.
     */
    constructor() {
        this._state$ = new BehaviorSubject({});
        this.state$ =  this._state$.asObservable();
    }

    /**
     * Update an item in state.
     *
     * @param {string} itemName
     * @param {any} itemValue
     */
    setStateItem(itemName, itemValue) {
        const state = this._state$.getValue();
        state[itemName] = itemValue;

        this._state$.next(state);
    }
}
