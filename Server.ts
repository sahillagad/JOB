// Import Packages
import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

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

// Express Use For Craete Server
// Express Functionality Come With app
// Rest Object
const app: Application = express();


// Middleware 
app.use(express.json()); // Json Suppot
app.use(cors()); // cors rule fallow (cors enable we use cors -> frontend and backend Connect )


//  morgan add for which api call that dtails
app.use(morgan('dev'))


// app.use("/api/v1/users", UsersRoute);


const databaseName: string | undefined =
  process.env.EXPRESS_MONGO_DB_DATABASE_NAME;
const databaseUrl: string | undefined = process.env.EXPRESS_MONGO_DB_CLOUD_URL;

// Route
// First URL End Point , callback function in that Requet ,respones parameter
// request Take From User
// response send Response To User
app.get("/", (request: Request, response: Response) => {
  response.send("Express Server is Started");
});

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
