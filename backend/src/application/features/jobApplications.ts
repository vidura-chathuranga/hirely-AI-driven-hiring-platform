import { NextFunction, Request, Response } from "express";
import JobApplication from "../../persistance/entities/jobApplication";
import NotFoundError from "../../domain/errors/not-found-error";
import { generateRating } from "./ratings";
import Job from "../../persistance/entities/jobs";
import sendShortListMail from "../../utils/sendEmail";
import sendEmail from "../../utils/sendEmail";

export const createJobApplication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, fullName, job, answers, ratings } = req.body;

    if (!userId || !fullName || !job || !answers) {
      throw new Error("All fields are required");
    }

    const convertedAnswerObj = JSON.parse(answers);

    const createdApplication = await JobApplication.create({
      userId,
      fullName,
      job,
      answers: convertedAnswerObj,
      ratings,
      cv: req.file?.path,
    });
    // call to the generateRating method
    await generateRating(createdApplication._id);
    res.status(201).json(createdApplication);
  } catch (error: any) {
    console.log(error.message);
    next(error);
  }
};

export const getAllJobApplications = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const jobApplications = await JobApplication.find({}).populate("job");

    res.status(200).json(jobApplications);
  } catch (error) {
    next(error);
  }
};

export const getJobApplicationByJobId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: jobId } = req.params;

    const jobApplications = await JobApplication.find({ job: jobId });

    res.status(200).json(jobApplications);
  } catch (error) {
    next(error);
  }
};

export const getJobApplicationById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: jobApplicationId } = req.params;

    const jobApplication = await JobApplication.findById(
      jobApplicationId
    ).populate("job");

    if (!jobApplication) {
      throw new NotFoundError("Job application not found");
    }
    res.status(200).json(jobApplication);
  } catch (error: any) {
    console.log(error.message);
    next(error);
  }
};

export const sendShortListedEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // get applicationId
  const { id: applicationId } = req.params;
  const { fullName, jobId, email } = req.body;
  try {
    //get the job details from DB
    const job = await Job.findById(jobId);

    if (!job) {
      throw new NotFoundError("Job does not exists");
    }

    // update job application status
    const updatedApplication = await JobApplication.findByIdAndUpdate(
      applicationId,
      {
        status: "SHORTLISTED",
      },
      { new: true }
    );

    // call to email sending function
    sendEmail(email, fullName, job.title, "SHORTLISTED");

    // send success message along with data
    res
      .status(200)
      .json({ message: "Email was sent", application: updatedApplication });
  } catch (error) {
    next(error);
  }
};

export const sendRejectedEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // get applicationId
  const { id: applicationId } = req.params;
  const { fullName, jobId, email } = req.body;
  try {
    //get the job details from DB
    const job = await Job.findById(jobId);

    if (!job) {
      throw new NotFoundError("Job does not exists");
    }

    // update job application status
    const updatedApplication = await JobApplication.findByIdAndUpdate(
      applicationId,
      {
        status: "REJECTED",
      },
      { new: true }
    );

    // call to email sending function
    sendEmail(email, fullName, job.title, "REJECTED");

    // send success message along with data
    res
      .status(200)
      .json({ message: "Email was sent", application: updatedApplication });
  } catch (error) {
    next(error);
  }
};
