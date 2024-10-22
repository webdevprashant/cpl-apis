import express from "express";
import MandatoryDocumentModel from "../models/mandatoryDocument.model";
import { logger, saveFilePath, uploadFileLocallyMulter } from "../utils/utils";
import { formDataMulterKey, subFolders } from "../utils/constant";

const router = express.Router();
const upload = uploadFileLocallyMulter();
router.get("/", async (req: express.Request, res: express.Response) => {
  try {
    const mandatoryDocuments = await MandatoryDocumentModel.find({ isDeleted: false }).sort({ _id: -1 });
    logger(true, "Getting all mandatoryDocuments.");
    return res.status(200).json({
      status: true,
      message: "Getting all mandatoryDocuments.",
      data: mandatoryDocuments
    });
  } catch (err) {
    logger(
      false,
      "Getting all mandatoryDocuments failed due to Internal Server error.",
      err
    );
    return res.status(500).json({
      status: false,
      message: "Getting all mandatoryDocuments failed due to Internal Server error.",
      data: err
    });
  }
});

router.get("/:id", async (req: express.Request, res: express.Response) => {
  try {
    const mandatoryDocuments = await MandatoryDocumentModel.findById(req.params.id);
    logger(true, "Getting mandatoryDocument by id.", req.params.id);
    return res.status(200).json({
      status: true,
      message: "Getting mandatoryDocument.",
      data: mandatoryDocuments
    });
  } catch (err) {
    logger(
      false,
      "Getting mandatoryDocument failed due to Internal Server error.",
      err
    );
    return res.status(500).json({
      status: false,
      message: "Getting mandatoryDocument failed due to Internal Server error.",
      data: err
    });
  }
});

router.post("/", upload.single(formDataMulterKey.mandatoryDocument), async (req: express.Request, res: express.Response) => {
  try {
    if (req.file) {
      req.body.fileURL = saveFilePath(subFolders.document, req.file.filename);
    }
    logger(true, "Creating mandatoryDocument : ", req.body);
    const mandatoryDocuments = await new MandatoryDocumentModel({...req.body}).save();
    return res.status(200).json({
      status: true,
      message: "mandatoryDocument created.",
      data: mandatoryDocuments
    });
  } catch (err) {
    logger(
      false,
      "Creating mandatoryDocument operation failed due to Internal Server error.",
      err
    );
    return res.status(500).json({
      status: false,
      message: "Creating mandatoryDocument operation failed due to Internal Server error.",
      data: err
    });
  }
});

router.put("/:id", upload.single(formDataMulterKey.mandatoryDocument) , async (req: express.Request, res: express.Response) => {
  try {
    logger(true, "Updating mandatoryDocument : ", req.body);
    if (req.file) {
      req.body.fileURL = saveFilePath(subFolders.document, req.file.filename);
    }
    const mandatoryDocument = await MandatoryDocumentModel.findByIdAndUpdate(req.params.id, { ...req.body, updatedAt: Date.now() }, { new: true });
    return res.status(500).json({
      status: true,
      message: "Updating mandatoryDocument.",
      data: mandatoryDocument
    });
  } catch (err) {
    logger(
      false,
      "Updating mandatoryDocument failed due to Internal Server error.",
      err
    );
    return res.status(500).json({
      status: false,
      message: "Updating mandatoryDocument failed due to Internal Server error.",
      data: err
    });
  }
});

router.delete("/:id", async (req: express.Request, res: express.Response) => {
  try {
    logger(true, "Deleting mandatoryDocument by Id : ", req.params.id);
    const mandatoryDocument = await MandatoryDocumentModel.findByIdAndUpdate(req.params.id, { isDeleted: true,  updatedAt: Date.now() });
    return res.status(200).json({
      status: true,
      message: "Deleting mandatoryDocument successfull.",
    });
  } catch (err) {
    logger(
      false,
      "Deleting mandatoryDocument failed due to Internal Server error.",
      err
    );
    return res.status(500).json({
      status: false,
      message: "Deleting mandatoryDocument failed due to Internal Server error.",
      data: err
    });
  }
});

export default router;