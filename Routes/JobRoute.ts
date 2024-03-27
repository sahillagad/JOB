import { NextFunction, request, Request, Response, Router } from "express";
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


JobRoute.post('/create-morethanone-jobs',authMiddleware,async(request:Request,response:Response,next:NextFunction)=>{
   await JobController.CreateMoreThanOneJobs(request,response,next)
})



export default JobRoute;
