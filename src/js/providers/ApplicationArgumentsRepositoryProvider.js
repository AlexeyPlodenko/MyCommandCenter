import { ApplicationArgumentsRepository } from '../repositories/ApplicationArgumentsRepository.js';

/**
 * @type {ApplicationArgumentsRepository}
 */
let instance;

/**
 * @returns {ApplicationArgumentsRepository}
 */
export function makeApplicationArgumentsRepository() {
    if (!instance) {
        instance = new ApplicationArgumentsRepository();
    }

    return instance;
}
