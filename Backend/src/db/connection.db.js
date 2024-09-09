import dotenv from "dotenv";
import mongoose from "mongoose";
import { db_name } from "../constants.js";

dotenv.config({
    path: "../../.env"
});



const databaseConnect =  async () => {
  try {
    const connection_result = await mongoose.connect(
      `${process.env.MONOGODB_URI}/${db_name}`
    );
    console.log("Database connected successfully at : " ,connection_result.connection.host);
    
  } catch (error) {
    console.log("Error while connecting to the database", error);
  }
}

export default databaseConnect;