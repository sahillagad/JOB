import { Request, Response, Router } from "express";

//Router Object
//Routing aLL Functionality Come In The UserRoute
const UserRoute:Router=Router();


/*
 * @usage  : get all Users, 
 * @method : Get
 * @url    : http://localhost:9000/users/
 * @param  : no-params
 * @access :PUBLIC
 */
UserRoute.post("/",async(request:Request,response:Response)=>{
})



export default UserRoute;