import express from "express"
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(cookieParser())

//routes import

import userRouter from "./routes/user.routes.js";
import departmentDetailRouter from "./routes/departmentDetail.routes.js";
import timetableRouter from "./routes/timetable.routes.js";

//routes declearation
app.use("/api/v1/users",userRouter)
app.use("/api/v1/department",departmentDetailRouter)
app.use("/api/v1/timetable",timetableRouter)
export {app}