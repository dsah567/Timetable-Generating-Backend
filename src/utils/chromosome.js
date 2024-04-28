export function chromosome (workingdays,classes,teacherID,subjectIdKey,classesInfo){

let classe=JSON.parse(JSON.stringify(classes));

   const getRandomInt=(min, max)=> {
    return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const {fullWorkingDayNo,halfWorkingDayNo,periodInFullWorkingDay,periodBeforeBreak}=workingdays
    

    const timetableArragne=(timetable,i,specificSub)=>{
        for(let j=0;j<fullWorkingDayNo;j++){
            const max= subjectIdKey[i].length
            let wkdays= parseInt(periodInFullWorkingDay)+(parseInt(periodBeforeBreak)? 1:0)
            for(let k=0;k<wkdays;k++){
                let specificPeriod = j+"-"+k
                if (specificSub? Object.hasOwn(specificSub,specificPeriod):null){
                    timetable[j].push(specificSub[specificPeriod])
                    continue
                }
               if(parseInt(periodBeforeBreak) && k==(periodBeforeBreak)){
                timetable[j].push("break")
                continue
               }
                timetable[j].push(subjectIdKey[i][getRandomInt(0,max-1)])
            }
        }
        if(halfWorkingDayNo>0){
            for(let j=0;j<halfWorkingDayNo;j++){
                let l =parseInt(fullWorkingDayNo)
                const max= subjectIdKey[i].length
                for(let k=0;k<periodBeforeBreak;k++){
                let specificPeriod = j+"-"+k
                if (specificSub? Object.hasOwn(specificSub,specificPeriod):null){
                    timetable[l+j].push(specificSub[specificPeriod])
                    continue
                }
                timetable[l+j].push(subjectIdKey[i][getRandomInt(0,max-1)])
            }
        }}
        }
        
        for(let i=0;i<classe.length;i++){
            let specificSub= classe[i].specificSub? classe[i].specificSub:null;
            timetableArragne(classe[i].timetable,i,specificSub)
        }
        return classe
}
