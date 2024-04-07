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
        console.log(workingday);
        console.log(classes)
        console.log(teacherID);
        // const {teachID}  = await timetableGenerator(workingday,classes,teacherID)
        // console.log(teachID)
        // console.log(timetable)
        return res.status(200)
                .json(new ApiResponse(200,{},"Timetable Generated"))
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