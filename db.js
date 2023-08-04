import mongoose from "mongoose";
import { MongoURI } from "./config.js";


export const connectDB = async () => {
  try {
    await mongoose.connect(MongoURI);
    console.log("DB is connected");
  } catch (error) {
    console.log(error);
  }
};
