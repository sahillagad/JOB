import { NextFunction, request, Request, Response, Router } from "express";
import * as CandidateController from "../Controller/CandidateController";
import { body } from "express-validator";
import authMiddleware from "../Middelwares/authMiddleWare";
//Router Object
//Routing aLL Functionality Come In The UserRoute
const CandidateRoute: Router = Router();

/*
 * @usage  : Create Candidate
 * @method : Post
 * @url    : http://localhost:9000/register/
 * @param  : no-params
 * @access :PUBLIC
 */
CandidateRoute.post(
  "/register",

  [
    body("firstName").not().isEmpty().withMessage("please enter firstName"),
    body("email")
      .not()
      .isEmpty()
      .withMessage("please enter email proper formate"),
    body("phone")
      .not()
      .isEmpty()
      .withMessage("please enter mobile proper formate"),
    body("password")
      .isStrongPassword()
      .withMessage("Please Enter Strong Password")
      .not()
      .isEmpty()
      .withMessage("please enter password proper formate"),
  ],
  async (request: Request, response: Response, next: NextFunction) => {
    await CandidateController.registerController(request, response, next);
  }
);

/*
 * @usage  : Login
 * @method : Post
 * @url    : http://localhost:9000/login/
 * @param  : no-params
 * @access : PUBLIC
 */
CandidateRoute.post(
  "/login",
  [
    body("email")
      .not()
      .isEmpty()
      .withMessage("please enter email proper formate"),
    body("password")
      .isStrongPassword()
      .withMessage("Please Enter Strong Password")
      .not()
      .isEmpty()
      .withMessage("please enter password proper formate"),
  ],
  async (request: Request, response: Response, next: NextFunction) => {
    await CandidateController.loginController(request, response, next);
  }
);

// GET USER
/*
 * @usage  : GET
 * @method : Post
 * @url    : http://localhost:9000/candidate/${candidateId}`
 * @param  : no-params
 * @access : PUBLIC
 */
CandidateRoute.get("/:candidateId",authMiddleware,async(request:Request,response:Response,next:NextFunction)=>{
  await CandidateController.getController(request,response,next);
})






/*
 * @usage  : UPDATE
 * @method : Post
 * @url    : http://localhost:9000/login/
 * @param  : no-params
 * @access : PUBLIC
 */

// UPDATE USER
CandidateRoute.post("/update-user",authMiddleware,async(request:Request,response:Response,next:NextFunction)=>{
   await CandidateController.updateController(request,response,next);
})



export default CandidateRoute;
