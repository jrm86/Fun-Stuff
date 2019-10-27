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
        this.rQ.queue = util.cloneArray(rQueue.queue);
        this.rQ.length = rQueue.length;
        this.eQ = [];
    } // end constructor
    /**
     *
     */
    Schedule.prototype.FCFS = function () {
        var tempQueue = util.cloneArray(this.rQ.queue);
        var length = this.rQ.length;
        // sort by arrival
        tempQueue.sort((function (a, b) {
            return a.arrival - b.arrival;
        }));
        for (var i = 1; i <= length; i++) {
            for (var item in tempQueue) {
                var process = tempQueue[item];
                if (process.arrival <= i) {
                    if (!process.started) {
                        process.start = i;
                        process.started = true;
                    }
                    if (process.burstTime > 0) {
                        this.eQ.push(new Event(process.name, i));
                        process.burstTime--;
                        break;
                    }
                    else if (!process.completed) {
                        process.duration = i - process.start;
                        process.completed = true;
                    }
                }
            }
        }
        this.printEvents();
    };
    /**
     *
     */
    Schedule.prototype.printEvents = function () {
        for (var item in this.eQ) {
            var event = this.eQ[item];
            console.log(event.process + "\t" + event.sequence);
        }
    };
    return Schedule;
}()); // end schedule class
exports.Schedule = Schedule;
