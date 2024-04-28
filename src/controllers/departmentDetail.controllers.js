import { asyncHandler } from "../utils/asyncHandler.js";
import { DepartmentDetail } from "../models/departmentDetail.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const teach= (teacherID)=>{
    let newTeacherID={}
    teacherID.forEach(element => {
        newTeacherID={...element,...newTeacherID}
    });
    return newTeacherID;
}

const addTimetable=(classes,workingDay)=>{
    const _array=[]
    const count = parseInt(workingDay.fullWorkingDayNo)+parseInt(workingDay.halfWorkingDayNo)
    for(let i=0;i<count;i++){
      _array.push([])
    }
    classes.forEach((arr)=>{
      arr.timetable=_array
    })
    return classes
  }

const addSpecifiSub=(specificSub,classes)=>{
    for (let i =0; i<classes.length; i++){
        let subject=Object.keys(classes[i].subjectID)
        specificSub.forEach(ele=>{
            let a=Object.keys(ele)[0]
            if (subject.includes(a))
            {
                let specificSubject={}
                let b=Object.values(ele)[0]
                b.forEach(ele=>{
                   let [i,j]= ele.split('-')
                   specificSubject={...specificSubject,[(i-1)+"-"+(j-1)]:a}
                })
                classes[i]={...classes[i],"specificSub":{...specificSubject,...(classes[i].specificSub?classes[i].specificSub:null)}}
                console.log(classes[i]);
            }
        })
    }
}

const updateDetails=asyncHandler( async (req,res)=>{
    let {workingday,classes,teacherID,specificSub}= req.body
    const user =req.user
   teacherID = teach(teacherID)
   classes = addTimetable(classes,workingday)
   addSpecifiSub(specificSub,classes)
    if(!classes){
        throw new ApiError(404,"classes are required")
    }

    try {
        const doc = await DepartmentDetail.findOneAndUpdate
            (   {department:user._id},
                {
                    department:user._id,
                    workingday,
                    classes,
                    teacherID
                },
                { upsert: true, new: true })
        return res.status(200)
                    .json(new ApiResponse(200,doc, " Successfully updated details"))
    } catch (error) {
        throw new ApiError(500, "Something went wrong while updating detail");
    } 
})
export {updateDetails}