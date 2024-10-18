import express from "express";
import header from "./utils/header";
import dotenv from "dotenv";
import bodyParser from "body-parser";
dotenv.config();
import connectDB from "./utils/db-config";
const app = express();

connectDB();

app.use(bodyParser.urlencoded({limit: '50mb', extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));


app.get("/", (req: express.Request, res: express.Response) => {
  res.send(`Welcome to CPL ${req.headers.host}`);
});

import UserRouter from "./routes/userRouter";
import TestPackageRouter from "./routes/testpackageRouter";
import RoleRouter from "./routes/roleRouter";
import AuthRouter from "./routes/authRouter";
import BookingRouter from "./routes/bookingRouter";

app.use("/testpackages", header , TestPackageRouter);
app.use("/users", header , UserRouter);
app.use("/roles", header , RoleRouter);
app.use("/auth", header , AuthRouter);
app.use("/booking" , header , BookingRouter);

app.listen(process.env.port, () => console.log(`Server Listening On Port: ${process.env.port}`));