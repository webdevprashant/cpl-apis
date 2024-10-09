import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const dbURL = process.env.dbUrl || "";

export default async function connectDB() {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(dbURL, { minPoolSize: 5, maxPoolSize: 20, maxIdleTimeMS: 600000 });
    console.log("-------------------------------------");
    console.log("Mongo Database Connection Successful.");
    console.log("-------------------------------------");
  } catch (err) {
    console.log("---------------------------");
    console.log("Mongo DB Connection Failed.");
    console.log("---------------------------");
    console.error(err);
  }
}