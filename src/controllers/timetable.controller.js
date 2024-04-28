import { asyncHandler } from "../utils/asyncHandler.js";
import { Timetable } from "../models/timetable.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { DepartmentDetail } from "../models/departmentDetail.model.js";
import timetableGenerator from "../utils/timetableAlgo.js"

const updateTimetable=asyncHandler(
    async(req,res)=>{
        const user =req.user
        const departmentDetail= await DepartmentDetail.findOne({department:user})
        // console.log(departmentDetail);
        const {workingday,classes,teacherID} = departmentDetail
        // console.log(workingday);
        // console.log(classes)
        // console.log(teacherID);
        const {resClasses,teachID,subjectIdKey}  = await timetableGenerator(workingday,classes,teacherID)
        // console.log("teach",teachID)
        // console.log(resClasses)

        try {
            const doc = await Timetable.findOneAndUpdate
                (   {department:user._id},
                    {
                        department:user._id,
                        classes:resClasses,
                        teachID,
                        subjectIdKey
                    },
                    { upsert: true, new: true })
            //console.log(doc);
            return res.status(200)
                        .json(new ApiResponse(200,doc, " Timetable Generated"))
        } catch (error) {
            throw new ApiError(500, "Something went wrong while updating detail");
        } 
    }
)
const getTimetable=asyncHandler(
    async(req,res)=>{
        const user =req.user
        const timetable= await Timetable.findOne({department:user})

        if(!timetable){
            throw new ApiError(409, "Timetable is not generated");
        }
        else{
            return res.status(200)
                    .json(new ApiResponse(200,timetable,"Sent timetable"))
        }
    }
)

export {updateTimetable,getTimetable}