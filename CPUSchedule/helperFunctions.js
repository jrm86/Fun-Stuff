"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Inclusively selects an integer number between low and high.
 * @param low Low boundry
 * @param high High boundry
 */
function randomInRange(low, high) {
    var range = high - low;
    if (range <= 0)
        throw Error("High must be a number larger than Low");
    var rand = Math.random() * 100;
    return Math.floor(((rand) % (range + 1))) + low;
}
exports.randomInRange = randomInRange;
/**
 * Returns a new, cloned array
 * @param copyArr Array to be copied
 */
function cloneArray(copyArr) {
    // var returnArr = [];
    // for(var item in copyArr){
    //     returnArr.push(copyArr[item]);
    // }
    // return returnArr;
    return JSON.parse(JSON.stringify(copyArr)); // this works! complete copy
}
exports.cloneArray = cloneArray;
