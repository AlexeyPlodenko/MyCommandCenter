// import { ActionModel } from "./features/actions/ActionModel.js";

/**
 *
 * @param {object} data
 * @param {object} mapSet
 * @throws {Error} Will throw an Error if argument is wrong.
 */
export function dataMapper(data, mapSet) {
    if (typeof data !== 'object') {
        throw new Error('1st argument must be an object.');
    }
    if (typeof mapSet !== 'object') {
        throw new Error('2nd argument must be an object.');
    }

    let dataPointer = data;
    for (const key in mapSet) {
        const mapTo = mapSet[key];
        const dataPath = key.split('.');

        for (const dataSegment of dataPath) {
            if (dataSegment === '[]') {
                for (let dataPointerElem in dataPointer) {
                    dataPointer[dataPointerElem] = new (mapTo)(dataPointer[dataPointerElem]);
                }
            } /*else {

            }*/
        }

        // if (typeof key === 'number') {
        //     // we expect here the data to contain an array, so lets iterate it

        //     for (const i in data) {

        //     }
        // }


        // if (key in data) {

        //     mapObjectType = typeof mapObject[key];
        //     // if (mapObjectType === '')
        // }
    }

    return data;
}

// let data = [{path:"C:\\Users\\ASUS\\WebComponents\\localconfig.xml",arguments:["1asdasdasdasdas","2asdasdasd","3cvbcvbcvbcvbcv"]}];
// data = dataMapper(
//     data,
//     {
//         '[]': ActionModel
//     }
// );
// console.log('MAPPED', data);

/*
[ActionModel]


[{path:..., arguments:...}, {path:..., arguments:...},..]



*/
