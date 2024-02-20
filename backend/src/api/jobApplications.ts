import express from "express";
import {
  createJobApplication,
  getAllJobApplications,
  getJobApplicationById,
  getJobApplicationByJobId,
} from "../application/features/jobApplications";

const jobAppplicationRouter = express.Router();

jobAppplicationRouter
  .route("/")
  .post(createJobApplication)
  .get(getAllJobApplications);

jobAppplicationRouter.route("/job/:id").get(getJobApplicationByJobId);
jobAppplicationRouter.route("/:id").get(getJobApplicationById);

export default jobAppplicationRouter;
