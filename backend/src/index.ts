import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./persistance/db";
import jobsRouter from "./api/jobs";
import jobAppplicationRouter from "./api/jobApplications";

const app = express();
// register the cors middleware
app.use(cors());

app.use(express.json());

// connect to the database
connectDB();

// log all the requests that comming to the backend
app.use((req, res, next) => {
  console.log(`${req.method} =====> ${req.path}`);
  next();
});

app.use("/api/jobs", jobsRouter);
app.use("/api/jobApplications", jobAppplicationRouter);

app.listen(8000, () => console.log("Server is listening on port 8000."));
