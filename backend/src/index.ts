import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./persistance/db";
import jobsRouter from "./api/jobs";
import jobAppplicationRouter from "./api/jobApplications";
import globalErrorHandlerMiddleware from "./api/middlewares/global-error-handling-middleware";
import path from "path";

const app = express();
// register the cors middleware
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect to the database
connectDB();

// log all the requests that comming to the backend
app.use((req, res, next) => {
  console.log(`${req.method} =====> ${req.path}`);
  next();
});

console.log(path.join(__dirname, "../../uploads"));

// make upload folder static
app.use("/uploads", express.static(path.join(__dirname, "../../uploads")));

app.use("/api/jobs", jobsRouter);
app.use("/api/jobApplications", jobAppplicationRouter);

// register error middleswares
app.use(globalErrorHandlerMiddleware);

app.listen(8000, () => console.log("Server is listening on port 8000."));
