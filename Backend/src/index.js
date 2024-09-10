import app from "./app.js";
import databaseConnect from "./db/connection.db.js";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../.env"), // in this i used __dirname to get exact path rather than relative path to access env data
});


const PORT = process.env.PORT || 5000;

databaseConnect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error while connecting to the database", error);
  });


