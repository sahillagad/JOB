import {
  NextFunction,
  request,
  Request,
  response,
  Response,
  Router,
} from "express";
import authMiddleware from "../Middelwares/authMiddleWare";
import * as JobController from "../Controller/JobController";

const JobRoute: Router = Router();

JobRoute.get(
  "/",
  authMiddleware,
  async (request: Request, response: Response, next: NextFunction) => {
    await JobController.getAllJobController(request, response, next);
  }
);

// Handle logic for creating a new job posting using request body data
JobRoute.post(
  "/create-jobs",
  authMiddleware,
  async (request: Request, response: Response, next: NextFunction) => {
    await JobController.createJobController(request, response, next);
  }
);

JobRoute.get(
  "/:JobId",
  authMiddleware,
  async (request: Request, response: Response, next: NextFunction) => {
    await JobController.getJobController(request, response, next);
  }
);

// put || patch
JobRoute.put(
  "/:JobId",
  authMiddleware,
  async (request: Request, response: Response, next: NextFunction) => {
    await JobController.updateJobController(request, response, next);
  }
);

JobRoute.delete(
  "/:JobId",
  authMiddleware,
  async (request: Request, response: Response, next: NextFunction) => {
    await JobController.deleteJobController(request, response, next);
  }
);

JobRoute.post(
  "/created-by",
  authMiddleware,
  async (request: Request, response: Response, next: NextFunction) => {
    await JobController.getMyCreatedJobs(request, response, next);
  }
);

JobRoute.post(
  "/create-morethanone-jobs",
  authMiddleware,
  async (request: Request, response: Response, next: NextFunction) => {
    await JobController.CreateMoreThanOneJobs(request, response, next);
  }
);

// JOB Stats Filter  || post
JobRoute.post(
  "/job-stats",
  authMiddleware,
  async (request: Request, response: Response, next: NextFunction) => {
    await JobController.getJobStats(request, response, next);
  }
);

// JOB Group  || post
JobRoute.post(
  "/group-job",
  authMiddleware,
  async (request: Request, response: Response, next: NextFunction) => {
    await JobController.getGroupJob(request, response, next);
  }
);

// JOB Group  || post
JobRoute.post(
  "/group-WorkType-job",
  authMiddleware,
  async (request: Request, response: Response, next: NextFunction) => {
    await JobController.getGroupWorkTypeJob(request, response, next);
  }
);

// JOB Group  || post
JobRoute.post(
  "/group-type-job/:type",
  authMiddleware,
  async (request: Request, response: Response, next: NextFunction) => {
    await JobController.getGroupTypeJob(request, response, next);
  }
);

JobRoute.post(
  "/monthly-job-created",
  authMiddleware,
  async (request: Request, response: Response, next: NextFunction) => {
    await JobController.getJobMonthlyCreated(request, response, next);
  }
);

JobRoute.post(
  "/searching-status",
  authMiddleware,
  async (request: Request, response: Response, next: NextFunction) => {
    // await JobController.getSearchingStatus(request,response,next);
    await JobController.getSearchingStatus1(request, response, next);
  }
);

JobRoute.post(
  "/searching-position",
  authMiddleware,
  async (request: Request, response: Response, next: NextFunction) => {
    await JobController.getSearchingPosition(request, response, next);
  }
);


JobRoute.post(
  "/sort-key",
  authMiddleware,
  async (request: Request, response: Response, next: NextFunction) => {
    await JobController.getsortingJob(request, response, next);
  }
);


JobRoute.post(
  "/getSortCraetedAt_position",
  authMiddleware,
  async (request: Request, response: Response, next: NextFunction) => {
    await JobController.getSortCraetedAt_position(request, response, next);
  }
);


JobRoute.post(
  "/pagination",
  authMiddleware,
  async (request: Request, response: Response, next: NextFunction) => {
    await JobController.getPagination(request, response, next);
  }
);





export default JobRoute;
