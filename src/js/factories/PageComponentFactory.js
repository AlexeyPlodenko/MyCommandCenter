import { AbstractFactory } from './AbstractFactory.js';
import { HomePageComponent } from '../features/pages/Home/components/HomePageComponent.js';
import { NotFoundPageComponent } from '../features/pages/NotFound/components/NotFoundPageComponent.js';

const components = {
    Home: HomePageComponent,
    NotFound: NotFoundPageComponent
};

/**
 * PageComponentFactory.
 *
 * @class
 * @property {App} _app
 */
export class PageComponentFactory extends AbstractFactory {
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
     * @returns {AbstractPageComponent|undefined}
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
//        const compPath = Path.join(baseDir, '/src/js/features/pages/components/'+ name +'PageComponent.js');
//
//        return require(compPath);
    }
}
