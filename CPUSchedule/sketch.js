//Globals:
let readyQ = new ReadyQueue();
let sched = new Schedule(readyQ);
let choice = "";

function setup(){
  noLoop();

  button = createButton("Print Report");
  button.position(30,450);
  button.mousePressed(printReport);

  button = createButton("New Set");
  button.position(120,450);
  button.mousePressed(resetSchedule);

  rrButton = createButton("RR");
  rrButton.position(30, 420);
  rrButton.mousePressed(selectRR);

  rrButton = createButton("FCFS");
  rrButton.position(70, 420);
  rrButton.mousePressed(selectFCFS);
}

function reset(){
  createCanvas(sched.rQ.length*10+60, 500);
  colorMode(RGB);
  background(100);
  colorMode(HSB, 20);
}

function draw() {
  // put drawing code here
  clear();
  reset();
  let procs = sched.rQ.numberOfProcesses;
  let len = sched.rQ.length;
  updateChoice().then(()=>{
    var schedule = sched.eQ;

    for(var item in schedule){
      event = schedule[item];
      fill(event.process, 20,20);
      rect(event.sequence*10 + 30, event.process*10+30,10,10);
    }
    console.log("drawing " + procs + " lines");
    fill(0);
    for(let i = 0; i <= procs; i++){
      line(20, i*10+30, len*10+40, i*10+30);
    }
  })
}

function changeSched(newChoice){
  return new Promise((resolve, reject)=>{
    choice = newChoice;
    resolve();
  })
}

function updateChoice(){
  return new Promise((resolve,reject)=>{
    switch(choice){
      case "": break;
      case "rr": 
        sched.RR();
        break;
      case "fcfs":
        sched.FCFS();
        break;
    }
    resolve();
  })
}

function selectRR(){
  changeSched("rr").then(()=>{
    redraw();
  })
}

function selectFCFS(){
  changeSched("fcfs").then(()=>{
    redraw();
  })
}

function resetSchedule(){
  return new Promise((resolve,reject)=>{
     readyQ = new ReadyQueue();
    sched = new Schedule(readyQ);
    reset();
    redraw();
    resolve();
  })
}

function printReport(){
  let data = [];
  data.push("Schedule: " + choice);
  data.push("Length: " + sched.rQ.length);
  data.push("Average time: " + sched.avgProcTime().toString());
  data.push("Average wait: " + sched.avgWaitTime().toString());
  save(data, 'report.txt');
}