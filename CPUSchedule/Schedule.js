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
        this.rQ.queue = util.copyArray(rQueue.queue);
        this.rQ.length = rQueue.length;
        this.eQ = [];
    } // end constructor
    /**
     *
     */
    Schedule.prototype.roundRobin = function () {
        var tempQueue = util.copyArray(this.rQ.queue);
        var length = this.rQ.length;
        // sort by arrival
        tempQueue.sort((function (a, b) {
            return a.arrival - b.arrival;
        }));
        for (var i = 1; i <= length; i++) {
            for (var item in tempQueue) {
                var process = tempQueue[item];
                if (process.arrival <= i) {
                    if (process.burstTime > 0) {
                        this.eQ.push(new Event(process.name, i));
                        process.burstTime--;
                        break;
                    }
                }
            }
        }
        this.printEvents();
    };
    Schedule.prototype.printEvents = function () {
        for (var item in this.eQ) {
            var event = this.eQ[item];
            console.log(event.process + "\t" + event.sequence);
        }
    };
    return Schedule;
}()); // end schedule class
exports.Schedule = Schedule;
/**
 *
 */
var RoundRobin = /** @class */ (function () {
    function RoundRobin() {
        throw Error("Not implemented");
    }
    return RoundRobin;
}());
/**
 *
 */
var FCFS = /** @class */ (function () {
    function FCFS() {
        throw Error("Not implemented");
    }
    return FCFS;
}());
/**
 *
 */
var Priority = /** @class */ (function () {
    function Priority() {
        throw Error("Not implemented");
    }
    return Priority;
}());
/**
 *
 */
var MLFQ = /** @class */ (function () {
    function MLFQ() {
        throw Error("Not implemented");
    }
    return MLFQ;
}());
