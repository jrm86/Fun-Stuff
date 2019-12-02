"use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
// var util = require("./helperFunctions");
/**
 * A process has a name, duration (burst time), priority, and arrival time.
 */
var Process = /** @class */ (function () {
    /**
     * Constructor
     * @param num Process number (used in naming only)
     */
    function Process(num) {
        this.name = num;
        this.burstTime = randomInRange(5, 10);
        this.priority = randomInRange(1, 3);
        this.arrival = randomInRange(0, 5);
        this.start = 0;
        this.started = false;
        this.completed = false;
        this.duration = 0;
    } // end constructor
    return Process;
}()); // End process class
// exports.Process = Process;
/**
 * The ready queue has an array of processes waiting to be executed.
 */
var ReadyQueue = /** @class */ (function () {
    function ReadyQueue() {
        this.queue = [];
        this.length = 0;
        this.numberOfProcesses;
        this.generateProcesses();
    } // end constructor
    /**
     * Print every item in the queue
     */
    ReadyQueue.prototype.printQueue = function () {
        for (var item in this.queue) {
            var process = this.queue[item];
            console.log("process" +
                process.name + ":\tPriority: " +
                process.priority + "\tBurstTime: " +
                process.burstTime + "\tArrival: " +
                process.arrival + "\tDuration: " +
                process.duration);
        }
        console.log("Length of queue: " + this.length);
    }; // end printQueue
    /**
    * Populate a ready queue with processes
    */
    ReadyQueue.prototype.generateProcesses = function () {
        var processCount = randomInRange(10, 20);
        this.numberOfProcesses = processCount;
        for (var i = 0; i < processCount; i++) {
            var process = new Process(i);
            this.queue.push(process);
            this.length += process.burstTime;
        }
    }; // end generate processes
    return ReadyQueue;
}()); // end readyqueue class
// exports.ReadyQueue = ReadyQueue;
