import { Abstract } from "../helpers/Abstract.js";
import { AbstractDataProvider } from "../helpers/data_providers/AbstractDataProvider.js";
import { AbstractModel } from "../models/AbstractModel.js";
import { logError } from "../helpers/DevTools.js";
import { ActionModel } from "../features/actions/ActionModel.js";
import { dataMapper } from "../dataMapper.js";

const BehaviorSubject = require('rxjs/BehaviorSubject').BehaviorSubject;

/**
 * AbstractRepository.
 *
 * @class
 * @property {AbstractDataProvider} _storage
 * @property {AbstractModel[]} _models
 */
export class AbstractRepository extends Abstract {
    /**
     * Constructor.
     *
     * @param {AbstractDataProvider} storage
     */
    constructor(storage) {
        super();

        if (new.target === AbstractRepository) {
            throw new Error(
                'Cannot construct AbstractRepository instances directly.'
            );
        }

        if (typeof this._getModel !== 'function') {
            throw new Error(
                'Class must implement the method "_getModel", which must '+
                'return a model used for this repository.'
            );
        }

        this._storage = storage;
        this.models$ = new BehaviorSubject();
        this._setModels([]);
    }

    /**
     * @returns {AbstractModel[]}
     */
    get models() {
        return this._models;
    }

    /**
     * @param {AbstractModel} action
     * @returns {number}
     */
    add(action) {
        const index = this._models.push(action) - 1;
        this.models$.next(this._models);
        return index;
    }

    /**
     * Remove a model by its index in the
     *
     * @param {number} index
     */
    remove(index) {
        const models = this._models.slice(index, 1);
        this._setModels(models);
    }

    /**
     *
     * @param {number} index
     * @param {AbstractModel} model
     */
    set(index, model) {
        this._models[index] = model;
        this.models$.next(this._models);
    }

    /**
     * @param {number} index
     * @returns {AbstractModel}
     */
    get(index) {
        return this._models[index];
    }

    /**
     * Save the class state into the storage.
     */
    save() {
        this._storage.set(
            this._getStorageName(),
            JSON.stringify(this._models)
        );
    }

    /**
     * Save the class state into the storage.
     */
    load() {
        const storageName = this._getStorageName();
        const modelsJson = this._storage.get(storageName);
        if (modelsJson) {
            try {
                const modelsData = JSON.parse(modelsJson);
                const models = dataMapper(
                    modelsData,
                    {
                        '[]': ActionModel
                    }
                );
                this._setModels(models);
            } catch(ex) {
                // JSON is corrupt. Lets delete it.

                logError('Failed to parse JSON restoring repository.', ex);
                this._removeFromStorage();
            }
        }
    }

    /**
     * Empty the models set.
     */
    empty() {
        this._models = [];
    }

    /**
     * Delete the models from the storage.
     */
    _removeFromStorage() {
        const storageName = this._getStorageName();
        this._storage.remove(storageName);
    }

    /**
     * @returns {string}
     */
    _getStorageName() {
        return '_repository_'+ this.constructor.name;
    }

    _setModels(models) {
        this._models = models;
        this.models$.next(models);
    }
}
