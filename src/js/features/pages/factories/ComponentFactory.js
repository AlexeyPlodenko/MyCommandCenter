const Path = require('path');

import { HomeComponent } from '/src/js/features/pages/components/HomeComponent.js';
import { NotFoundComponent } from '/src/js/features/pages/components/NotFoundComponent.js';

const components = {
    Home: HomeComponent,
    NotFound: NotFoundComponent
};

/**
 * ComponentFactory.
 *
 * @class
 * @public
 */
export class ComponentFactory {
    /**
     * @param {String} name
     * @param {App} app
     * @returns {Component|undefined}
     */
    static createComponent(name, app) {
        return (
                name in components
                    ? new components[name](app)
                    : undefined
                );
        // @TODO. ATM dynamic class instantiation does not work, ends with an error -
        // SyntaxError: Unexpected token {
//        const baseDir = process.cwd();
//        const compPath = Path.join(baseDir, '/src/js/features/pages/components/'+ name +'Component.js');
//
//        return require(compPath);
    }
}
