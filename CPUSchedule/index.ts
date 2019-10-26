import * as util from "./helperFunctions";

/**
 * A process has a name, duration (burst time), priority, and arrival time.
 */
interface IProcess{
    name: string;
    burstTime: number;
    priority: number;
    arrival: number;
    duration?: number;
}

/**
 * The ready queue has an array of processes waiting to be executed.
 */
interface IReadyQueue{
    queue: Array<IProcess>;
    printQueue(): void
}

/**
 * An event is a snapshot of a particular 'tick' in time, and comprises of a
 * process name and a squence number.
 */
interface IEvent {
    process: IProcess['name'];
    sequence: number;
}

/**
 * The schedule is the collection of events, in order of sequence number.
 */
interface ISchedule {
    queue: Array<IEvent>;
}

/**
 * Populate a ready queue with processes
 * @param queue An existing ReadyQueue to be populated.
 */
function generateProcesses(queue:IReadyQueue){
    var processCount = Math.floor((Math.random()%10 * 10)) + 11;

    for(var i = 0; i < processCount; i++){
        var process: IProcess = newProcess(i);
        queue.queue.push(process);
    }

    //Sort by arrival time
    // queue.queue.sort(((a:IProcess,b:IProcess)=>{
    //     return a.arrival-b.arrival;
    // }))
}

/**
 * Returns a new process
 * @param num Process number (for naming purposes only)
 */
function newProcess(num:number){
    var name = "process" + num.toString();
    var burstTime =  util.randomInRange(5,10);
    var priority = util.randomInRange(1,4);
    var arrival =  util.randomInRange(0,5);
    return {name,burstTime,priority,arrival};
}

function makeSchedule(queue:IReadyQueue, algorithm:any): ISchedule {
    //
    return {queue: []}
}

// create a queue with print function
// var readyQ:IReadyQueue = {
//     queue: [],
//     printQueue: function(){
//         for(var item in readyQ.queue){
//             var process = readyQ.queue[item];
//            console.log(process.name + ":\tPriority: "+ process.priority + "\tDuration: " + process.burstTime + "\tArrival: " + process.arrival);
//         }
//     }
// };


