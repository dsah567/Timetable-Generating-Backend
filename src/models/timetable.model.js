import mongoose,{Schema} from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const timetableSchema = new Schema({
    classes:Array,
    teachID:Object,
    subjectIdKey:Array,
    department: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

timetableSchema.plugin(mongooseAggregatePaginate)

export const Timetable = mongoose.model("Timetable",timetableSchema)