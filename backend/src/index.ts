import "dotenv/config";
import express from "express";
import connectDB from "./persistance/db";
import jobsRouter from "./api/jobs";
import jobAppplicationRouter from "./api/jobApplications";

const app = express();

app.use(express.json());

// connect to the database
connectDB();

app.use("/jobs", jobsRouter);
app.use("/jobApplications", jobAppplicationRouter);


app.listen(8000, () => console.log("Server is listening on port 8000."));
