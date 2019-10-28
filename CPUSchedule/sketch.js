//Globals:
import {ReadyQueue} from "./scripts/ReadyQueue";
import {Schedule} from "./scripts/Schedule";
var ReadyQueue = require("./scripts/ReadyQueue");
var Schedule = require("./scripts/Schedule");

let readyQ = new ReadyQueue();
let sched = new Schedule();

function setup() {
  // put setup code here
  // sched.FCFS();
  background(100);
}

function draw() {
  // put drawing code here
  ellipse(60,60,60,60);
  ellipse(50,50,50,50);
  rect(10, 20, 30, 40);
  // var stuff = sched.eQ;

  // for(var thing in stuff){
  //   square = stuff[thing];


    
  // }

}