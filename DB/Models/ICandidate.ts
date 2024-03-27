export interface ICandidate {
  firstName: string;
  lastName:string;
  email:string;
  phone:string;  
  education:string;
  experience:string;
  profile_picture:string;
  role:string;                            
  password:string;
  location:string;
  skills:string[];
  createJWT(): string;
  comparePassword(inputPassword: string): boolean; // Define comparePassword method
  _id?: string;
  createdAt?:Date; 
  updatedAt?:Date;
}
