"use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
// var ReadyQueue_1 = require("./ReadyQueue");
// var util = require("./helperFunctions");
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
        this.rQ = new ReadyQueue();
        this.rQ.queue = cloneArray(rQueue.queue);
        this.rQ.queue = rQueue.queue;
        this.rQ.length = rQueue.length;
        this.eQ = [];
    } // end constructor
    /**
     * Creates a First-Come-First-Serve schedule
     */
    Schedule.prototype.FCFS = function () {
        this.resetStart().then(()=>{
            var tempQueue = cloneArray(this.rQ.queue);
            var length = this.rQ.length;
            this.eQ = [];
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
                    // console.log("this item: " + this.rQ.queue[item].name);
                    // console.log("start status: " + this.rQ.queue[item].started);
                    if(!this.rQ.queue[item].started){
                        this.rQ.queue[item].started = true;
                        this.rQ.queue[item].start = item;
                    }
                    process.burstTime--;
                    counter++;
                }
                // update the main queue with duration
                this.rQ.queue[item].duration = counter - this.rQ.queue[item].arrival;
            }
        })
    }; // end fcfs
    /**
     * Creates a Round-Robin schedule
     */
    Schedule.prototype.RR = function () {
        this.resetStart().then(()=>{
            // get our queue copy
            var tempQueue = cloneArray(this.rQ.queue);
            this.eQ = [];
            // sort by arrival
            tempQueue.sort((function (a, b) {
                return a.arrival - b.arrival || a.priority - b.priority;
            }));
            // sort source queue also to keep the same "indexing" in the for loop
            this.rQ.queue.sort((function (a, b) {
                return a.arrival - b.arrival || a.priority - b.priority;
            }));
            var count = 0;
            // don't stop until the ready queue is empty
            while (tempQueue[0]) {
                for (var item in tempQueue) {
                    var process = tempQueue[item];
                    // add event to event queue
                    if (process.arrival <= count) {
                        this.eQ.push(new Event(process.name, count));
                        if(!this.rQ.queue[item].started){
                            this.rQ.queue[item].started = true;
                            this.rQ.queue[item].start = item;
                        }
                        process.burstTime--;
                    }
                    // if process is complete, remove it form the ready queue
                    if (process.burstTime <= 0) {
                        var arrIndex = this.getIndex(process, this.rQ);
                        this.rQ.queue[arrIndex].duration = count - process.arrival;
                        tempQueue.splice(parseInt(item), 1);
                    }
                    count++;
                }
            }
        })
       
        // this.printEvents();
    }; // end rr
    Schedule.prototype.getIndex = function (process, queue) {
        for (var item in queue.queue) {
            var proc = queue.queue[item];
            if (proc.name == process.name) {
                return parseInt(item);
            }
        }
        return -1;
    };
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

    /**
     * Calculates and returns the average time to complete processes. Not stored;
     * must be called when needed.
     */
    Schedule.prototype.avgWaitTime = function () {
        var sum = 0;
        for (var item in this.rQ.queue) {
            var process = this.rQ.queue[item];
            // console.log("name: ", process.name);
            // console.log("start: ", process.start);
            // console.log("arr: ", process.arrival);
            sum += process.start - process.arrival;
        }
        var avg = sum / this.rQ.queue.length;
        return avg;
    }; // end avgProcTime

    /**
     * Calculates and returns the average time to complete processes. Not stored;
     * must be called when needed.
     */
    Schedule.prototype.resetStart = function () {
        return new Promise((resolve, reject)=>{
            for (let item in this.rQ.queue){
                this.rQ.queue[item].started = false;
                this.rQ.queue[item].start = 0;
            }
            resolve();
        })

    
    }; // end avgProcTime

    return Schedule;
}()); // end schedule class
// exports.Schedule = Schedule;
