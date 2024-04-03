import { Request, Response, NextFunction } from "express";
import Job from "../../persistance/entities/jobs";
import NotFoundError from "../../domain/errors/not-found-error";
import UnauthorizedError from "../../domain/errors/unauthorized-error";

export const getJobs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const jobs = await Job.find({});

    res.status(200).json(jobs);
  } catch (error) {
    next(error);
  }
};

export const createJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, location, description, questions, type, userId } = req.body;

    console.log(userId);
    // validate the user
    if (!userId) {
      throw new UnauthorizedError("Unauthorized access");
    }
    if (!title || !location || !description || !type) {
      throw new Error("All fields are required");
    }

    const job = await Job.create({
      title,
      location,
      description,
      questions,
      type,
      userId,
    });

    res.status(201).json(job);
  } catch (error) {
    next(error);
  }
};
export const getJobById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
      throw new NotFoundError("Job not found");
    }
    res.status(200).json(job);
  } catch (error) {
    next(error);
  }
};

// delete job controller
export const deleteJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // get the job ID that needs to upload
  const { id: jobId } = req.params;

  try {
    // find the Id from DB and delete it
    const deletedJob = await Job.findByIdAndDelete(jobId, { new: true });

    if (!deletedJob) {
      throw new NotFoundError("Job not found, please try again");
    }

    res.status(200).json({ message: "Job deleted successfully", deletedJob });
  } catch (error) {
    next(error);
  }
};

export const getJobsByAdminId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // get the user id from params
    const { id: AdminId } = req.params;

    // get jobs details to relevent admin
    const jobs = await Job.find({ userId: AdminId });

    // send data to the FR
    res.status(200).json(jobs);
  } catch (error) {
    next(error);
  }
};
