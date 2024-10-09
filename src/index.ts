import express from "express";
import header from "./utils/header";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./utils/db-config";
const app = express();

connectDB();

app.use(express.json());


app.get("/", (req: express.Request, res: express.Response) => {
  res.send(`Welcome to CPL ${req.headers.host}`);
});

import UserRouter from "./routes/userRouter";
import TestRouter from "./routes/testRouter";
import PackageRouter from "./routes/packageRouter";
import RoleRouter from "./routes/roleRouter";
import AuthRouter from "./routes/authRouter";

app.use("/packages", header, PackageRouter);
app.use("/tests", header , TestRouter);
app.use("/users", header , UserRouter);
app.use("/roles", header , RoleRouter);
app.use("/auth", header , AuthRouter);

app.listen(process.env.port, () => console.log(`Server Listening On Port: ${process.env.port}`));