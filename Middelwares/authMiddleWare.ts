import { NextFunction, Request, Response } from "express";
import JWT from "jsonwebtoken";

// Create Array Function
// async function make
// Middleware than we use here request , response , next
//  try catch we use liabrary but here we use
const authMiddleware = async (
  request: any,
  response: Response,
  next: NextFunction
) => {
    
 // Header ANd Body section body section visiable Part and Header present token 

  // token is present In Header
  // in that section token present in that
  // header section behind seen it is need for work

  // when call api that time we pass token

  // get token from header and  store one veriable
  // authorization token is present
  //   .startsWith("") is besic javascript function
  //  check it start Bearer or not
  const authHeader: string | undefined = request.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    next("Authentication failed");
  } else {
    const token = authHeader.split(" ")[1];
    //  array give split ["Breaer", "Token Value"]
    // get that we give index 1 (ONE) it will give  token
   
    try {
        
        // data is under payload 
        if(process.env.JWT_SECRET){

        // Verifiy Token     
        const payload:any =JWT.verify(token,process.env.JWT_SECRET)

        // console.log(request);
        

         // check 
         request.candidate={candidateId:payload?.candidateId}
        //  console.log(request.candidate)
        //  console.log({candidateId:payload.candidateId})

      next();
        }
        else{
            next("Authentication failed due to some error")            
        }
    } catch (error) {
        next("Authentication failed")
    }


  }
};

export default authMiddleware;