"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util = require("./helperFunctions");
/**
 * A process has a name, duration (burst time), priority, and arrival time.
 */
var Process = /** @class */ (function () {
    /**
     * Constructor
     * @param num Process number (used in naming only)
     */
    function Process(num) {
        this.name = "process" + num.toString();
        this.burstTime = util.randomInRange(5, 10);
        this.priority = util.randomInRange(1, 3);
        this.arrival = util.randomInRange(0, 5);
    } // end constructor
    return Process;
}()); // End process class
exports.Process = Process;
/**
 * The ready queue has an array of processes waiting to be executed.
 */
var ReadyQueue = /** @class */ (function () {
    function ReadyQueue() {
        this.queue = [];
        this.length = 0;
        this.generateProcesses();
    } // end constructor
    /**
     * Print every item in the queue
     */
    ReadyQueue.prototype.printQueue = function () {
        for (var item in this.queue) {
            var process = this.queue[item];
            console.log(process.name + ":\tPriority: " + process.priority + "\tDuration: " + process.burstTime + "\tArrival: " + process.arrival);
        }
        console.log("Length of queue: " + this.length);
    }; // end printQueue
    /**
    * Populate a ready queue with processes
    */
    ReadyQueue.prototype.generateProcesses = function () {
        var processCount = util.randomInRange(10, 20);
        for (var i = 0; i < processCount; i++) {
            var process = new Process(i);
            this.queue.push(process);
            this.length += process.burstTime;
        }
    }; // end generate processes
    return ReadyQueue;
}()); // end readyqueue class
exports.ReadyQueue = ReadyQueue;
