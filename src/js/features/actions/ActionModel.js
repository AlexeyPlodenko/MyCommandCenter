import { AbstractModel } from "../../models/AbstractModel.js";

/**
 * @class
 *
 * @property {string} path
 * @property {string[]} arguments
 */
export class ActionModel extends AbstractModel {
    /**
     * Constructor.
     */
    constructor() {
        super();

        this.path = '';
        this.arguments = [];
    }

    static isDataValid(data) {
        return false;
    }
}
