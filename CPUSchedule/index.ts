import {ReadyQueue} from "./ReadyQueue";
import {Schedule} from "./Schedule";
// import * as util from "./helperFunctions";

// create a queue
let readyQ = new ReadyQueue();

readyQ.printQueue();

let sched = new Schedule(readyQ);

sched.FCFS();

readyQ.printQueue();