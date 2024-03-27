import bcryptjs from "bcryptjs";
// Import Packages
import express, { Application, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import "express-async-errors";
import jwt from "jsonwebtoken";
// Import File
import connectDB from "./DB/Uitillis/DBUtill";

// Import .env
// configuare .env
// create Object Path Key And enter Path
dotenv.config({ path: "./.env" });
// .env not give port than
let port: any = process.env.PORT || 8080;

// Color Terminal
// set theme
import colors from "colors";
import CandidateRoute from "./Routes/CandidateRoute";
import errorMiddleware from "./Middelwares/errorMiddleware";
import authMiddleware from "./Middelwares/authMiddleWare";
import JobRoute from "./Routes/JobRoute";

// Express Use For Craete Server
// Express Functionality Come With app
// Rest Object
const app: Application = express();

// Security package
import helmet from "helmet";
app.use(helmet()); // help To Heaer Seaction Sequre

// Security cross site scripting attack
// import xss from "xss-clean";
// app.use(xss());

// Security  express-mongo-sanitize
// Secure MonogoDB
import expressmongosanitize from "express-mongo-sanitize";
app.use(expressmongosanitize());

// IP ADDRESS LIMIT
import { rateLimit } from "express-rate-limit";

// IP limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes access
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});

app.use(limiter);

// Middleware
app.use(express.json()); // Json Suppot
app.use(cors()); // cors rule fallow (cors enable we use cors -> frontend and backend Connect )

//  morgan add for which api call that dtails
app.use(morgan("dev"));

app.use("/api/v1/candidate", CandidateRoute);
app.use("/api/v1/Job", JobRoute);

const databaseName: string | undefined =
  process.env.EXPRESS_MONGO_DB_DATABASE_NAME;
const databaseUrl: string | undefined = process.env.EXPRESS_MONGO_DB_CLOUD_URL;

// Route
// First URL End Point , callback function in that Requet ,respones parameter
// request Take From User
// response send Response To User
app.get("/", async (request: Request, response: Response) => {
  response.json({ message: "Express Server is Started" });
});

app.all("*", (request: Request, response: Response, next: NextFunction) => {
  next(`Can't find ${request.originalUrl} on this server!`);
});

// Errror Middleware Connect
app.use(errorMiddleware);

if (port) {
  app.listen(Number(port), () => {
    if (databaseName && databaseUrl) {
      connectDB(databaseName, databaseUrl)
        .then((result: any) => {
          //    console.log(databaseName +" "+databaseUrl);
          console.log(result);
        })
        .catch((err: any) => {
          console.error(err);
          //   If Error Is Come You Stop Your Whole Application
          process.exit(1); //FORCE EXIT /Force Exit express server
        });
    }

    console.log(`Express Server is Started at http://localhost:${port}`);
  });
}
