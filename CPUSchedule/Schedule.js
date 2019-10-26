"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    function Schedule(events) {
        this.queue = events;
    } // end constructor
    return Schedule;
}()); // end schedule class
