// import {chromosome} from "./chromosome.js";
// import { Individual } from "./Individual.js";

// let workingdays={
//                     fullWorkingDayNo: '5',
//                     halfWorkingDayNo: '1',
//                     periodInFullWorkingDay: '4',
//                     periodBeforeBreak: '4'
//                 }

// let classes =   [
//                     {subjectID: { cs11: '7', cs12: '7', cs13: '5', cs14: '5' },       
//                     timetable: [ [], [], [], [], [], [] ],
//                     repeat: { cs11: '2' }},
//                     {subjectID: { cs21: '7', cs22: '7', cs23: '5', cs24: '5' },       
//                     repeat: { cs21: '3' },
//                     timetable: [ [], [], [], [], [], [] ]},
//                     {subjectID: { cs31: '7', cs32: '7', cs33: '5', cs34: '5' },       
//                     repeat: { cs31: '3' },
//                     timetable: [ [], [], [], [], [], [] ]}
//                 ]

// // let teacherID= {
// //                 cs11: 't1',cs12: 't3',cs13: 't2',cs14: 't2',
// //                 cs21: 't1',cs22: 't2',cs23: 't3',cs24: 't3',
// //                 cs31: 't2',cs32: 't3',cs33: 't1',cs34: 't1'
// //             }
// let teacherID = {
//     t1: ["cs11", "cs21", "cs33", "cs34"],
//     t2: ["cs22", "cs31", "cs13", "cs14"],
//     t3: ["cs12", "cs32", "cs23", "cs24"],
//   };
// const timetableAlgo=async (workingdays,classes,teacherID)=>{

//     let populationSize=300
//     let population = []; 
//     let generation=0
//     let found = false;

//     const {fullWorkingDayNo,halfWorkingDayNo,periodInFullWorkingDay,periodBeforeBreak}=workingdays

//     const totalPeriods=parseInt(fullWorkingDayNo) *parseInt(periodInFullWorkingDay) + parseInt(halfWorkingDayNo)*parseInt(periodBeforeBreak)
//     // console.log(totalPeriods);
//     // console.log(classes)
//     let subjectIdKey =[]
//     let classesInfo={}

//     classes.forEach(element=>{
//         for(const obj in element.subjectID){
//             classesInfo={...classesInfo,[obj]:element.subjectID[obj]}
//         }
//     })
//     //console.log(classesInfo);

//     classes.forEach(element =>{
//         let periodOfClasses=(Object.values(element.subjectID))
//         .reduce((accumulator,currentValue)=>parseInt(accumulator)+parseInt(currentValue))
//         if(periodOfClasses>totalPeriods) {
//             throw console.error("invalid input");
//         }
//         else if(periodOfClasses<totalPeriods){
//             subjectIdKey.push([...Object.keys(element.subjectID) , "NA"])
//         }
//         else{
//             subjectIdKey.push(Object.keys(element.subjectID))
//         }
//         //console.log(periodOfClasses);
//         //console.log(subjectIdKey);
//     } );

//     for (const property in teacherID){
//         let teachingPeriods =teacherID[property].reduce((acc,curr)=>acc+parseInt(classesInfo[curr]),0)
//         if(teachingPeriods>totalPeriods){
//             throw console.error("Invalid inputs");
//         }
//     }

//     //classes =chromosome(workingdays,classes,teacherID,subjectIdKey,classesInfo)
//     // console.log(workingdays)
//      //console.log(classes.forEach(ele=>console.log(ele.timetable)))
//     // console.log(teacherID)

//     //console.log(subjectIdKey,classesInfo)
//     let teachID={}
//     for (let teacher in teacherID){
//         teacherID[teacher].forEach(ele=>teachID={...teachID,[ele]:teacher})
//     }
//     let Compare=(ind1, ind2)=> {
// 		return ind1.Fitness - ind2.Fitness;
// 	}
//     // console.log(teachID);
//     let data =new chromosome(workingdays,classes,teacherID,subjectIdKey,classesInfo)
//     for (let i = 0; i < populationSize; i++) { 
//         //console.log("-----------------");
//         //console.trace("trace",classes[1].timetable);
//         // console.log(data.subjectIdKey);
//         // console.log(data.teacherID);
//         // console.log(data.classesInfo);
//         // console.log(data.workingdays);
//         // console.log(data.classes[1].timetable);
//         const popu= new Individual(data.workingdays,data.classe,teachID,data.subjectIdKey,data.classesInfo)
//         population.push(popu); 
//     } 

//     function RandomNum(start, end) {
//         return Math.floor(Math.random() * (end - start + 1)) + start;
//     }

//     while(!found){
//         population.sort((a, b) => Compare(a, b));
//        // if (population[0].Fitness==0 ) {
//        if(population[0].Fitness==0 || generation==2000){
// 			found = true;
// 			break;
// 		}
        
// 		// Otherwise generate new offsprings for new generation
// 		let newGeneration = [];

// 		// Perform Elitism, that means 10% of fittest population
// 		// goes to the next generation
// 		let s = Math.floor((10 * populationSize) / 100);
// 		for (let i = 0; i < s; i++)
// 			newGeneration.push(population[i]);

// 		// From 50% of fittest population, Individuals
// 		// will mate to produce offspring
// 		s = Math.floor((90 * populationSize) / 100);
// 		for (let i = 0; i < s; i++) {
// 			let r = RandomNum(0, 50);
// 			let parent1 = population[r];
// 			r = RandomNum(0, 50);
// 			let parent2 = population[r];
// 			let offspring = parent1.Mate(parent2);
// 			newGeneration.push(offspring);
// 		}
//         population = newGeneration;
//         console.log("Generation: " + generation + "\t" +
// 					"Fitness: " + population[0].Fitness);

// 		generation++;

//     }
//     console.log("Generation: " + generation + "\t" +
//     "Fitness: " + population[0].Fitness);
//     for(let i=0;i<population[0].classes.length;i++){
//         console.log(population[0].classes[i].timetable);
//     }
// }

// timetableAlgo(workingdays,classes,teacherID)











 const timetableGenerator=async (workingdays,classes,teacherID)=>{

    let a = [1,2,3]
    console.log(workingdays)
    console.log(classes)
    console.log(teacherID)

    console.log(typeof workingdays)
    console.log(typeof classes)
    console.log(typeof teacherID)
    console.log(typeof a);

    const teachID =teacherID
    return {teachID}
}

export default timetableGenerator