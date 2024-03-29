export function chromosome (workingday,classea,teacherI,subjectIdKe,classesInf){
   // console.log(workingdays,classes,teacherID,subjectIdKey,classesInfo)

let workingdays={...workingday}
let classe=JSON.parse(JSON.stringify(classea));
let teacherID={...teacherI}
let subjectIdKey=[...subjectIdKe]
let classesInfo={...classesInf}

   //console.log("h1",classe[1].timetable);

   const getRandomInt=(min, max)=> {
    return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const {fullWorkingDayNo,halfWorkingDayNo,periodInFullWorkingDay,periodBeforeBreak}=workingdays
    

    const timetableArragne=(timetable,i)=>{
        for(let j=0;j<fullWorkingDayNo;j++){
            const max= subjectIdKey[i].length
            let wkdays= parseInt(periodInFullWorkingDay)+(parseInt(periodBeforeBreak)? 1:0)
            //console.log(wkdays);
            for(let k=0;k<wkdays;k++){
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
                timetable[l+j].push(subjectIdKey[i][getRandomInt(0,max-1)])
            }
        }}
        }
        
        for(let i=0;i<classe.length;i++){
            timetableArragne(classe[i].timetable,i)
            //console.log(classes[i].timetable);
        }
        //console.log("h2",classe[1].timetable);
        let data = {
            workingdays,classe,teacherID,subjectIdKey,classesInfo
        }
        return data
}
