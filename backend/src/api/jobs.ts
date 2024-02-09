import express from "express";
import { createJob, getJobById, getJobs } from "../application/features/jobs";

const jobsRouter = express.Router();

jobsRouter.route("/").get(getJobs).post(createJob);
jobsRouter.route("/:id").get(getJobById);

export default jobsRouter;
