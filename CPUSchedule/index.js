"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util = require("./helperFunctions");
/**
 * Populate a ready queue with processes
 * @param queue An existing ReadyQueue to be populated.
 */
function generateProcesses(queue) {
    var processCount = Math.floor((Math.random() % 10 * 10)) + 11;
    for (var i = 0; i < processCount; i++) {
        var process = newProcess(i);
        queue.queue.push(process);
    }
    //Sort by arrival time
    // queue.queue.sort(((a:IProcess,b:IProcess)=>{
    //     return a.arrival-b.arrival;
    // }))
}
/**
 * Returns a new process
 * @param num Process number (for naming purposes only)
 */
function newProcess(num) {
    var name = "process" + num.toString();
    var burstTime = util.randomInRange(5, 10);
    var priority = util.randomInRange(1, 4);
    var arrival = util.randomInRange(0, 5);
    return { name: name, burstTime: burstTime, priority: priority, arrival: arrival };
}
// create a queue with print function
var readyQ = {
    queue: [],
    printQueue: function () {
        for (var item in readyQ.queue) {
            var process = readyQ.queue[item];
            console.log(process.name + ":\tPriority: " + process.priority + "\tDuration: " + process.burstTime + "\tArrival: " + process.arrival);
        }
    }
};
