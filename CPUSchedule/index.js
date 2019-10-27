"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReadyQueue_1 = require("./ReadyQueue");
var Schedule_1 = require("./Schedule");
// import * as util from "./helperFunctions";
// create a queue
var readyQ = new ReadyQueue_1.ReadyQueue();
readyQ.printQueue();
var sched = new Schedule_1.Schedule(readyQ);
sched.FCFS();
readyQ.printQueue();
console.log("Avg: " + sched.avgProcTime());
sched.RR();
readyQ.printQueue();
console.log("Avg: " + sched.avgProcTime());
