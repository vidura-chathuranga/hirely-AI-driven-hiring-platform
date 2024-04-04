import express from "express";
import {
  createJobApplication,
  getAllJobApplications,
  getJobApplicationById,
  getJobApplicationByJobId,
  sendRejectedEmail,
  sendShortListedEmail,
} from "../application/features/jobApplications";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import AuthorizationMiddleware from "./middlewares/AuthorizationMiddleware";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const jobAppplicationRouter = express.Router();

jobAppplicationRouter
  .route("/")
  .post(
    ClerkExpressRequireAuth({}),
    upload.single("file"),
    createJobApplication
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

jobAppplicationRouter.put("/:id/accept-email", sendShortListedEmail);
jobAppplicationRouter.put("/:id/reject-email", sendRejectedEmail);

export default jobAppplicationRouter;
