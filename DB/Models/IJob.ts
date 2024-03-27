import { Types } from "mongoose";

export interface IJob{
    companyName:string
    location:string
    title:string;
    position:string;
    status:string;
    workType:string;
    salary:number;               
    description:string;
    posted_date?:string;
    expiration_date?:string;                
    createdby:string | Types.ObjectId |undefined;
    is_featured:boolean;
    _id?: string // Mongodb is _id  and at create Id We Not Pass
    createdAt?:Date; // It By Default Maintain By Appication
    updatedAt?:Date;// It By Default Maintain By Appication
}