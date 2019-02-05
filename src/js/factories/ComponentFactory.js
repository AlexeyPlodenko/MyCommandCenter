import { HomeComponent } from '../features/pages/Home/components/HomeComponent.js';
import { NotFoundComponent } from '../features/pages/NotFound/components/NotFoundComponent.js';
import { AbstractFactory } from './AbstractFactory.js';
import { log } from '../helpers/DevTools.js';

const components = {
    Home: HomeComponent,
    NotFound: NotFoundComponent
};

/**
 * ComponentFactory.
 *
 * @class
 * @property {App} _app
 */
export class ComponentFactory extends AbstractFactory {
    /**
     * Constructor.
     *
     * @param {App} app 
     */
    constructor(app) {
        super();

        this._app = app;
    }
    
    /**
     * @param {string} name
     * @returns {Component|undefined}
     */
    createComponent(name) {
        return (
                components.hasOwnProperty(name)
                    ? new components[name](this._app)
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
