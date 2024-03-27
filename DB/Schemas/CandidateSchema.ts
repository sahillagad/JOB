import mongoose from "mongoose";
import { ICandidate } from "../Models/ICandidate";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

const CandidateSchema = new mongoose.Schema<ICandidate>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, default: "" },
    email: {
      type: String,
      required: [true, "Email is Require"],
      unique: true,
      validate: {
        validator: (value: string) => {
          return validator.isEmail(value);
        },
        message: "Invalid email address",
      },
    },
    phone: {
      type: String,
      required: [true, "Phone is Require"],
      unique: true,
      validate: {
        validator: function (value: any) {
          return validator.isMobilePhone(value, "en-IN");
        },
        message: "Invalid Indian mobile number",
      },
    },
    role:{type:String,enum:['employer','applicant'],required:[true,"Please Enter Role"],default:'applicant'},
    skills: { type: [String], default: [] },
    education: { type: String, default: "" },
    experience: { type: String, default: "" },
    profile_picture: { type: String, default: "" },
    password: {
      type: String,
      required: true,
      validate: validator.isStrongPassword,
      select: true, /// Hide Password  when want show that ti e select passsword
    },
    location: { type: String, default: "India" },
  },
  { timestamps: true }
);

// middleware create
// With Help Moongose
// pre use  Pre-hooks are functions that are executed before or after a particular action,
// save method we target
// save we want excute this function than only data save
// normal function use
CandidateSchema.pre("save", async function () {
 

  // // If modified or not check
  if(!this.isModified){
    return 
  }

  let salt = await bcrypt.genSalt(10);
  // target password this.password
  this.password = await bcrypt.hash(this.password, salt);
  // hash method use target hashing password
});

// middleware Verifiy Password /Comapre Password
CandidateSchema.methods.comparePassword = async function (
  inputPassword: string
): Promise<boolean> {
  // Comapare Password With Input pASSWORD and Password In Database
  const isMatch = await bcrypt.compare(inputPassword, this.password);
  return isMatch;
};

// JOSN WEBTOKEN CREATE
// User scheme use create function
// CandidateSchema.methods it will provide by moongose
// with this we create method
// any  name give we give method / function
// here we give  createJWT name to the Function / Method
// array functions not work here thats why we use normal function
//
// Jwt.sign() in this method we pass Object first mention what is payload in that we pass user id
// userId:this._id the this._id come with mongodb automatic generated
// after that we add secret key
// this secret key we first write In .env file For Security purpose
// JWT_SECRET="" // this length more and random value taht Much it will sequre
// vtqLTnUORCRCcmUQpmYuc4l5EdRrd0Q9bQvHwG2RSuI8Go2Ehr2ghYcYO6AJ
// random value generated add in JWT_SECRET key
// Afer that we mantion validity Of Token
// this  we store in local storage
//  after that compare tocken and we allowed route / api
CandidateSchema.methods.createJWT = function () {
  if (process.env.JWT_SECRET) {
    return JWT.sign({candidateId: this._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
  }
};

const CandidateTable = mongoose.model<ICandidate>(
  "candidates",
  CandidateSchema
);

export default CandidateTable;
