import express from "express";
import jobsRouter from "./api/jobs";
import connectDB from "./persistance/db";
import "dotenv/config";

const app = express();

app.use(express.json());

// connect to the database
connectDB();

app.use("/jobs", jobsRouter);

app.listen(8000, () => console.log("Server is listening on port 8000."));
 