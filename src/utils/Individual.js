export class Individual{
    constructor(workingdays,classes,teachID,subjectIdKey,classesInfo){
        this.classes=classes
        this.workingdays=workingdays
        this.teachID=teachID
        this.subjectIdKey=subjectIdKey
        this.classesInfo=classesInfo
        this.Fitness=this.calcFitness()
    }

    countOccurrences(array,targetString){
        let arr= array.flat(Infinity)
        const count = arr.reduce((acc, currentValue) => {
            return acc + (currentValue === targetString ? 1 : 0);
        }, 0);
        
        // console.log(count);
        return count;
    }

    getRandomInt=(min, max)=> {
        return Math.floor(Math.random() * (max - min + 1)) + min;
        }

    calcFitness(){
        let fittness = 0
        for(let i =0;i<this.classes.length;i++){
            //console.log("calc");
            for(let j=0;j<this.subjectIdKey[i].length;j++){
                //console.log("calcfor");
                let subCode=this.subjectIdKey[i][j]
                if(subCode!="NA"  ){
                    let c = this.countOccurrences(this.classes[i].timetable,subCode);
                    if (c != this.classesInfo[subCode]) {
                        fittness++;
                    }
                } 
            }
        }

        // for(let i =0;i<this.classes.length;i++){
        //     if(this.classes[i].repeat != {}){
        //         let a = this.classes[i].repeat
        //         for (const i in a){
        //             fittness++
        //         }
        //     }
        // }
        
        for(let i=0;i<this.classes.length-1;i++){
            for(let j=0;j<this.classes[i].timetable.length;j++){
                //console.log("ftt-1");
                for (let k = 0; k < this.classes[i].timetable[j].length; k++){
                    for (let x = 0; x < this.classes.length - i; x++){
                        //console.log("ftt1");
                        if((this.classes[i].timetable[j][k]) =="break"||(this.classes[i].timetable[j][k]) =="NA"){
                            continue
                        }
                        if (
                            this.teachID[this.classes[i].timetable[j][k]] ==
                             this.teachID[this.classes[i + 1 ].timetable[j][k]]
                          ) {
                            fittness++;
                            //console.log("ftt2",fittness);
                          }
                    }
                }
            }
        }
       // console.log(fittness);
        return fittness
    }

    Mate(p2){
        let childClasses = JSON.parse(JSON.stringify(this.classes));
        let workingdays =this.workingdays
        let teachID =this.teachID
        let subjectIdKey =this.subjectIdKey
        let classesInfo =this.classesInfo

        const {fullWorkingDayNo,halfWorkingDayNo,periodInFullWorkingDay,periodBeforeBreak}=workingdays
        let wkdays= parseInt(periodInFullWorkingDay)+(parseInt(periodBeforeBreak)? 1:0)
        for (let i = 0; i < this.classes.length; i++) {
            //console.log(this.classes[1].timetable);
            const max= this.subjectIdKey[i].length
            for (let k = 0; k < this.classes[i].timetable.length; k++) {
                childClasses[i].timetable[k]=[]
                //console.log(childClasses[i].timetable);
            for (let j = 0; j < this.classes[i].timetable[k].length; j++) {
            if(parseInt(periodBeforeBreak) && j==(periodBeforeBreak)){
                childClasses[i].timetable[k].push("break")
                continue
            }
              let p = Math.random();
              if (p < 0.30)
                childClasses[i].timetable[k].push(this.classes[i].timetable[k][j]) 
            //  else
            //    childClasses[i].timetable[k].push(p2.classes[i].timetable[k][j]) 
              else if (p < 0.90)
                childClasses[i].timetable[k].push(p2.classes[i].timetable[k][j]) 
              else
                childClasses[i].timetable[k].push(this.subjectIdKey[i][this.getRandomInt(0, max-1)]);
            }
          }
            }
            return new Individual(workingdays,childClasses,teachID,subjectIdKey,classesInfo);
      }
}