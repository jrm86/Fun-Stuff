/**
 * Inclusively selects an integer number between low and high.
 * @param low Low boundry
 * @param high High boundry
 */
export function randomInRange(low:number,high:number){
    var range = high - low;
    if (range <= 0) throw Error("High must be a number larger than Low");

    var rand = Math.random()*100;

    return Math.floor(((rand)%range)) + low + 1;
}

export function copyArray<T>(copyArr:Array<T>):T[]{
    var returnArr = [];
    for(var item in copyArr){
        returnArr.push(copyArr[item]);
    }

    return returnArr;
}