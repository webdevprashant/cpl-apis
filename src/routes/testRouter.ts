import express from "express";
import TestModel from "../models/test.model";
import { subFolders } from "../utils/constant";
import { logger, saveFilePath, uploadFileLocallyMulter } from "../utils/utils";

const router = express.Router();
const upload = uploadFileLocallyMulter();

router.get("/", async (req: express.Request, res: express.Response) => {
  try {
    const tests = await TestModel.find({ isActive: true, isDeleted: false }).sort({ _id: -1 });
    logger(true, "Getting all tests.");
    return res.status(200).json({
      status: true,
      message: "Getting all tests.",
      data: tests
    });
  } catch (err) {
    logger(
      false,
      "Getting all tests failed due to Internal Server error.",
      err
    );
    return res.status(500).json({
      status: false,
      message: "Getting all tests failed due to Internal Server error.",
      data: err
    });
  }
});

router.get("/:id", async (req: express.Request, res: express.Response) => {
  try {
    const test = await TestModel.findById(req.params.id);
    logger(true, "Getting test by id.", req.params.id);
    return res.status(200).json({
      status: true,
      message: "Getting test.",
      data: test
    });
  } catch (err) {
    logger(
      false,
      "Getting test failed due to Internal Server error.",
      err
    );
    return res.status(500).json({
      status: false,
      message: "Getting test failed due to Internal Server error.",
      data: err
    });
  }
});

router.post("/", upload.fields([ { name: "test" }, { name: "report" } ]), async (req: express.Request, res: express.Response) => {
  try {
    if (req.files["test"]) {
      req.body.imageURL = saveFilePath(subFolders.test, req.files["test"][0].filename);
    }
    
    if (req.files["report"]) {
      req.body.reportURL = saveFilePath(subFolders.report, req.files["report"][0].filename);
    }

    logger(true, "Creating test : ", req.body);

    if (req.body.parameters) {
      // Split by '*' if found, then take the slice, otherwise split by ';'
      req.body.parameters = req.body.parameters.includes('*')
        ? req.body.parameters.split('*').slice(1)
        : req.body.parameters.split(';');
    }
    const test = await new TestModel({...req.body}).save();
    return res.status(200).json({
      status: true,
      message: "Test created.",
      data: test
    });
  } catch (err) {
    logger(
      false,
      "Creating test failed due to Internal Server error.",
      err
    );
    return res.status(500).json({
      status: false,
      message: "Creating test failed due to Internal Server error.",
      data: err
    });
  }
});

router.put("/:id", upload.fields([ { name: "test" }, { name: "report" } ]), async (req: express.Request, res: express.Response) => {
  try {
    if (req.files["test"]) {
      req.body.imageURL = saveFilePath(subFolders.test, req.files["test"][0].filename);
    }
    
    if (req.files["report"]) {
      req.body.reportURL = saveFilePath(subFolders.report, req.files["report"][0].filename);
    }

    if (req.body.parameters && (req.body.parameters.includes('*') || req.body.parameters.includes(';'))) {
      // Split by '*' if found, then take the slice, otherwise split by ';'
      req.body.parameters = req.body.parameters.includes('*')
        ? req.body.parameters.split('*').slice(1)
        : req.body.parameters.split(';');
    }
    
    logger(true, "Updating test : ", req.body);
    const test = await TestModel.findByIdAndUpdate(req.params.id, { ...req.body, updatedAt: Date.now() }, { new: true });
    return res.status(500).json({
      status: true,
      message: "Test updated.",
      data: test
    });
  } catch (err) {
    logger(
      false,
      "Updating test failed due to Internal Server error.",
      err
    );
    return res.status(500).json({
      status: false,
      message: "Updating test failed due to Internal Server error.",
      data: err
    });
  }
});

router.put("/status/:id" , async (req: express.Request, res: express.Response) => {
  try {
    logger(true, "Updating Test status.", req.body);
    const test = await TestModel.findByIdAndUpdate(req.params.id, { isActive: req.body.isActive, updatedAt: Date.now() }, { new: true });
    return res.status(200).json({
      status: true,
      message: "Test status updated.",
      data: test
    });
  } catch (err) {
    logger(
      false,
      "Updating test status failed due to Internal Server error.",
      err
    );
    return res.status(500).json({
      status: false,
      message: "Updating test status failed due to Internal Server error.",
      data: err
    });
  }
});

router.delete("/:id", async (req: express.Request, res: express.Response) => {
  try {
    logger(true, "Deleting Test by Id : ", req.params.id);
    const test = await TestModel.findByIdAndUpdate(req.params.id, { isActive: false, isDeleted: true, updatedAt: Date.now() });
    return res.status(200).json({
      status: true,
      message: "Test deletion successfull.",
    });
  } catch (err) {
    logger(
      false,
      "Deleting Test failed due to Internal Server error.",
      err
    );
    return res.status(500).json({
      status: false,
      message: "Deleting Test failed due to Internal Server error.",
      data: err
    });
  }
});

export default router;