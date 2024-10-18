import express from "express";
import UserModel from "../models/user.model";
import { createJWTToken, logger, randomNumber, sendOTP } from "../utils/utils";

const router = express.Router();

router.post("/login", async (req: express.Request, res: express.Response) => {
  try {
    const { mobile, password } = req.body;
    if (!mobile || !password) {
      return res.status(200).json({
        status: false,
        message: `Mobile, Password is must to login.`,
      });
    }
    const user = await UserModel.findOne({ mobile, password, isActive: true });
    if (!user) {
      return res.status(200).json({
        status: false,
        message: "User not found.",
      });
    }
    logger(true, "Logging User.", req.body);
    const token = createJWTToken(user);
    return res.status(200).json({
      status: true,
      message: "Logging User.",
      data: token,
    });
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
    const { roleId, firstName, mobile, password, address, gender } = req.body;
    if (!roleId || !firstName || !mobile || !password || !address || !gender) {
      return res.status(200).json({
        status: false,
        message: `RoleId ${roleId}, firstName ${firstName}, mobile ${mobile}, password ${password}, address ${address}, gender ${gender} is must for registration.`
      })
    }

    if (req.body.dob) {
      const date = new Date(req.body.dob);
      req.body.age = new Date().getFullYear() - date.getFullYear() 
    }

    logger(true, "Registering User.", req.body);
    const user = await new UserModel({ ...req.body }).save();
    return res.status(200).json({
      status: true,
      message: "User registration successfull.",
      data: user,
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