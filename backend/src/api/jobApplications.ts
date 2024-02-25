import express from "express";
import {
  createJobApplication,
  getAllJobApplications,
  getJobApplicationById,
  getJobApplicationByJobId,
} from "../application/features/jobApplications";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import AuthorizationMiddleware from "./middlewares/AuthorizationMiddleware";

const jobAppplicationRouter = express.Router();

jobAppplicationRouter
  .route("/")
  .post(ClerkExpressRequireAuth({}), createJobApplication)
  .get(
    ClerkExpressRequireAuth({}),
    AuthorizationMiddleware,
    getAllJobApplications
  );

jobAppplicationRouter
  .route("/job/:id")
  .get(
    ClerkExpressRequireAuth({}),
    AuthorizationMiddleware,
    getJobApplicationByJobId
  );
jobAppplicationRouter
  .route("/:id")
  .get(
    ClerkExpressRequireAuth({}),
    AuthorizationMiddleware,
    getJobApplicationById
  );

export default jobAppplicationRouter;
