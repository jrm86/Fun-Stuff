//Globals:
let readyQ = new ReadyQueue();
let sched = new Schedule(readyQ);
let choice = "";

let printButton, testButton, testInput, testPrompt, newSetButton, rrButton, fcfsButton;

function setup(){
  noLoop();

  printButton = createButton("Print Report");
  printButton.position(30,450);
  printButton.mousePressed(printReport);
  
  testButton = createButton("Run Test");
  testButton.position(250,450);
  testButton.mousePressed(printComparison);

  testInput = createInput();
  testInput.size(testButton.width-5, 20);
  testInput.position(250,420);

  testPrompt = createElement('h4', 'Enter number of tests');
  testPrompt.position(250, 375);

  newSetButton = createButton("New Set");
  newSetButton.position(130,400);
  newSetButton.mousePressed(resetSchedule);

  rrButton = createButton("RR");
  rrButton.position(30, 400);
  rrButton.mousePressed(selectRR);

  fcfsButton = createButton("FCFS");
  fcfsButton.position(70, 400);
  fcfsButton.mousePressed(selectFCFS);
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
      fill(event.process%20, 20,20);
      rect(event.sequence*10 + 30, event.process*10+30,10,10);
    }

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

async function selectRR(){

  await changeSched("rr");
  redraw();

  return Promise.resolve();
}

async function selectFCFS(){

  await changeSched('fcfs');
  redraw();

  return Promise.resolve();
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

  data.push('This report details the performance of the ' + choice + ' algorithm.\n'
          + 'Processing time is the time between process arrival and completion.\n'
          + 'Wait time is the time between process arrival and start time.\n');

  data.push("Schedule: " + choice);
  data.push("Length: " + sched.rQ.length);
  data.push("Average processing time: " + sched.avgProcTime().toString());
  data.push("Average wait time: " + sched.avgWaitTime().toString());
  data.push("\nProcess list:")

  for(let i = 0; i < sched.rQ.numberOfProcesses; i++){
    let process = sched.rQ.queue[i];
    data.push("\n\tName: " + process.name);
    data.push("\tArrival: " + process.arrival);
    data.push("\tBurst Time: " + process.burstTime);
  }

  save(data, 'single_report_' + choice + '.txt');
}

async function printComparison(){
  let data = [];
  
  let totalProcRR = 0;
  let totalWaitRR = 0;
  
  let totalProcFCFS = 0;
  let totalWaitFCFS = 0;

  let numOfTests;

  data.push('This test creates several randomly generated queues, and compares\n' 
          + 'the average performance between available scheduling algorithms.\n\n' 
          + 'Processing time is the time between process arrival and completion.\n'
          + 'Wait time is the time between process arrival and start time.\n');

  if(!testInput.value()){
    numOfTests = 100;
    data.push('No input provided. Testing default 100 queues.\n')
  } else {
    numOfTests = testInput.value();
    data.push('Total process queues tested: ' + numOfTests + '\n');
  }

  console.log('Running ', numOfTests, ' tests...')

  for(let i = 0; i < numOfTests; i++){
    await resetSchedule();
    await selectRR();

    totalProcRR += sched.avgProcTime();
    totalWaitRR += sched.avgWaitTime();

    await selectFCFS();

    totalProcFCFS += sched.avgProcTime();
    totalWaitFCFS += sched.avgWaitTime();
  }
  data.push('RR results: \n');
  data.push('\tAverage Processing time: ' + (totalProcRR/numOfTests));
  data.push('\tAverage Wait time: ' + (totalWaitRR/numOfTests));

  data.push('\nFCFS results: \n');
  data.push('\tAverage Processing time: ' + (totalProcFCFS/numOfTests));
  data.push('\tAverage Wait time: ' + (totalWaitFCFS/numOfTests));
  save(data, 'comparison_report.txt');

}