import { NextFunction, Request, request, Response } from "express";
import { validationResult } from "express-validator";
import { ICandidate } from "../DB/Models/ICandidate";
import CandidateTable from "../DB/Schemas/CandidateSchema";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
// export const registerController=async(request:Request,response:Response)=>{
//  try {

//     let error=validationResult(request);
//     if(!error.isEmpty()){
//       return response.status(400).json({
//         message:"Error In Register Controller",
//         success:false,
//         error:error.array()[0].msg
//       })
//      }

//     //  let { firstName,lastName,email,phone,education,experience,profile_picture,password,location,skills}=request.body;

//     //  if(!firstName){
//     //     return response.status(400).send({message:"Please Enter First Name",success:false})
//     //  }
//     //  if(!lastName){
//     //     return response.status(400).send({message:"Please Enter Last Name",success:false})
//     //  }

//      const candidate:ICandidate=request.body;

//      let findCandidate:ICandidate|undefined|null= await CandidateTable.findOne({
//         $and : [
//             { email: candidate.email }, // Check for uniqueness of email
//             { phone: candidate.phone } // Check for uniqueness of phone number
//         ]
//     });

//      if(findCandidate){

//         response.status(200).json({
//             message:"This Phone Number & Email IS already Present In The Your Contact Database",
//             success:false,
//           })

//      }
//      else{

//         let theCandidate:ICandidate|undefined|null=await new CandidateTable<ICandidate>(candidate).save();
//         if(theCandidate){
//             response.status(201).json({
//                 message:"candidate Created Successfully",
//                 success:true,
//                  candidate:theCandidate
//         });
//         }
//         else{
//             response.status(400).json({
//                 message:"Candidate Object Is Not Created",
//                 success:false,
//               })
//         }
//      }

//  } catch (error) {
//      console.log(error);
//      response.status(400).json({
//         message:"Error In Register Controller",
//         success:false,
//         error
//      })
//  }
// }

// CASE 2
// export const registerController = async (
//   request: Request,
//   response: Response,
//   next: NextFunction
// ) => {
//   try {
//     // let error = validationResult(request);
//     // if (!error.isEmpty()) {
//     //   return response.status(400).json({
//     //     message: "Error In Register Controller",
//     //     success: false,
//     //     error: error.array()[0].msg,
//     //   });
//     // }

//      let { firstName,lastName,email,phone,education,experience,profile_picture,password,location,skills}=request.body;

//      if(!firstName){
//         next({message:"Please Enter First Name",success:false});
//      }
//      if(!password){
//         next({message:"Please Enter password",success:false})
//      }
//      if(!email){
//         next({message:"Please email ",success:false})
//      }
//      if(!phone){
//         next({message:"Please phone ",success:false})
//      }
//     const candidate: ICandidate = request.body;

//     let findCandidate: ICandidate | undefined | null =
//       await CandidateTable.findOne({
//         $and: [
//           { email: candidate.email }, // Check for uniqueness of email
//           { phone: candidate.phone }, // Check for uniqueness of phone number
//         ],
//       });

//     if (findCandidate) {
//         next({
//         message:
//           "This Phone Number & Email IS already Present In The Your Contact Database",
//         success: false,
//       });
//     } else {
//       let theCandidate: ICandidate | undefined | null =
//         await new CandidateTable<ICandidate>(candidate).save();
//       if (theCandidate) {
//         response.status(201).json({
//           message: "candidate Created Successfully",
//           success: true,
//           candidate: theCandidate,
//         });
//       } else {
//         response.status(400).json({
//           message: "Candidate Object Is Not Created",
//           success: false,
//         });
//       }
//     }
//   } catch (error) {
//     console.log(error);
//     next(error);

//     // response.status(400).json({
//     //    message:"Error In Register Controller",
//     //    success:false,
//     //    error
//     // })
//   }
// };

// CASE 3

// try and catch remove
// export const registerController = async (
//     request: Request,
//     response: Response,
//     next: NextFunction
//   ) => {

//        let { firstName,lastName,email,phone,education,experience,profile_picture,password,location,skills}=request.body;

//     //    if(!firstName){
//     //       next("Please Enter First Name");
//     //    }
//     //    if(!password){
//     //       next("Please Enter password")
//     //    }
//     //    if(!email){
//     //       next("Please Enter email ")
//     //    }
//     //    if(!phone){
//     //       next("Please Enter phone ")
//     //    }
//       const candidate: ICandidate = request.body;

//       let findCandidate: ICandidate | undefined | null =
//         await CandidateTable.findOne({
//           $and: [
//             { email: candidate.email }, // Check for uniqueness of email
//             { phone: candidate.phone }, // Check for uniqueness of phone number
//           ],
//         });

//     //   if (findCandidate) {
//         //   next(
//         //     "This Phone Number & Email IS already Present In The Your Contact Database",
//         //  );
//     //   } else {
//         let theCandidate: ICandidate | undefined | null =
//           await new CandidateTable<ICandidate>(candidate).save();
//         if (theCandidate) {
//           response.status(201).json({message:"candidate Created Successfully",
//             success: true,
//             candidate: theCandidate,
//           });
//         } else {
//           response.status(400).json( "Candidate Object Is Not Created",
//            );
//         }
//     //   }

//   };

//CASE 4
// Password Protection

export const registerController = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let error = validationResult(request);
  if (!error.isEmpty()) {
    let arrayMessage = [];
    for (let i = 0; i < error.array().length; i++) {
      arrayMessage.push(error?.array()[i]?.msg);
    }

    next(arrayMessage.join(" , "));
  }

  let {
    firstName,
    lastName,
    email,
    phone,
    education,
    experience,
    profile_picture,
    password,
    location,
    skills,
  } = request.body;

  if (!firstName) {
    next("Please Enter First Name");
  }
  if (!password) {
    next("Please Enter password");
  }
  if (!email) {
    next("Please Enter email ");
  }
  if (!phone) {
    next("Please Enter phone ");
  }
  const candidate: ICandidate = request.body;

  let findCandidate: ICandidate | undefined | null =
    await CandidateTable.findOne({
      $and: [
        { email: candidate.email }, // Check for uniqueness of email
        { phone: candidate.phone }, // Check for uniqueness of phone number
      ],
    });

  if (findCandidate) {
    next(
      "This Phone Number & Email IS already Present In The Your Contact Database"
    );
  } else {
    // encrypt the password
    // let salt=await bcrypt.genSalt(15)
    // let hashPassword=await bcrypt.hash(candidate.password,salt);

    // let hashPasswordCandidate={
    //    ...candidate,
    //    password:hashPassword
    // }
    let theCandidate: ICandidate | undefined | null =
      await new CandidateTable<ICandidate>(candidate).save();
    if (theCandidate) {
      // Token
      const token = theCandidate.createJWT();

      let hiddeCandidatePassword = {
        firstName: theCandidate.firstName,
        lastName: theCandidate.lastName,
        email: theCandidate.email,
        phone: theCandidate.phone,
        education: theCandidate.education,
        experience: theCandidate.experience,
        profile_picture: theCandidate.profile_picture,
        location: theCandidate.location,
        skills: theCandidate.skills,
      };

      response.status(201).json({
        message: "candidate Created Successfully",
        success: true,
        candidate: hiddeCandidatePassword,
        JWToken: token,
      });
    } else {
      response.status(400).json("Candidate Object Is Not Created");
    }
  }
};

export const loginController = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let error = validationResult(request);
  if (!error.isEmpty()) {
    let arrayMessage = [];
    for (let i = 0; i < error.array().length; i++) {
      arrayMessage.push(error?.array()[i]?.msg);
    }

    next(arrayMessage.join(" , "));
  }

  // get Password and Email
  let { password, email } = request.body;

  // Validation
  if (!email) {
    next("Please Enter Email");
  }
  if (!password) {
    next("Please Enter Password");
  }

  const candidate: ICandidate | undefined | null = await CandidateTable.findOne(
    { email: email }
  );

  // In Scheme we add select:true than we can hidde password by follwing way use
  //  ICandidate | undefined | null = await CandidateTable.findOne({ email: email }).select('+password');
  // Than Also it will hide password and give Object
  if (candidate) {
    // compare Password

    let isMatch = candidate.comparePassword(password);
    if (isMatch === false) {
      next("Invalid Candidate Email ID or Password");
    } else {
      let hiddeCandidatePassword = {
        firstName: candidate.firstName,
        lastName: candidate.lastName,
        email: candidate.email,
        phone: candidate.phone,
        education: candidate.education,
        experience: candidate.experience,
        profile_picture: candidate.profile_picture,
        location: candidate.location,
        skills: candidate.skills,
      };

      // For More Sequre
      //candidate.password=undifined; than we give password:string|undefined type pass
      candidate.password = "";

      const tokenCreatet = candidate.createJWT();
      response.status(200).json({
        statusCode: 200,
        message: "Login Successful",
        success: true,
        candidate: hiddeCandidatePassword,
        token: tokenCreatet,
      });
    }
  } else {
    next("Invalid Candidate Email ID or Password");
  }
};


export const updateController=async(request: any,response: Response,next: NextFunction)=>{
  
  
  let { firstName,lastName,email,phone,education,experience, profile_picture,location, skills,role} = request.body;
  
 
  // if (!firstName) {
  //   next("Please Enter First Name");
  // }
  // if (!email) {
  //   next("Please Enter email ");
  // }
  // if (!phone) {
  //   next("Please Enter phone ");
  // }
  
  if(!firstName || !email || !phone ){
    next("Plesae Provide All Field")    
  }

  const candidate:ICandidate|null|undefined=await CandidateTable.findOne({"_id":request.candidate.candidateId})
  if(candidate){
    candidate.firstName=firstName;
    candidate.lastName=lastName;
    candidate.email=email;
    candidate.phone=phone;
    candidate.education=education;
    candidate.role=role;
    candidate.experience=experience;
    candidate.profile_picture=profile_picture;
    candidate.location=location;
    candidate.skills=skills;
 
    let mongooseCandidateID=new mongoose.Types.ObjectId(candidate._id)
    let updateCandidate=await CandidateTable.findByIdAndUpdate(mongooseCandidateID,{$set:candidate},{new:true})


    if(updateCandidate){
      const token = updateCandidate.createJWT();
      
      response.status(200).json({
        message: "candidate Updatte Successfully",
        success: true,
        candidate: updateCandidate,
        JWToken: token,
      })

    }
    else{

      next("candidate Updatte Failed")    

    }
 
  }
  else{
    next('Not Found')
  }
}

export const getController=async(request:Request,response:Response,next:NextFunction)=>{
   
  let candidateId=request.params.candidateId;
  if(candidateId){

    let candidate:ICandidate|undefined|null=await CandidateTable.findById(new mongoose.Types.ObjectId(candidateId))
    if(candidate){
      response.status(200).json({
        message: "candidate Get Successfully",
        success: true,
        candidate: candidate,
      })
    }
    else{
      next('Candidate is not Found')
    }
  }
  else{
    next('something went Wrong')
  }
   
}