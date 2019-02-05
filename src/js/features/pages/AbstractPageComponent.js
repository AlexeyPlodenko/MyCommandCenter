import { AbstractComponent } from "../../components/AbstractComponent.js";
import { Menu } from "../Menu.js";

/**
 * Component.
 *
 * @class
 * @abstract onInit
 * @property {Menu} menu
 */
export class AbstractPageComponent extends AbstractComponent {
    /**
     * Constructor.
     *
     * @param {App} app
     */
    constructor(app) {
        super(app);

        if (new.target === AbstractPageComponent) {
            throw new Error(
                'Cannot construct AbstractPageComponent instances directly.'
            );
        }

        this.menu = new Menu(app);
    }
}