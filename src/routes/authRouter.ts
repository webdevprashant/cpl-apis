import express from "express";
import UserModel from "../models/user.model";
import { createJWTToken, logger, randomNumber, sendOTP } from "../utils/utils";

const router = express.Router();

router.post("/sign", async (req: express.Request, res: express.Response) => {
  try {
    if (!req.body.mobile) {
      logger(false, `Mobile number is must for sign.` , req.body.mobile);
        return res.json({
          status: false,
          message: `Mobile number is must for sign.`,
        });
    }
    const isUserExist = await UserModel.findOne({ mobile: req.body.mobile, isDeleted: false });
    let OTP = randomNumber();
    let result = await sendOTP(req.body.mobile, OTP, false);
    // In Case User Login
    if (isUserExist) {
      // Create token
      const token = createJWTToken(isUserExist);
      logger(true, `User Logging ${isUserExist.mobile} , OTP : ${OTP}`);
      return res.status(200)
      .cookie('token' , token)
      .json({
        status: true,
        message: "User Logging.",
        data: { isRegistered: true, token: token, OTP: OTP },
      });
    }
    // In Case User Registering 
    else {
      logger(true, `User not Registered ${req.body.mobile} , OTP : ${OTP}`);
      return res.status(200).json({
        status: true,
        message: "User not Registered.",
        data: { isRegistered: false , OTP: OTP },
      }); 
    }
  } catch (err) {
    logger(
      false,
      "Logging User failed due to Internal Server error.",
      err
    );
    return res.status(500).json({
      status: false,
      message: "Logging User failed due to Internal Server error.",
      data: err
    });
  }
});

router.post("/register", async (req: express.Request, res: express.Response) => {
  try {
    const { roleId, firstName, mobile, address, gender } = req.body;
    if (!roleId || !firstName || !mobile || !address || !gender) {
      return res.status(200).json({
        status: false,
        message: `RoleId ${roleId}, firstName ${firstName}, mobile ${mobile}, address ${address}, gender ${gender} is must for registration.`
      })
    }

    if (req.body.dob) {
      const date = new Date(req.body.dob);
      req.body.age = new Date().getFullYear() - date.getFullYear() 
    }

    logger(true, "Registering User.", req.body);
    const user = await new UserModel({ ...req.body }).save();
    const token = createJWTToken(user);
    return res.status(200).json({
      status: true,
      message: "User registration successfull.",
      data: token,
    });
  } catch (err) {
    logger(
      false,
      "Register User failed due to Internal Server error.",
      err
    );
    return res.status(500).json({
      status: false,
      message: "Register User failed due to Internal Server error.",
      data: err
    });
  }
});

router.post("/sendOTP", async (req: express.Request, res: express.Response) => {
  try {
    if (!req.body.mobile) {
      return res.status(200).json({
        status: false,
        message: "Mobile is must to send OTP.",
      });  
    }
    let OTP = randomNumber();
    const result = await sendOTP(req.body.mobile, OTP, false);
    return res.status(200).json({
      status: true,
      message: "Registration Sending OTP operation successfully.",
      data: OTP,
    });
    // }
  } catch (err) {
    logger(
      false,
      "Sending OTP operation failed due to Internal Server error.",
      err
    );
    return res.status(200).json({
      status: false,
      message: "Sending OTP operation failed due to Internal Server error.",
      data: err,
    });
  }
});



export default router;