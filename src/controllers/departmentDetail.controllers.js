import { asyncHandler } from "../utils/asyncHandler.js";
import { DepartmentDetail } from "../models/departmentDetail.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const updateDetails=asyncHandler( async (req,res)=>{
    const {workingday,classes,teacherID}= req.body
    const user =req.user
    // console.log("useru",user);
    // console.log("workingday",workingday);
    // console.log("classes",classes);
    // console.log("teacherID",teacherID);
    // console.log(typeof user,typeof workingday,typeof classes,typeof teacherID);

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