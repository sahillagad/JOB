import mongoose from "mongoose";
import colors from "colors";

const connectDB=async(databaseName: string, dataBaseUrl: string):Promise<string|any>=>{
    try {
        const connection =await mongoose.connect(dataBaseUrl, { dbName: databaseName });
        return `Connected To MongoDB Database ${mongoose.connection.host}`
    } catch (error) {
        return `MongoDB Error : {error}`;
        
    }
}

export default connectDB

//  or 

// import mongoose from "mongoose";

// export class DBUtil {

//    // what database Connect And What Is url OF  that Database
//   public static async connectToDB(databaseName: string, dataBaseUrl: string): Promise<string> {
    
//     // Connect IS Function 
//     try {
//       await mongoose.connect(dataBaseUrl, { dbName: databaseName });
    
//       // If It Is Success Than It will Give This Message with promise 
//       return "Database Connection Successful";
    
//     } catch (error) {
      
//       // If It Is Rejected Than It will Give This Message with promise
//       return "Database Connection Faild"
//     }
//   }
// }