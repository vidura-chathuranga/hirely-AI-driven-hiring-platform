import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("DB URL not found");
    }
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database Synced");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
