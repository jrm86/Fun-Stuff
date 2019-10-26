import * as util from "./helperFunctions";

/**
 * A process has a name, duration (burst time), priority, and arrival time.
 */
export class Process {
    name: string;
    burstTime: number;
    priority: number;
    arrival: number;
    duration?: number;

    /**
     * Constructor
     * @param num Process number (used in naming only)
     */
    constructor(num:number){
        this.name = "process" + num.toString();
        this.burstTime =  util.randomInRange(5,10);
        this.priority = util.randomInRange(1,4);
        this.arrival =  util.randomInRange(0,5);
    }// end constructor
} // End process class


/**
 * The ready queue has an array of processes waiting to be executed.
 */
export class ReadyQueue{
    queue: Array<Process>;
    length: number;

    constructor(){
        this.queue = [];
        this.length = 0;
        this.generateProcesses();
    }// end constructor

    /**
     * Print every item in the queue
     */
    printQueue(){
        for(var item in this.queue){
            var process = this.queue[item];
           console.log(process.name + ":\tPriority: "+ process.priority + "\tDuration: " + process.burstTime + "\tArrival: " + process.arrival);
        }
        console.log("Length of queue: " + this.length);
    } // end printQueue

    /**
    * Populate a ready queue with processes
    */
    generateProcesses(){
        var processCount = util.randomInRange(10,20);

        for(var i = 0; i < processCount; i++){
            var process: Process = new Process(i);
            this.queue.push(process);
            this.length += process.burstTime;
        }
    } // end generate processes
}// end readyqueue class



