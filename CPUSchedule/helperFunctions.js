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
    return Math.floor(((rand) % range)) + low + 1;
}
exports.randomInRange = randomInRange;
function copyArray(copyArr) {
    var returnArr = [];
    for (var item in copyArr) {
        returnArr.push(copyArr[item]);
    }
    return returnArr;
}
exports.copyArray = copyArray;
