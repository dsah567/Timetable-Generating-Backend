export class NewIndividual{
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
                        //console.log(fittness);
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
        let runNum=0
        let runNumWithoutBreak=0
        for(let i=0;i<this.classes.length-1;i++){
            for(let j=0;j<this.classes[i].timetable.length;j++){
               
                //console.log("ftt-1");
                for (let k = 0; k < this.classes[i].timetable[j].length; k++){
                    
                    for (let x = 0; x < this.classes.length -( i+1); x++){
                        runNum++
                        //console.log("ftt1");
                        if((this.classes[i].timetable[j][k]) =="break"||(this.classes[i].timetable[j][k]) =="NA"){
                            console.log(this.classes[i].timetable[j][k]);
                            console.log("continue");
                            continue
                        }
                        console.log("continue dont work");
                        
                        runNumWithoutBreak++
                        // console.log(this.teachID[this.classes[i].timetable[j][k]] ,
                        //     this.teachID[this.classes[i + 1 ].timetable[j][k]],this.teachID[this.classes[i].timetable[j][k]] ==
                        //     this.teachID[this.classes[i + 1 ].timetable[j][k]]);
                        if (
                            this.teachID[this.classes[i].timetable[j][k]] ==
                             this.teachID[this.classes[i + 1 + x ].timetable[j][k]]
                          ) {
                            console.log(this.teachID[this.classes[i].timetable[j][k]],
                                this.teachID[this.classes[i + 1 + x ].timetable[j][k]],
                                i,j,k,x);
                            //console.log("true run");
                            fittness++;
                            //console.log("ftt2",fittness);
                          }
                          console.log("needs  2      run or     1 run");
                    }
                    console.log("needs 5 and 4 run");
                }
                console.log("need 6 runs");
            }
            //console.log(runNum,runNumWithoutBreak);
            console.log("neds 2 run");
        }
       // console.log(fittness);
        return fittness
    }

}