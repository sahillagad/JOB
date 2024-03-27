import mongoose from "mongoose";
import { IJob } from "../Models/IJob";
import CandidateTable from "./CandidateSchema";

const JobSchema = new mongoose.Schema<IJob>(
  {
    companyName: { type: String, required: [true, "company name Is Required"] },
    location: { type: String, required: [true, "location Is Required"] },
    title: { type: String, required: [true, "Job Title Is Required"] },
    position: {
      type: String,
      required: [true, "Job Position Is Required"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "active",
    },
    workType: {
      type: String,
      enum: ["full-time", "part-time", "intership", "contract"],
      default: "full-time",
    },
    salary: { type: Number },
    description: { type: String, required: true },
    posted_date: { type: String },
    expiration_date: { type: Date },
    createdby : { type: mongoose.Types.ObjectId, ref: CandidateTable },
    is_featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const JobTable = mongoose.model<IJob>("jobs", JobSchema);
export default JobTable;
