// @ts-nocheck
import OpenAI from "openai";
import JobApplication from "../../persistance/entities/jobApplication";
import { NextFunction } from "express";

const client = new OpenAI({ apiKey: process.env.OPEN_AI_KEY });

export const generateRating = async (jobApplicationId) => {
  //   fetch the job application details with job data
  const {
    job: { title },
    answers,
  } = await JobApplication.findById(jobApplicationId).populate("job");

  const content = `Role: ${title}, User Description: ${answers.join(". ")}`;

  const completion = await client.chat.completions.create({
    messages: [{ role: "user", content }],
    model: process.env.LLM_MODEL_ID,
  });

  const response = JSON.parse(completion?.choices[0].message?.content); //response = {"rate" : "Good" | "Bad" | "Moderate"}

  if (!response.rate) {
    return;
  }

  //   update the rating field in relevent job application
  await JobApplication.findByIdAndUpdate(jobApplicationId, {
    ratings: response.rate,
  });
};
