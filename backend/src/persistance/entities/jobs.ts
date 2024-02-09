import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  questions: {
    type: [String],
    default: ["Question 1", "Question 2", "Question 3"],
  },
});

const Job = mongoose.model("Job", jobSchema);

export default Job;
