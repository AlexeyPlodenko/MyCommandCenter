import { PackageJson } from '../helpers/PackageJson.js';

/**
 * @type {PackageJson}
 */
let instance;

/**
 * @returns {PackageJson}
 */
export function makePackageJson() {
    if (!instance) {
        instance = new PackageJson();
    }

    return instance;
}
