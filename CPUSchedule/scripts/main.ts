import {ReadyQueue} from "./scripts/ReadyQueue";
import {Schedule} from "./scripts/Schedule";

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
