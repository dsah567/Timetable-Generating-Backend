import {chromosome} from "./chromosome.js";
import { Individual } from "./Individual.js";

 const timetableGenerator=async (workingdays,classes,teacherID)=>{

    let populationSize=150
        let population = []; 
        let generation=0
        let found = false;
        let resClasses
        const {fullWorkingDayNo,halfWorkingDayNo,periodInFullWorkingDay,periodBeforeBreak}=workingdays
    
        const totalPeriods=parseInt(fullWorkingDayNo) *parseInt(periodInFullWorkingDay) + parseInt(halfWorkingDayNo)*parseInt(periodBeforeBreak)
        let subjectIdKey =[]
        let classesInfo={}
    
        classes.forEach(element=>{
            for(const obj in element.subjectID){
                classesInfo={...classesInfo,[obj]:element.subjectID[obj]}
            }
        })
        classes.forEach(element =>{
            let periodOfClasses=(Object.values(element.subjectID))
            .reduce((accumulator,currentValue)=>parseInt(accumulator)+parseInt(currentValue))
            if(periodOfClasses>totalPeriods) {
                throw console.error("invalid input");
            }
            else if(periodOfClasses<totalPeriods){
                subjectIdKey.push([...Object.keys(element.subjectID) , "NA"])
            }
            else{
                subjectIdKey.push(Object.keys(element.subjectID))
            }
      
        } );

        for (const property in teacherID){
            let teachingPeriods =teacherID[property].reduce((acc,curr)=>acc+parseInt(classesInfo[curr]),0)
            if(teachingPeriods>totalPeriods){
                throw console.error("Invalid inputs");
            }
        }
    
        let teachID={}
        for (let teacher in teacherID){
            teacherID[teacher].forEach(ele=>teachID={...teachID,[ele]:teacher})
        }
        let Compare=(ind1, ind2)=> {
    		return ind1.Fitness - ind2.Fitness;
    	}
        

        for (let i = 0; i < populationSize; i++) { 
            let classe =chromosome(workingdays,classes,teacherID,subjectIdKey,classesInfo)
            const popu= new Individual(workingdays,classe,teachID,subjectIdKey,classesInfo)
            population.push(popu); 
        } 
    
        function RandomNum(start, end) {
            return Math.floor(Math.random() * (end - start + 1)) + start;
        }
    
        while(!found){
            population.sort((a, b) => Compare(a, b));
           if(population[0].Fitness==0 || generation==2000){
    			found = true;
    			break;
    		}
            
    		let newGeneration = [];
    
    		let s = Math.floor((10 * populationSize) / 100);
    		for (let i = 0; i < s; i++)
    			newGeneration.push(population[i]);
    
    		s = Math.floor((90 * populationSize) / 100);
    		for (let i = 0; i < s; i++) {
    			let r = RandomNum(0, 50);
    			let parent1 = population[r];
    			r = RandomNum(0, 50);
    			let parent2 = population[r];
    			let offspring = parent1.Mate(parent2);
    			newGeneration.push(offspring);
    		}
            population = newGeneration;
            console.log("Generation: " + generation + "\t" +
    					"Fitness: " + population[0].Fitness);
    
    		generation++;
    
        }
        console.log("Generation: " + generation + "\t" +
        "Fitness: " + population[0].Fitness);
        resClasses = population[0].classes
        for(let i=0;i<population[0].classes.length;i++){
            console.log(population[0].classes[i].timetable);
        }
    return {resClasses,teachID,subjectIdKey}
}

export default timetableGenerator