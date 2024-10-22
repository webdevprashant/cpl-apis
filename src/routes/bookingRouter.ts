import express from "express";
import BookingModel from "../models/booking.model";
import { logger } from "../utils/utils";

const router = express.Router();

router.get("/", async (req: express.Request, res: express.Response) => {
  try {
    const bookings = await BookingModel.find({ isDeleted: false }).sort({ _id: -1 });
    logger(true, "Getting all booking.");
    return res.status(200).json({
      status: true,
      message: "Getting all booking.",
      data: bookings
    });
  } catch (err) {
    logger(
      false,
      "Getting all booking failed due to Internal Server error.",
      err
    );
    return res.status(500).json({
      status: false,
      message: "Getting all booking failed due to Internal Server error.",
      data: err
    });
  }
});

router.get("/:id", async (req: express.Request, res: express.Response) => {
  try {
    const booking = await BookingModel.findById(req.params.id);
    logger(true, "Getting booking by id.", req.params.id);
    return res.status(200).json({
      status: true,
      message: "Getting booking.",
      data: booking
    });
  } catch (err) {
    logger(
      false,
      "Getting booking failed due to Internal Server error.",
      err
    );
    return res.status(500).json({
      status: false,
      message: "Getting booking failed due to Internal Server error.",
      data: err
    });
  }
});

router.get("/:id/collectionVender", async (req: express.Request, res: express.Response) => {
  try {
    const booking = await BookingModel.find({ allocatedTo: req.params.id }).sort({ _id :-1 });
    logger(true, `Getting bookings by collectionVender ${req.params.id} .`, req.params.id);
    return res.status(200).json({
      status: true,
      message: "Getting bookings by collectionVender.",
      data: booking
    });
  } catch (err) {
    logger(
      false,
      "Getting bookings by collectionVender failed due to Internal Server error.",
      err
    );
    return res.status(500).json({
      status: false,
      message: "Getting bookings by collectionVender failed due to Internal Server error.",
      data: err
    });
  }
});

router.get("/:id/patient", async (req: express.Request, res: express.Response) => {
  try {
    const booking = await BookingModel.find({ userId: req.params.id }).sort({ _id :-1 });
    logger(true, `Getting bookings by patient id ${req.params.id} .`, req.params.id);
    return res.status(200).json({
      status: true,
      message: "Getting bookings by patient.",
      data: booking
    });
  } catch (err) {
    logger(
      false,
      "Getting bookings by patient failed due to Internal Server error.",
      err
    );
    return res.status(500).json({
      status: false,
      message: "Getting bookings by patient failed due to Internal Server error.",
      data: err
    });
  }
});

router.post("/", async (req: express.Request, res: express.Response) => {
  try {
    logger(true, "Creating booking : ", req.body);
    if (req.body.allocatedTo) {
      req.body.status = 1;        // If booking allocatedTo, status is allocated
    } else {
      req.body.status = 0;        // status is pending
    }
    const booking = await new BookingModel({...req.body}).save();
    return res.status(200).json({
      status: true,
      message: "Booking created.",
      data: booking
    });
  } catch (err) {
    logger(
      false,
      "Creating booking operation failed due to Internal Server error.",
      err
    );
    return res.status(500).json({
      status: false,
      message: "Creating booking operation failed due to Internal Server error.",
      data: err
    });
  }
});

router.put("/:id", async (req: express.Request, res: express.Response) => {
  try {
    logger(true, "Updating booking : ", req.body);
    const booking = await BookingModel.findByIdAndUpdate(req.params.id, { ...req.body, updatedAt: Date.now() }, { new: true });
    return res.status(500).json({
      status: true,
      message: "Test Booking.",
      data: booking
    });
  } catch (err) {
    logger(
      false,
      "Updating booking failed due to Internal Server error.",
      err
    );
    return res.status(500).json({
      status: false,
      message: "Updating booking failed due to Internal Server error.",
      data: err
    });
  }
});

router.delete("/:id", async (req: express.Request, res: express.Response) => {
  try {
    logger(true, "Deleting / Cancel booking by Id : ", req.params.id);
    const booking = await BookingModel.findByIdAndUpdate(req.params.id, { isDeleted: true, updatedAt: Date.now() });
    return res.status(200).json({
      status: true,
      message: "Deleting / Cancel booking successfull.",
    });
  } catch (err) {
    logger(
      false,
      "Deleting / Cancel booking failed due to Internal Server error.",
      err
    );
    return res.status(500).json({
      status: false,
      message: "Deleting / Cancel booking failed due to Internal Server error.",
      data: err
    });
  }
});

export default router;