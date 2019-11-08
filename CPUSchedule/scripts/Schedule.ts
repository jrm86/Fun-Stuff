import { Process } from "./ReadyQueue";
import { ReadyQueue } from "./ReadyQueue";
import * as util from "./helperFunctions";

/**
 * An event is a snapshot of a particular 'tick' in time, and comprises of a
 * process name and a squence number.
 */
class Event {
    process: Process['name'];
    sequence: number;

    constructor(processName: Process['name'], seq: number) {
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

    constructor(rQueue: ReadyQueue) {
        this.rQ = new ReadyQueue();
        this.rQ.queue = rQueue.queue;
        this.rQ.length = rQueue.length;
        this.eQ = [];
    }// end constructor

    /**
     * Creates a First-Come-First-Serve schedule
     */
    FCFS() {
        var tempQueue = util.cloneArray(this.rQ.queue);
        var length = this.rQ.length;
        this.eQ = [];

        // sort by arrival
        tempQueue.sort(((a: Process, b: Process) => {
            return a.arrival - b.arrival || a.name - b.name;
        }));

        // sort source queue also to keep the same "indexing" in the for loop
        this.rQ.queue.sort(((a: Process, b: Process) => {
            return a.arrival - b.arrival || a.name - b.name;
        }))

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
    } // end fcfs

    /**
     * Creates a Round-Robin schedule
     */
    RR() {
        // get our queue copy
        var tempQueue = util.cloneArray(this.rQ.queue);
        this.eQ = [];

        // sort by arrival
        tempQueue.sort(((a: Process, b: Process) => {
            return a.arrival - b.arrival || a.priority - b.priority;
        }));

        // sort source queue also to keep the same "indexing" in the for loop
        this.rQ.queue.sort(((a: Process, b: Process) => {
            return a.arrival - b.arrival || a.priority - b.priority;
        }))

        var count = 0;

        // don't stop until the ready queue is empty
        while(tempQueue[0]){

            for(var item in tempQueue){
                var process = tempQueue[item];

                // add event to event queue
                if(process.arrival <= count){
                    this.eQ.push(new Event(process.name,count));
                    process.burstTime--;
                }

                // if process is complete, remove it from the ready queue
                if(process.burstTime<=0){
                    var arrIndex = this.getIndex(process, this.rQ);
                    this.rQ.queue[arrIndex].duration = count - process.arrival;
                    tempQueue.splice(parseInt(item),1);
                } 
                count++;
            }
        }
    } // end rr

    /**
     * Creates a non-preemptive Shortest-Job-First schedule
     */
    SJF_n(){
        // get our queue copy
        var tempQueue = util.cloneArray(this.rQ.queue);
        this.eQ = [];

        // sort by burst time
        tempQueue.sort(((a: Process, b: Process) => {
            return a.arrival - b.arrival || a.burstTime - b.burstTime;
        }));

        // sort source queue also to keep the same "indexing" in the for loop
        this.rQ.queue.sort(((a: Process, b: Process) => {
            return a.arrival - b.arrival || a.burstTime - b.burstTime;
        }))

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
    } // end sjf_n

    /**
     * Creates a preemptive Shortest-Job-First schedule
     */
    SJF_p(){
        throw new Error("not implemented");
        // get our queue copy
        var tempQueue = util.cloneArray(this.rQ.queue);
        this.eQ = [];

        // sort by burst time
        tempQueue.sort(((a: Process, b: Process) => {
            return a.arrival - b.arrival || a.burstTime - b.burstTime;
        }));

        // sort source queue also to keep the same "indexing" in the for loop
        this.rQ.queue.sort(((a: Process, b: Process) => {
            return a.arrival - b.arrival || a.burstTime - b.burstTime;
        }))

        // figure out the logic here
    } // end sjf_n

    /**
     * Returns the index of a process in the given ReadyQueue. Returns
     * -1 if process is not in the ReadyQueue.
     * @param process A process
     * @param queue A ReadyQueue
     */
    getIndex(process:Process,queue:ReadyQueue):number{    
        for(var item in queue.queue){
            var proc = queue.queue[item];
            if (proc.name == process.name){
                return parseInt(item);
            }
        }
        return -1;
    }

    /**
     * Prints the event queue
     */
    printEvents() {
        for (var item in this.eQ) {
            var event = this.eQ[item];
            console.log("process" + event.process + "\t" + event.sequence);
        }
    } // end printEvents

    /**
     * Calculates and returns the average time to complete processes. Not stored;
     * must be called when needed.
     */
    avgProcTime() {
        var sum = 0;
        for (var item in this.rQ.queue) {
            var process = this.rQ.queue[item];
            sum += process.duration;
        }
        var avg = sum / this.rQ.queue.length;
        return avg;
    } // end avgProcTime
} // end schedule class
