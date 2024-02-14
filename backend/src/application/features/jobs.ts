import { Request, Response, NextFunction } from "express";
import Job from "../../persistance/entities/jobs";
import NotFoundError from "../../domain/errors/not-found-error";

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
    const { title, location, description, questions } = req.body;

    if (!title || !location || !description) {
      throw new Error("All fields are required");
    }

    const job = await Job.create({ title, location, description, questions });

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
