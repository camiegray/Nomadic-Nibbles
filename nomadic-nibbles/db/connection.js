import "dotenv/config";
import mongoose from "mongoose";
import chalk from "chalk";

mongoose.set("returnOriginal", false);

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("Error: MONGODB_URI is not defined in your environment variables.");
  process.exit(1);
}

mongoose.connect(uri).catch((err) => {
  console.log(`Error connecting to MongoDB: ${err.message}`);
});

mongoose.connection.on("disconnected", () => {
  console.log(chalk.bold("Disconnected from MongoDB!"));
});

mongoose.connection.on("error", (err) => {
  console.log(chalk.red(`MongoDB connection error: ${err.message}`));
});

export default mongoose.connection;
