import { Request, Response } from "express";
import Job from "../../persistance/entities/jobs";

export const getJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await Job.find({});

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).send();
  }
};

export const createJob = async (req: Request, res: Response) => {
  try {
    const { title, location, description, questions } = req.body;

    if (!title || !location || !description) {
      throw new Error("All fields are required");
    }

    const job = await Job.create({ title, location, description, questions });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).send();
  }
};
export const getJobById = async (req: Request, res: Response) => {
  try {
    const { id: jobId } = req.params;

    const job = await Job.findById(jobId);

    res.status(200).json(job);
  } catch (error) {
    res.status(500).send();
  }
};
