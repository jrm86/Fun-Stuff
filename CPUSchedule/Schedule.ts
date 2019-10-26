import {Process} from "./ReadyQueue";

/**
 * An event is a snapshot of a particular 'tick' in time, and comprises of a
 * process name and a squence number.
 */
class Event {
    process: Process['name'];
    sequence: number;

    constructor(processName: Process['name'], seq: number){
        this.process = processName;
        this.sequence = seq;
    } // end constructor
} // end event class

/**
 * The schedule is the collection of events, in order of sequence number.
 */
class Schedule {
    queue: Array<Event>;

    constructor(events:Array<Event>){
        this.queue = events;
    }// end constructor
} // end schedule class
