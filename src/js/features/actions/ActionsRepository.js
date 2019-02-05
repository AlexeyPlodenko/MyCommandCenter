import { AbstractRepository } from "../../repositories/AbstractRepository.js";

/**
 * @property {ActionModel[]} _actions
 */
export class ActionsRepository extends AbstractRepository {
    /**
     * Constructor.
     */
    constructor() {
        super();

        this._actions = [];
    }

    /**
     * @param {ActionModel} action 
     */
    addActionModel(action) {
        if (typeof action !== 'object' || !(action instanceof ActionModel)) {
            throw new Error('Action must be an instance of ActionModel.');
        }

        this._actions.push(action);
    }
}
