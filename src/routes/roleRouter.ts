import { Request, Response, Router } from "express";
import RoleModel from "../models/role.model";
import { logger } from "../utils/utils";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const roles = await RoleModel.find();
    logger(true, "Getting Roles.");
    return res.send({
      status: true,
      message: "Getting Roles.",
      data: roles
    });
  } catch (err) {
    logger(
      false,
      "Getting Roles failed due to Internal Server error.",
      err
    );
    return res.status(500).json({
      status: false,
      message: "Getting Roles failed due to Internal Server error.",
      data: err
    });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    logger(true, "Creating Role.");
    const role = await new RoleModel({ ...req.body }).save();
    return res.status(200).json({
      status: true,
      message: "Role creation successfull.",
      data: role
    });
  } catch (err) {
    logger(
      false,
      "Creating Role failed due to Internal Server error.",
      err
    );
    return res.status(500).json({
      status: false,
      message: "Creaing Role failed due to Internal Server error.",
      data: err
    });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    logger(true, "Updating Role.", req.params.id);
    const role = await RoleModel.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
    return res.status(200).json({
      status: true,
      message: "Role updation successfull.",
      data: role
    });
  } catch (err) {
    logger(
      false,
      "Updating Role failed due to Internal Server error.",
      err
    );
    return res.status(500).json({
      status: false,
      message: "Updaing Role failed due to Internal Server error.",
      data: err
    });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    logger(true, "Deleting Role : ", req.params.id);
    const role = await RoleModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      status: true,
      message: "Role deletion successfull.",
    });
  } catch (err) {
    logger(
      false,
      "Deleting Role failed due to Internal Server error.",
      err
    );
    return res.status(500).json({
      status: false,
      message: "Deleting Role failed due to Internal Server error.",
      data: err
    });
  }
});

export default router;