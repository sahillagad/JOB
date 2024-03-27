import { log } from "console";
import { body } from "express-validator";
import { NextFunction, Request, request, response, Response } from "express";

import mongoose from "mongoose";
import { ICandidate } from "../DB/Models/ICandidate";
import CandidateTable from "../DB/Schemas/CandidateSchema";
import { IJob } from "../DB/Models/IJob";
import JobTable from "../DB/Schemas/JobSchema";
import moment from "moment";

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
        { new: true, runValidators: true } // validateor add / excute attime od update
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

export const getMyCreatedJobs = async (
  request: any,
  response: Response,
  next: NextFunction
) => {
  let candidateId = request.candidate.candidateId;

  if (candidateId) {
    let jobs: any = await JobTable.find({ createdby: candidateId });

    if (jobs) {
      response.status(200).json({
        totalJob: jobs.length,
        jobs: jobs,
      });
    } else {
      next("Data Not Found");
    }
  } else {
    next("My Created Jobs Not Find Due To Some Error");
  }
};

export const CreateMoreThanOneJobs = async (
  request: any,
  response: Response,
  next: NextFunction
) => {
  let candidateId = request.candidate.candidateId.toString();

  let Jobs: IJob[] | undefined | null = request.body;

  if (Jobs) {
    let arrayJobs: IJob[] | undefined | null = [];
    for (var i = 0; i < Jobs.length; i++) {
      Jobs[i].createdby = candidateId;
      let TheJob: IJob | undefined | null = await JobTable.create(Jobs[i]);

      arrayJobs.push(TheJob);
    }
    if (arrayJobs.length === Jobs.length) {
      response.status(200).json({
        message: "Jobs Created Successfully",
        success: true,
        job: arrayJobs,
      });
    } else {
      next("Something Went Wrong");
    }
  } else {
    next("Jobs Not Created");
  }
};

export const getJobStats = async (
  request: any,
  response: Response,
  next: NextFunction
) => {
  // Multipal qery in Object From
  let stats = await JobTable.aggregate([
    // Search By User Jobs
    {
      //        $match: Bases WE Want query Excute
      $match: {
        createdby: new mongoose.Types.ObjectId(request.candidate.candidateId),
      },
    },
  ]);

  response.status(200).json({
    totalJob: stats.length,
    jobs: stats,
  });
};

export const getGroupJob = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let groupJobs = await JobTable.aggregate([
    {
      //   Here Mention Which Base You Want Group
      $group: {
        _id: `$status`,
        count: { $sum: 1 },
      },
    },
  ]);

  //  default Status
  const defaultStats = {
    inactive: 0,
    suspended: 0,
    active: 0,
  };

  for (var i = 0; i < groupJobs.length; i++) {
    if (groupJobs[i]?._id == "inactive") {
      defaultStats.inactive = groupJobs[i]?.count;
    } else if (groupJobs[i]?._id == "suspended") {
      defaultStats.suspended = groupJobs[i]?.count;
    } else if (groupJobs[i]?._id == "active") {
      defaultStats.active = groupJobs[i]?.count;
    }
  }

  response.status(200).json({
    defaultStats,
  });
};

/*

{
    "groupJobs": [
        {
            "_id": "inactive",
            "count": 1
        },
        {
            "_id": "suspended",
            "count": 1
        },
        {
            "_id": "active",
            "count": 82
        }
    ]
}
*/

export const getGroupWorkTypeJob = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let groupJobs = await JobTable.aggregate([
    {
      //   Here Mention Which Base You Want Group
      $group: {
        _id: `$workType`,
        count: { $sum: 1 },
      },
    },
  ]);

  response.status(200).json({
    groupJobs,
  });
};

export const getGroupTypeJob = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let type = request.params.type;

  let groupJobs = await JobTable.aggregate([
    {
      //   Here Mention Which Base You Want Group
      $group: {
        _id: "$" + type,
        count: { $sum: 1 },
      },
    },
  ]);

  response.status(200).json({
    groupJobs,
  });
};

// Monthly Yearly Created
export const getJobMonthlyCreated = async (
  request: any,
  response: Response,
  next: NextFunction
) => {
  let monthlyApplication: any = await JobTable.aggregate([
    {
      $match: {
        createdby: new mongoose.Types.ObjectId(request.candidate.candidateId),
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
  ]);

  monthlyApplication = monthlyApplication.map((application: any) => {
    const { _id, count } = application;
    let { year, month } = _id;

    const date = moment()
      .month(month - 1)
      .year(year)
      .format("MM-y");
    return { date, count };
  });
  response.status(200).json({
    data: monthlyApplication,
  });
};

export const getSearchingStatus = async (
  request: any,
  response: Response,
  next: NextFunction
) => {
  // query param get
  const { status, workType } = request.query;

  // condiation for searching filters
  // query Excute and Search Result Show

  //  1st query string create
  // after that mention which bases you want perform  query string /query Object

  //  after queryObject
  // write logic of filter
  // here status is inactive ,suspended  ,active in backend But Front End We Show FouR option
  // inactive ,suspended  ,active  , all
  //  here all come if he want look  all Job status does not matter (He Want View All Status Job)

  // If Status receive Than Only  check
  // If Status Recive And Status Not All Than Only If Block Run and as per status filter Option Excute
  // Other Wise It will Run Else block
  let jobs: IJob[] | undefined | null = [];
  if (status && status !== "all") {
    if (workType && workType !== "all") {
      jobs = await JobTable.find({ status: status, workType: workType });
    } else {
      jobs = await JobTable.find({ status: status });
    }
  } else {
    if (workType && workType !== "all") {
      jobs = await JobTable.find({ workType: workType });
    } else {
      jobs = await JobTable.find();
    }
  }

  response.status(200).json({
    totalJob: jobs.length,
    jobs: jobs,
  });
};

export const getSearchingStatus1 = async (
  request: any,
  response: Response,
  next: NextFunction
) => {
  // query param get
  const { status, workType, title } = request.query;

  // condiation for searching filters
  // query Excute and Search Result Show

  //  1st query string create
  // after that mention which bases you want perform  query string /query Object
  let queryObject: any = {
    createdby: request.candidate.candidateId,
  };

  //  after queryObject
  // write logic of filter
  // here status is inactive ,suspended  ,active in backend But Front End We Show FouR option
  // inactive ,suspended  ,active  , all
  //  here all come if he want look  all Job status does not matter (He Want View All Status Job)

  // If Status receive Than Only  check
  // If Status Recive And Status Not All Than Only If Block Run and as per status filter Option Excute
  // Other Wise It will Run Else block

  if (workType && workType !== "all") {
    queryObject.workType = workType;
  }
  if (status && status !== "all") {
    queryObject.status = status;
  }
  if (title) {
    queryObject.title = { $regex: title, $options: "i" };
  }

  let jobs: IJob[] | undefined | null = await JobTable.find(queryObject);

  response.status(200).json({
    totalJob: jobs.length,
    jobs: jobs,
  });
};

export const getSearchingPosition = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let search: any = request.query.search;

  let jobs: IJob[] | undefined | null = [];

  if (search) {
    //  $regex:search value
    //  $options:'i' case insansitive
    jobs = await JobTable.find({ position: { $regex: search, $options: "i" } });
    console.log(jobs);
  } else {
    jobs = await JobTable.find();
  }

  response.status(200).json({
    totalJob: jobs.length,
    jobs: jobs,
  });
};

/*  
 Sorting Various Type 
 A to Z
 Z to A
 Latest to Old
 old to Latest

You can adjust the sorting order (1 for ascending, -1 for descending) 
and the field by which you want to sort according to your specific requirements.
 */

export const getsortingJob = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let { key, sort } = request.query;
  console.log(request.query);

  let jobs: IJob[] | undefined | null = [];
  if (sort) {
    if (sort == "ascending") {
      // sort function Give By Moongodb
      jobs = await JobTable.find().sort(`${key}`);
    } else if (sort == "descending") {
      jobs = await JobTable.find().sort(`-${key}`);
    }
    // else {
    //   jobs=await JobTable.find();
    // }
    // console.log(jobs);
  } else {
    jobs = await JobTable.find();
  }

  response.status(200).json({
    totaljob: jobs.length,
    jobs: jobs,
  });
};

export const getSortCraetedAt_position = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let { sort } = request.query;

  let jobs: IJob[] | undefined | null = [];

  if (sort === "latest") {
    jobs = await JobTable.find().sort("-createdAt");
  } else if (sort === "oldest") {
    jobs = await JobTable.find().sort("createdAt");
  } else if (sort === "a-z") {
    jobs = await JobTable.find().sort("position");
  } else if (sort === "z-a") {
    jobs = await JobTable.find().sort("-position");
  }

  response.status(200).json({
    totaljob: jobs.length,
    jobs: jobs,
  });
};

export const getPagination = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  //  Pagination Value Add AS Per You
  //  initial Page One
  //  Page Number And Limit Get From User
  const page = Number(request.query.page) || 1;
  const limit = Number(request.query.limit) || 10;

  //  page change than previous Page Data WE Not Want
  const skip = (page - 1) * limit;

  // skip /limit  function get from moongodb

  let Jobs: IJob[] | undefined | null = await JobTable.find().skip(skip).limit(limit);
  // const totalJob: any = Jobs.length;
  const totalJob: any =await JobTable.countDocuments(Jobs); // count total  job as per job array

  // number Of Job
  const numOfPages = Math.ceil(totalJob / limit);

  response.status(200).json({
    totaljobInDataBase: totalJob,
    numberOfPages: numOfPages,
    cureentPageNumberOfJob:Jobs.length,
    currentPage:page,
    jobs: Jobs,

  });
};
