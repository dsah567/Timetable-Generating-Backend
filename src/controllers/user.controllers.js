import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Timetable } from "../models/timetable.model.js";
import { DepartmentDetail } from "../models/departmentDetail.model.js";

import jwt from "jsonwebtoken";

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  //get details of user
  //check user details & validation not empty
  //check user exist or not from email and username
  //create user object - create entry in db
  //remove password and refresh token from result
  //check for creation
  //return response

  const { username, email, name, password } = req.body;
  console.log(username, email, name, password);

  if ([name, email, username, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    username,
  });
  console.log(user);
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username && !email) {
    throw new ApiError(400, "username or email is required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (!user) {
    throw new ApiError(409, "User with email or username doesn't exists");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  // console.log(isPasswordValid);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incommingRefereshToken =
    req.cookies.refreshToken || req.body.refreshToken;
  if (!incommingRefereshToken) {
    throw new ApiError(401, "unauthorize access");
  }

  try {
    const decodedToken = jwt.verify(
      incommingRefereshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);
    if (!user) {
      throw new ApiError(401, "Unauthorize access");
    }

    if (incommingRefereshToken !== user?.refreshToken) {
      throw new ApiError(401, "Unauthorize access");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefereshTokens(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed"
        )
      );
  } catch (err) {
    throw new ApiError(401, err?.message || "Invalid refresh token");
  }
});

const isLogedInUser =async (req,res)=>{
  if(req.user._id){
    let User = req.user
    let Department = null
    let Timetable= null
    const  depatmentInfo= async()=>{
      try {
        const department = await DepartmentDetail.findOne({ department: req.user._id});
       // console.log(department);
        if(!department){
          return false
        }
        else{
          return  true
        }
        //console.log(Department);
      } catch (error) {
        //console.log(error);
        return false
      }
    }
    Department = await depatmentInfo()
    //console.log("out",Department);

    const timetableInfo = async()=>{
      try {
        const timetable = await Timetable.findOne({  department: req.user._id});
        //console.log(timetable);
        if(!timetable){
          return false
        }
        else{
          return  true
        }
        //console.log(timetable);
      } catch (error) {
        //console.log(error);
        return false
      }
    }
    Timetable = await timetableInfo()
    //console.log("out",Timetable);
    return res
            .status(200) 
            .json(new ApiResponse(200, {User,Department,Timetable}, "User is logged in"));        
  }
  return res
          .status(400)
          .json(new ApiError(400, {}, "User is not logged in"));
 }
export { registerUser,
         loginUser,
         logoutUser, 
         refreshAccessToken,
         isLogedInUser };
