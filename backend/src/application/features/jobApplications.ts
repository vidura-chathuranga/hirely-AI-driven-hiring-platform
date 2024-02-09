import { Request, Response } from "express";
import JobApplication from "../../persistance/entities/jobApplication";

export const createJobApplication = async (req: Request, res: Response) => {
  try {
    const { userId, fullName, job, answers, ratings } = req.body;

    if (!userId || !fullName || !job || !answers || !ratings) {
      throw new Error("All fields are required");
    }
    const createdApplication = await JobApplication.create({
      userId,
      fullName,
      job,
      answers,
      ratings,
    });

    res.status(201).json(createdApplication);
  } catch (error: any) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

export const getAllJobApplications = async (req: Request, res: Response) => {
  try {
    const jobApplications = await JobApplication.find({}).populate("job");

    res.status(200).json(jobApplications);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};

export const getJobApplicationById = async (req: Request, res: Response) => {
  try {
    const { id: jobApplicationId } = req.params;

    const jobApplication = await JobApplication.findById(
      jobApplicationId
    ).populate("job");

    res.status(200).json(jobApplication);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};
