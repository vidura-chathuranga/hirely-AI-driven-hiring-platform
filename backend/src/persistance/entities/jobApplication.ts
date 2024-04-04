import mongoose, { mongo } from "mongoose";

const jobApplication = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  answers: {
    type: [String],
    required: true,
  },
  cv: {
    type: String,
    required: true,
  },
  ratings: { type: String },
});

const JobApplication = mongoose.model("JobApplication", jobApplication);

export default JobApplication;
