import { Request, Response } from "express";
import Job from "../../persistance/entities/jobs";

export const getJobs = async (req: Request, res: Response) => {
  try {
    const jobs = [
      {
        _id: "xyz",
        title: "Intern - Software Engineer",
        type: "Full-time",
        location: "Remote",
      },
      {
        _id: "abc",
        title: "Software Engineer",
        type: "Full-time",
        location: "Remote",
      },
    ];
    return res.status(200).json(jobs);
  } catch (error) {
    return res.status(500).send();
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
