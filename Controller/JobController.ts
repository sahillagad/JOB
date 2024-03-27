import { log } from 'console';
import { body } from "express-validator";
import { NextFunction, Request, request, response, Response } from "express";

import mongoose from "mongoose";
import { ICandidate } from "../DB/Models/ICandidate";
import CandidateTable from "../DB/Schemas/CandidateSchema";
import { IJob } from "../DB/Models/IJob";
import JobTable from "../DB/Schemas/JobSchema";

export const createJobController = async (
  request: any,
  response: Response,
  next: NextFunction
) => {
  let { title, position, description } = request.body;

  if (!title || !position || !description) {
    next("Please Provide All Fieled");
  }

  const candidateID = request.candidate.candidateId;
  let findCandidate: ICandidate | null | undefined =
    await CandidateTable.findById(new mongoose.Types.ObjectId(candidateID));

  if (findCandidate) {
    if (findCandidate.role === "employer") {
      let jobCreate: IJob = {
        companyName: request.body.companyName,
        location: request.body.location,
        title: request.body.title,
        position: request.body.position,
        status: request.body.status,
        workType: request.body.workType,
        salary: request.body.salary,
        description: request.body.description,
        posted_date: new Date().toLocaleDateString(),
        expiration_date: request.body.expiration_date,
        createdby: candidateID,
        is_featured: false,
      };
      const theJob: IJob | undefined | null = await JobTable.create(jobCreate);

      response.status(201).json({
        theJob,
      });
    } else {
      next("Not Authorised");
    }
  } else {
    next("Not Found");
  }
};

export const getJobController = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let JobId = request.params.JobId;
  const findJob: IJob | undefined | null = await JobTable.findById(
    new mongoose.Types.ObjectId(JobId)
  );

  if (findJob) {
    response.status(200).json({
      findJob,
    });
  } else {
    next("Job Not Found");
  }
};

export const getAllJobController = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let JobId = request.params.JobId;
  const findJobs: IJob[] | undefined | null = await JobTable.find();
  if (findJobs) {
    response.status(200).json({
      totalJob: findJobs.length,
      findJobs,
    });
  } else {
    next("Jobs Not Found");
  }
};

export const updateJobController = async (
  request: any,
  response: Response,
  next: NextFunction
) => {
  let JobId = request.params.JobId;
  const findJob: IJob | undefined | null = await JobTable.findById(
    new mongoose.Types.ObjectId(JobId)
  );

  if (findJob) {
    let candidateID = request.candidate.candidateId;

    if (candidateID === findJob.createdby?.toString()) {
      let updateJob: IJob = {
        companyName: request.body.companyName,
        location: request.body.location,
        title: request.body.title,
        position: request.body.position,
        status: request.body.status,
        workType: request.body.workType,
        salary: request.body.salary,
        description: request.body.description,
        posted_date: new Date().toLocaleDateString(),
        expiration_date: request.body.expiration_date,
        createdby: candidateID,
        is_featured: false,
      };

      let theJob: IJob | undefined | null = await JobTable.findByIdAndUpdate(
        new mongoose.Types.ObjectId(JobId),
        { $set: updateJob },
        { new: true,runValidators:true } // validateor add / excute attime od update
      );

      if (updateJob) {
        response.status(200).json({
          message: "Job Updatte Successfully",
          success: true,
          job: theJob,
        });
      } else {
        next("Update Job Failed");
      }
    } else {
      next("Not Authorised To Update");
    }
  } else {
    next("Job Not Found");
  }
};

export const deleteJobController = async (
  request: any,
  response: Response,
  next: NextFunction
) => {
  let JobId = request.params.JobId;
  const findJob: IJob | undefined | null = await JobTable.findById(
    new mongoose.Types.ObjectId(JobId)
  );

  if (findJob) {
    let candidateID = request.candidate.candidateId;

    if (candidateID === findJob.createdby?.toString()) {
      let theJob: IJob | undefined | null = await JobTable.findByIdAndDelete(
        new mongoose.Types.ObjectId(JobId)
      );
      // console.log(theJob); // It is Give Object Of Delete Job

      if (theJob) {
        response.status(200).json({
          message: "Job Delete Successfully",
          success: true,
          job: {},
        });
      } else {
        next("delete Job Failed");
      }
    } else {
      next("Not Authorised To delete");
    }
  } else {
    next("Job Not Found");
  }
};

export const getMyCreatedJobs=async(request:any,response:Response,next:NextFunction)=>{
  
   let candidateId= request.candidate.candidateId
     
   if(candidateId){

     let jobs:any =await JobTable.find({'createdby':candidateId})
      
      if(jobs){
          response.status(200).json({
            "totalJob":jobs.length,
            "jobs":jobs
          })
      }
      else{
         next('Data Not Found')
      }
   }
   else{
     next('My Created Jobs Not Find Due To Some Error')
   }
}


export const CreateMoreThanOneJobs=async(request:any,response:Response,next:NextFunction)=>{
   let candidateId=request.candidate.candidateId.toString();
   
   let Jobs:IJob[]|undefined|null=request.body;

   if(Jobs){

    let arrayJobs:IJob[]|undefined|null=[]
    for(var i=0;i<Jobs.length;i++){
      Jobs[i].createdby=candidateId;
      let TheJob:IJob|undefined|null=await JobTable.create(Jobs[i])
      
      arrayJobs.push(TheJob);
    }
        if(arrayJobs.length ===Jobs.length ){
            response.status(200).json({
              message: "Jobs Created Successfully",
              success: true,
              job: arrayJobs,
            })
        }
        else{
          next('Something Went Wrong')
        }
   }
   else{
     next('Jobs Not Created')
   }

}