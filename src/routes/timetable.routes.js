import { Router } from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js"
import { getTimetable, updateTimetable } from "../controllers/timetable.controller.js";

const timetableRouter= Router()

timetableRouter.route("/").post(verifyJWT,updateTimetable)
timetableRouter.route("/").get(verifyJWT,getTimetable)

export default timetableRouter