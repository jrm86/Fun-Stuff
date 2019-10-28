import {ReadyQueue} from "./ReadyQueue";
import {Schedule} from "./Schedule";

// create a queue
let readyQ = new ReadyQueue();

// create a schedule from the queue
let sched = new Schedule(readyQ);

sched.FCFS();
readyQ.printQueue();
console.log("Avg: " + sched.avgProcTime());
sched.RR();
readyQ.printQueue();
console.log("Avg: " + sched.avgProcTime());
