import express from "express";
import {
  createJob,
  getJobById,
  getJobs,
  deleteJob,
  getJobsByAdminId,
} from "../application/features/jobs";
import AuthorizationMiddleware from "./middlewares/AuthorizationMiddleware";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const jobsRouter = express.Router();

jobsRouter
  .route("/")
  .get(getJobs)
  .post(ClerkExpressRequireAuth({}), AuthorizationMiddleware, createJob);
jobsRouter
  .route("/:id")
  .get(ClerkExpressRequireAuth({}), getJobById)
  .delete(ClerkExpressRequireAuth({}), AuthorizationMiddleware, deleteJob);
jobsRouter.get("/admin/:id", getJobsByAdminId);
export default jobsRouter;
