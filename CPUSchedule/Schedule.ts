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
    avg?: number;

    constructor(rQueue:ReadyQueue){
        this.rQ = new ReadyQueue();
        // this.rQ.queue = util.cloneArray(rQueue.queue);
        this.rQ.queue = rQueue.queue;
        this.rQ.length = rQueue.length;
        this.eQ = [];
    }// end constructor

    /**
     * Creates a First-Come-First-Serve schedule
     */
    FCFS(){
        var tempQueue = util.cloneArray(this.rQ.queue);
        var length = this.rQ.length;

        // sort by arrival
        tempQueue.sort(((a:Process,b:Process)=>{
            return a.arrival - b.arrival || a.name - b.name;
        }));

        // sort source queue also to keep the same "indexing" in the for loop
        this.rQ.queue.sort(((a:Process,b:Process)=>{
            return a.arrival - b.arrival || a.name - b.name;
        }))

        var counter = 0;
        for(var item in tempQueue){
            var process = tempQueue[item];

            while(process.arrival <= counter && process.burstTime > 0){
                this.eQ.push(new Event(process.name,counter));
                process.burstTime--;
                counter++;
            }
            // update the main queue with duration
            this.rQ.queue[item].duration = counter - this.rQ.queue[item].arrival;
        }
        // this.printEvents()
        // console.log(this.avgProcTime());
    } // end fcfs

    /**
     * Creates a Round-Robin schedule
     */
    RR(){
        return new Error("not implemented");
    } // end rr

    /**
     * Prints the event queue
     */
    printEvents(){
        for(var item in this.eQ){
            var event = this.eQ[item];
            console.log("process" + event.process + "\t" + event.sequence);
        }
    } // end printEvents

    /**
     * Calculates and returns the average time to complete processes. Not stored;
     * must be called when needed.
     */
    avgProcTime(){
        var sum = 0;
        for(var item in this.rQ.queue){
            var process = this.rQ.queue[item];
            sum += process.duration;
        }
        var avg = sum / this.rQ.queue.length;
        return avg;
    } // end avgProcTime
} // end schedule class
