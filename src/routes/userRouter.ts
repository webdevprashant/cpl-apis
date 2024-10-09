import { Request, Response, Router } from "express";
import UserModel from "../models/user.model";
import { logger } from "../utils/utils";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find({ isActive: true, isDeleted: false });
    logger(true, "Getting Active Users.");
    return res.send({
      status: true,
      message: "Getting Active users.",
      data: users
    });
  } catch (err) {
    logger(
      false,
      "Getting all Users failed due to Internal Server error.",
      err
    );
    return res.status(500).json({
      status: false,
      message: "Getting all Users failed due to Internal Server error.",
      data: err
    });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    logger(true, "Getting User.", req.params.id);
    const user = await UserModel.findById(req.params.id);
    return res.send({
      status: true,
      message: "Getting user.",
      data: user
    });
  } catch (err) {
    logger(
      false,
      "Getting User failed due to Internal Server error.",
      err
    );
    return res.status(500).json({
      status: false,
      message: "Getting User failed due to Internal Server error.",
      data: err
    });
  }
});

// router.post("/", async (req: Request, res: Response) => {
//   try {
//     logger(true, "Creating User.");
//     if (req.body.dob) {
//       const date = new Date(req.body.dob);
//       req.body.age = new Date().getFullYear() - date.getFullYear() 
//     }
//     const user = await new UserModel({ ...req.body }).save();
//     return res.status(200).json({
//       status: true,
//       message: "Users creation successfull.",
//       data: user
//     });
//   } catch (err) {
//     logger(
//       false,
//       "Creating User failed due to Internal Server error.",
//       err
//     );
//     return res.status(500).json({
//       status: false,
//       message: "Creaing User failed due to Internal Server error.",
//       data: err
//     });
//   }
// });

router.put("/:id", async (req: Request, res: Response) => {
  try {
    logger(true, "Updating User by Id : ", req.params.id);
    const user = await UserModel.findByIdAndUpdate(req.params.id, { ...req.body, updatedAt: Date.now() }, { new: true });
    return res.status(200).json({
      status: true,
      message: "User updation successfull.",
      data: user
    });
  } catch (err) {
    logger(
      false,
      "Updating User failed due to Internal Server error.",
      err
    );
    return res.status(500).json({
      status: false,
      message: "Updaing User failed due to Internal Server error.",
      data: err
    });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    logger(true, "Deleting User by Id : ", req.params.id);
    const user = await UserModel.findByIdAndUpdate(req.params.id, { isActive: false, isDeleted: true , updatedAt: Date.now() });
    return res.status(200).json({
      status: true,
      message: "User deletion successfull.",
    });
  } catch (err) {
    logger(
      false,
      "Deleting User failed due to Internal Server error.",
      err
    );
    return res.status(500).json({
      status: false,
      message: "Deleting User failed due to Internal Server error.",
      data: err
    });
  }
});

export default router;