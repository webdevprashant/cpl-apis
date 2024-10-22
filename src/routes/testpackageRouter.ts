import express from "express";
import TestPackageModel from "../models/testPackage.model";
import { formDataMulterKey, subFolders } from "../utils/constant";
import { logger, saveFilePath, uploadFileLocallyMulter } from "../utils/utils";

const router = express.Router();
const upload = uploadFileLocallyMulter();

router.get("/", async (req: express.Request, res: express.Response) => {
  try {
    const testsackages = await TestPackageModel.find({ isActive: true, isDeleted: false }).sort({ _id: -1 });
    logger(true, "Getting all testspackages.");
    return res.status(200).json({
      status: true,
      message: "Getting all testspackages.",
      data: testsackages
    });
  } catch (err) {
    logger(
      false,
      "Getting all testspackages failed due to Internal Server error.",
      err
    );
    return res.status(500).json({
      status: false,
      message: "Getting all testspackages failed due to Internal Server error.",
      data: err
    });
  }
});

router.get("/:id", async (req: express.Request, res: express.Response) => {
  try {
    const testpackage = await TestPackageModel.findById(req.params.id);
    logger(true, "Getting testpackage by id.", req.params.id);
    return res.status(200).json({
      status: true,
      message: "Getting testpackage.",
      data: testpackage
    });
  } catch (err) {
    logger(
      false,
      "Getting testpackage failed due to Internal Server error.",
      err
    );
    return res.status(500).json({
      status: false,
      message: "Getting testpackage failed due to Internal Server error.",
      data: err
    });
  }
});

router.post("/", upload.fields([ { name: formDataMulterKey.testAndPackage }, { name: formDataMulterKey.report } ]), async (req: express.Request, res: express.Response) => {
  try {
    if (req.files[formDataMulterKey.testAndPackage]) {
      req.body.imageURL = saveFilePath(subFolders.testPackages, req.files[formDataMulterKey.testAndPackage][0].filename);
    }
    
    if (req.files[formDataMulterKey.report]) {
      req.body.reportURL = saveFilePath(subFolders.report, req.files[formDataMulterKey.report][0].filename);
    }

    logger(true, "Creating testpackage : ", req.body);

    if (req.body.parameters) {
      // Split by '*' if found, then take the slice, otherwise split by ';'
      req.body.parameters = req.body.parameters.includes('*')
        ? req.body.parameters.split('*').slice(1)
        : req.body.parameters.split(';');
    }
    const testpackage = await new TestPackageModel({...req.body}).save();
    return res.status(200).json({
      status: true,
      message: "Test/Package created.",
      data: testpackage
    });
  } catch (err) {
    logger(
      false,
      "Creating test/package failed due to Internal Server error.",
      err
    );
    return res.status(500).json({
      status: false,
      message: "Creating test/package failed due to Internal Server error.",
      data: err
    });
  }
});

router.put("/:id", upload.fields([ { name: formDataMulterKey.testAndPackage }, { name: formDataMulterKey.report } ]), async (req: express.Request, res: express.Response) => {
  try {
    if (req.files[formDataMulterKey.testAndPackage]) {
      req.body.imageURL = saveFilePath(subFolders.testPackages, req.files[formDataMulterKey.testAndPackage][0].filename);
    }
    
    if (req.files[formDataMulterKey.report]) {
      req.body.reportURL = saveFilePath(subFolders.report, req.files[formDataMulterKey.report][0].filename);
    }

    if (req.body.parameters && (req.body.parameters.includes('*') || req.body.parameters.includes(';'))) {
      // Split by '*' if found, then take the slice, otherwise split by ';'
      req.body.parameters = req.body.parameters.includes('*')
        ? req.body.parameters.split('*').slice(1)
        : req.body.parameters.split(';');
    }
    
    logger(true, "Updating test/package : ", req.body);
    const test = await TestPackageModel.findByIdAndUpdate(req.params.id, { ...req.body, updatedAt: Date.now() }, { new: true });
    return res.status(500).json({
      status: true,
      message: "Test/Package updated.",
      data: test
    });
  } catch (err) {
    logger(
      false,
      "Updating test/package failed due to Internal Server error.",
      err
    );
    return res.status(500).json({
      status: false,
      message: "Updating test/package failed due to Internal Server error.",
      data: err
    });
  }
});

router.put("/status/:id" , async (req: express.Request, res: express.Response) => {
  try {
    logger(true, "Updating Test/Package status.", req.body);
    const test = await TestPackageModel.findByIdAndUpdate(req.params.id, { isActive: req.body.isActive, updatedAt: Date.now() }, { new: true });
    return res.status(200).json({
      status: true,
      message: "Test/Package status updated.",
      data: test
    });
  } catch (err) {
    logger(
      false,
      "Updating test/package status failed due to Internal Server error.",
      err
    );
    return res.status(500).json({
      status: false,
      message: "Updating test/package status failed due to Internal Server error.",
      data: err
    });
  }
});

router.delete("/:id", async (req: express.Request, res: express.Response) => {
  try {
    logger(true, "Deleting Test/Package by Id : ", req.params.id);
    const test = await TestPackageModel.findByIdAndUpdate(req.params.id, { isActive: false, isDeleted: true, updatedAt: Date.now() });
    return res.status(200).json({
      status: true,
      message: "Test/Package deletion successfull.",
    });
  } catch (err) {
    logger(
      false,
      "Deleting Test/Package failed due to Internal Server error.",
      err
    );
    return res.status(500).json({
      status: false,
      message: "Deleting Test/Package failed due to Internal Server error.",
      data: err
    });
  }
});

export default router;