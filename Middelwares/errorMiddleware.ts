import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
// Here Create Custom Middleware
// error Middleware || Next Function
// error Middleware || Next Function  condition true than it will excute

// Middleware give Two Thing err,next
// err  -> show specific Error Show
// next -> further excute or not
// const errorMiddleware:ErrorRequestHandler  = (
//   err: any,
//   request: any,
//   response: any,
//   next: any
// ) => {
//   console.log(err.stack);

//   response.status(500).json({
//     message: "Something Went wrong",
//     success: false,
//     error: err,
//   });
// };

// export default errorMiddleware;

// filr By File by  Use
// Server.ts ny use
// use in server.ts

// // CASE 2

// const errorMiddleware: ErrorRequestHandler = (
//   err: any,
//   request: Request,
//   response: Response,
//   next: any
// ) => {
//   // Reusable Object
//   const defaultError = {
//     statusCode: 500,
//     message:err,
//   };

// //   console.log( defaultError);

//   // Missing Field Error
//   // Error type We Check
//   if (err.name === "ValidatorError") {
//     defaultError.statusCode = 400;
//     defaultError.message = Object.values(err.errors).map((iteam:any)=>iteam?.message).join(',')
//     console.log( defaultError);
//   }

//   response.status(defaultError.statusCode).json({message:defaultError.message});

// };

// export default errorMiddleware;

// const errorMiddleware = (
//   err: any,
//   request: Request,
//   response: Response,
//   next: NextFunction
// ) => {
//     console.log(err);
//   response.status(500).json({
//     message: "Something Went wrong",
//     success: false,
//     error: err,
//   });
// };

// export default errorMiddleware;

import mongoose from "mongoose"; // Import mongoose

const errorMiddleware = (
  err: any,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log(err);

  // Default error response
  const defaultError = {
    statusCode: err.statusCode || 500,
    message: "Something went wrong",
    success: false,
    error: err,
  };



  //Invalid JSON
  if (err.type === "entity.parse.failed") {
    defaultError.statusCode = 400; // Bad Request
    defaultError.message = "Invalid JSON payload";
    defaultError.error = "Please provide a valid JSON payload";
  }



  // If the error is a ValidatorError from Mongoose
  if (err instanceof mongoose.Error.ValidationError) {
    defaultError.statusCode = 400; // Bad Request
    defaultError.message = "Validation Error";

    // Error Object in that Varoius Value
    // Get All error message & send

    let errorArray = [];
    for (const field in err.errors) {
      if (err.errors.hasOwnProperty(field)) {
        errorArray.push(err.errors[field].message);
      }
    }
    defaultError.error = errorArray.join(",");
  }

  // Duplicate key error
  if (err.code && err.code === 11000) {
    defaultError.statusCode = 400; // Bad Request
    defaultError.message = "Duplicate key error";
    defaultError.error = `${Object.keys(err.keyValue)} Field has to be uniqe`;
  }



  // Send response
  response.status(defaultError.statusCode).json(defaultError);
};

export default errorMiddleware;
