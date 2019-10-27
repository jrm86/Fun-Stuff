"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReadyQueue_1 = require("./ReadyQueue");
var util = require("./helperFunctions");
/**
 * An event is a snapshot of a particular 'tick' in time, and comprises of a
 * process name and a squence number.
 */
var Event = /** @class */ (function () {
    function Event(processName, seq) {
        this.process = processName;
        this.sequence = seq;
    } // end constructor
    return Event;
}()); // end event class
/**
 * The schedule is the collection of events, in order of sequence number.
 */
var Schedule = /** @class */ (function () {
    function Schedule(rQueue) {
        this.rQ = new ReadyQueue_1.ReadyQueue();
        // this.rQ.queue = util.cloneArray(rQueue.queue);
        this.rQ.queue = rQueue.queue;
        this.rQ.length = rQueue.length;
        this.eQ = [];
    } // end constructor
    /**
     * Creates a First-Come-First-Serve schedule
     */
    Schedule.prototype.FCFS = function () {
        var tempQueue = util.cloneArray(this.rQ.queue);
        var length = this.rQ.length;
        // sort by arrival
        tempQueue.sort((function (a, b) {
            return a.arrival - b.arrival || a.name - b.name;
        }));
        // sort source queue also to keep the same "indexing" in the for loop
        this.rQ.queue.sort((function (a, b) {
            return a.arrival - b.arrival || a.name - b.name;
        }));
        var counter = 0;
        for (var item in tempQueue) {
            var process = tempQueue[item];
            while (process.arrival <= counter && process.burstTime > 0) {
                this.eQ.push(new Event(process.name, counter));
                process.burstTime--;
                counter++;
            }
            // update the main queue with duration
            this.rQ.queue[item].duration = counter - this.rQ.queue[item].arrival;
        }
        // this.printEvents()
        // console.log(this.avgProcTime());
    }; // end fcfs
    /**
     * Creates a Round-Robin schedule
     */
    Schedule.prototype.RR = function () {
        var tempQueue = util.cloneArray(this.rQ.queue);
        // sort by arrival
        tempQueue.sort((function (a, b) {
            return a.arrival - b.arrival || a.priority - b.priority;
        }));
        // sort source queue also to keep the same "indexing" in the for loop
        this.rQ.queue.sort((function (a, b) {
            return a.arrival - b.arrival || a.priority - b.priority;
        }));
        var emptyCount = 0;
        for (var tick = 0; tick < tempQueue.length;) {
            while (emptyCount <= tempQueue.length) {
                for (var item in tempQueue) {
                    var process = tempQueue[item];
                    if (!process.completed && process.arrival <= tick) {
                        this.eQ.push(new Event(process.name, tick));
                        tick++;
                        process.burstTime--;
                    }
                    else if (process.burstTime == 0) {
                        process.completed = true;
                        emptyCount++;
                    }
                }
            }
        }
        this.printEvents();
    }; // end rr
    /**
     * Prints the event queue
     */
    Schedule.prototype.printEvents = function () {
        for (var item in this.eQ) {
            var event = this.eQ[item];
            console.log("process" + event.process + "\t" + event.sequence);
        }
    }; // end printEvents
    /**
     * Calculates and returns the average time to complete processes. Not stored;
     * must be called when needed.
     */
    Schedule.prototype.avgProcTime = function () {
        var sum = 0;
        for (var item in this.rQ.queue) {
            var process = this.rQ.queue[item];
            sum += process.duration;
        }
        var avg = sum / this.rQ.queue.length;
        return avg;
    }; // end avgProcTime
    return Schedule;
}()); // end schedule class
exports.Schedule = Schedule;
