import { AbstractRepository } from "../../repositories/AbstractRepository.js";
import { ActionModel } from "./ActionModel.js";
import { AppException } from "../../exceptions/AppException.js";

/**
 * @property {ActionModel[]} _actions
 */
export class ActionsRepository extends AbstractRepository {
    /**
     * Constructor.
     *
     * @param {AbstractDataProvider} storage
     */
    constructor(storage) {
        super(storage);
    }

    /**
     * @param {ActionModel} action
     */
    addActionModel(action) {
        if (typeof action !== 'object' || !(action instanceof ActionModel)) {
            throw new AppException('Action must be an instance of ActionModel.');
        }

        super.add(action);

        this.save();
    }

    /**
     * @returns {function}
     */
    _getModel() {
        return ActionModel;
    }
}
