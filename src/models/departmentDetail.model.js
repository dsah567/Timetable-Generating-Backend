import mongoose,{Schema} from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const departmentDetailSchema = new Schema({
    workingday:Object,
    classes:Array,
    teacherID:Object,
    department: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

departmentDetailSchema.plugin(mongooseAggregatePaginate)

export const DepartmentDetail = mongoose.model("DepartmentDetail",departmentDetailSchema)