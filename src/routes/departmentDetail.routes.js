import { Router } from "express";
import {updateDetails} from "../controllers/departmentDetail.controllers.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"


const departmentDetailRouter = Router()

departmentDetailRouter.route("/").post(verifyJWT,updateDetails)

export default departmentDetailRouter;