const {readdir, readFile} = require('fs/promises');

export class ApplicationArgumentsRepository {
    /**
     * @type {boolean}
     */
    #loaded = false;

    /**
     * @type {{}[]}
     */
    #apps = [];

    /**
     * @type {{}}
     */
    #appsNames = {};

    /**
     * @returns {Promise<string[]>}
     */
    async getAppNames$() {
        const res = [];

        await this.load$();

        const size = this.#apps.length;
        for (let i = 0; i < size; i++) {
            res[i] = this.#apps[i].name;
        }

        return res;
    }

    /**
     * @param {string} name
     * @returns {Promise<{}|boolean>}
     */
    async getAppByName$(name) {
        await this.load$();

        return name in this.#appsNames ? this.#appsNames[name] : false;
    }

    /**
     * @returns {Promise<void>}
     * @protected
     */
    async load$() {
        if (!this.#loaded) {
            this.#loaded = true;

            const apps = this.#apps;
            const appsNames = this.#appsNames;
            const basePath = `${global.__dirname}/applications/`;
            const dirs = await readdir(basePath);
            for (const dir of dirs) {
                // @TODO check for the dir type. Must be a directory
                const dirPath = basePath + dir + '/';

                const files = await readdir(dirPath);
                for (const file of files) {
                    // @TODO check for the file type. Must be a .json file
                    const filePath = dirPath + file;
                    const app = await this.loadFile$(filePath);

                    apps.push(app);
                    appsNames[app.name] = apps[apps.length - 1];
                }
            }
        }
    }

    /**
     * @param {string} filePath
     * @returns {Promise<{}>}
     * @protected
     */
    async loadFile$(filePath) {
        const fileJson = await readFile(filePath, 'utf8');
        // @TODO try-catch JSON.parse
        // @TODO validate JSON + ensure name in each JSON is unique
        return JSON.parse(fileJson);
    }

    /**
     * Unload the data from the memory to save it.
     * @TODO call this after some time, from the last repo. usage
     */
    unload() {
        if (this.#loaded) {
            this.#loaded = false;

            this.#appsNames = {};
            this.#apps.length = 0;
        }
    }
}
