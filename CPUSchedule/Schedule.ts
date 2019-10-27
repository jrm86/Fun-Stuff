import {Process} from "./ReadyQueue";
import {ReadyQueue} from "./ReadyQueue";
import * as util from "./helperFunctions";

/**
 * An event is a snapshot of a particular 'tick' in time, and comprises of a
 * process name and a squence number.
 */
class Event {
    process: Process['name'];
    sequence: number;
    duration?: number;

    constructor(processName: Process['name'], seq: number){
        this.process = processName;
        this.sequence = seq;
    } // end constructor
} // end event class

/**
 * The schedule is the collection of events, in order of sequence number.
 */
export class Schedule {
    rQ: ReadyQueue;
    eQ: Array<Event>;

    constructor(rQueue:ReadyQueue){
        this.rQ = new ReadyQueue();
        this.rQ.queue = util.cloneArray(rQueue.queue);
        this.rQ.length = rQueue.length;
        this.eQ = [];
    }// end constructor

    /**
     * 
     */
    FCFS(){
        var tempQueue = util.cloneArray(this.rQ.queue);
        var length = this.rQ.length;

        // sort by arrival
        tempQueue.sort(((a:Process,b:Process)=>{
            return a.arrival - b.arrival;
        }));

        for(var i = 1; i <= length; i++){
            for(var item in tempQueue){
                var process = tempQueue[item];
                if(process.arrival <= i){
                    if(!process.started){
                        process.start = i;
                        process.started = true;
                    }
                    if(process.burstTime > 0){
                        this.eQ.push(new Event(process.name, i));
                        process.burstTime--;
                        break;
                    } else if (!process.completed){
                        process.duration = i - process.start;
                        process.completed = true;
                    }
                }
            }
        }

        this.printEvents()
    }

    /**
     * 
     */
    printEvents(){
        for(var item in this.eQ){
            var event = this.eQ[item];
            console.log(event.process + "\t" + event.sequence);
        }
    }


} // end schedule class

/**
 * 
 */
class RoundRobin {
    constructor(){
        throw Error("Not implemented");
    }
}

/**
 * 
 */
class Priority {
    constructor(){
        throw Error("Not implemented");
    }
}

/**
 * 
 */
class MLFQ {
    constructor(){
        throw Error("Not implemented");
    }
}