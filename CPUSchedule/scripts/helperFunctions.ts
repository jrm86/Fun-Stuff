/**
 * Inclusively selects an integer number between low and high.
 * @param low Low boundry
 * @param high High boundry
 */
export function randomInRange(low:number,high:number){
    var range = high - low;
    if (range <= 0) throw Error("High must be a number larger than Low");

    var rand = Math.random()*100;

    return Math.floor(((rand)%(range+1))) + low;
}

/**
 * Returns a new, cloned array
 * @param copyArr Array to be copied
 */
export function cloneArray<T>(copyArr:Array<T>):T[]{
    // var returnArr = [];
    // for(var item in copyArr){
    //     returnArr.push(copyArr[item]);
    // }

    // return returnArr;
    return JSON.parse(JSON.stringify(copyArr)); // this works! complete copy
}