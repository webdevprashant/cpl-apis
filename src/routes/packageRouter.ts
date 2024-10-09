import express from "express";
import PackageModel from "../models/package.model";
import { subFolders } from "../utils/constant";
import { logger, saveFilePath, uploadFileLocallyMulter } from "../utils/utils";

const router = express.Router();
const upload = uploadFileLocallyMulter();

router.get("/", async (req: express.Request, res: express.Response) => {
  try {
    const packages = await PackageModel.find({ isActive: true, isDeleted: false }).sort({ _id: -1 });
    logger(true, "Getting all packages.");
    return res.status(200).json({
      status: true,
      message: "Getting all packages.",
      data: packages
    });
  } catch (err) {
    logger(
      false,
      "Getting all packages failed due to Internal Server error.",
      err
    );
    return res.status(500).json({
      status: false,
      message: "Getting all packages failed due to Internal Server error.",
      data: err
    });
  }
});

router.get("/:id", async (req: express.Request, res: express.Response) => {
  try {
    const packag = await PackageModel.findById(req.params.id);
    logger(true, "Getting package by id.", req.params.id);
    return res.status(200).json({
      status: true,
      message: "Getting package.",
      data: packag
    });
  } catch (err) {
    logger(
      false,
      "Getting package failed due to Internal Server error.",
      err
    );
    return res.status(500).json({
      status: false,
      message: "Getting package failed due to Internal Server error.",
      data: err
    });
  }
});

router.post("/", upload.fields([ { name: "package" }, { name: "report" } ]), async (req: express.Request, res: express.Response) => {
  try {
    if (req.files["package"]) {
      req.body.imageURL = saveFilePath(subFolders.package, req.files["package"][0].filename);
    }
    
    if (req.files["report"]) {
      req.body.reportURL = saveFilePath(subFolders.report, req.files["report"][0].filename);
    }

    logger(true, "Creating package : ", req.body);
    const packag = await new PackageModel({ ...req.body }).save();
    return res.status(200).json({
      status: true,
      message: "Package created.",
      data: packag
    });
  } catch (err) {
    logger(
      false,
      "Creating package failed due to Internal Server error.",
      err
    );
    return res.status(500).json({
      status: false,
      message: "Creating package failed due to Internal Server error.",
      data: err
    });
  }
});

router.put("/:id", upload.fields([ { name: "package" }, { name: "report" } ]), async (req: express.Request, res: express.Response) => {
  try {
    if (req.files["package"]) {
      req.body.imageURL = saveFilePath(subFolders.package, req.files["package"][0].filename);
    }
    
    if (req.files["report"]) {
      req.body.reportURL = saveFilePath(subFolders.report, req.files["report"][0].filename);
    }

    logger(true, "Updating package : ", req.body);
    const packag = await PackageModel.findByIdAndUpdate(req.params.id, { ...req.body, updatedAt: Date.now() }, { new: true });
    return res.status(200).json({
      status: true,
      message: "Package updated.",
      data: packag
    });
  } catch (err) {
    logger(
      false,
      "Updating package failed due to Internal Server error.",
      err
    );
    return res.status(500).json({
      status: false,
      message: "Updating package failed due to Internal Server error.",
      data: err
    });
  }
});

router.put("/status/:id" , async (req: express.Request, res: express.Response) => {
  try {
    logger(true, "Updating package status.", req.body);
    const packag = await PackageModel.findByIdAndUpdate(req.params.id, { isActive: req.body.isActive, updatedAt: Date.now() }, { new: true });
    return res.status(200).json({
      status: true,
      message: "Package status updated.",
      data: packag
    });
  } catch (err) {
    logger(
      false,
      "Updating package status failed due to Internal Server error.",
      err
    );
    return res.status(500).json({
      status: false,
      message: "Updating package status failed due to Internal Server error.",
      data: err
    });
  }
});

router.delete("/:id", async (req: express.Request, res: express.Response) => {
  try {
    logger(true, "Deleting package by Id : ", req.params.id);
    const packag = await PackageModel.findByIdAndUpdate(req.params.id, { isActive: false, isDeleted: true, updatedAt: Date.now() });
    return res.status(200).json({
      status: true,
      message: "Package deletion successfull.",
    });
  } catch (err) {
    logger(
      false,
      "Deleting Package failed due to Internal Server error.",
      err
    );
    return res.status(500).json({
      status: false,
      message: "Deleting Package failed due to Internal Server error.",
      data: err
    });
  }
});

export default router;