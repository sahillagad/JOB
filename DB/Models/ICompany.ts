export interface ICompany{
  name:string;
  industry:string;
  location:string;
  logo:string;
  website:string;
  founded_date:string;
  description:string;
  email:string;
  phone:string;                              
  _id?: string;
  createdAt?:Date; 
  updatedAt?:Date;
}