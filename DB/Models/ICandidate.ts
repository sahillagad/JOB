export interface IUser {
  firstName: string;
  lastName:string;
  email:string;
  phone:string;  
  education:string;
  experience:string;
  profile_picture:string;                            
  password:string;
  location:string;
  _id?: string;
  createdAt?:Date; 
  updatedAt?:Date;
}
