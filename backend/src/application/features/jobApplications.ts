import { NextFunction, Request, Response } from "express";
import JobApplication from "../../persistance/entities/jobApplication";
import NotFoundError from "../../domain/errors/not-found-error";
import { generateRating } from "./ratings";

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
    const createdApplication = await JobApplication.create({
      userId,
      fullName,
      job,
      answers,
      ratings,
    });

    // call to the generateRating method
    await generateRating(createdApplication._id);

    res.status(201).json(createdApplication);
  } catch (error : any) {
    console.log(error.message)
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
  } catch (error) {
    next(error);
  }
};
