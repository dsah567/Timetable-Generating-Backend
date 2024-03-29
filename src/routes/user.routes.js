import { Router } from "express";
import {registerUser,loginUser,logoutUser,refreshAccessToken,isLogedInUser} from"../controllers/user.controllers.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
const userRouter = Router()

userRouter.route("/register").post(registerUser)
userRouter.route("/login").post(loginUser)
userRouter.route("/logout").post(verifyJWT, logoutUser)
userRouter.route("/islogedin").post(verifyJWT, isLogedInUser)
userRouter.route("/refresh-token").post(refreshAccessToken)

export default userRouter
