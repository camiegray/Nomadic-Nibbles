import "dotenv/config";
import mongoose from "mongoose";
import chalk from "chalk";

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("Error: MONGODB_URI is not defined in your environment variables.");
  process.exit(1);
}

mongoose.connect(uri, {
  tls: true,
  connectTimeoutMS: 30000
}).catch((err) => {
  console.error(`Error connecting to MongoDB: ${err.message}`);
});

mongoose.connection.on("disconnected", () => {
  console.log(chalk.bold("Disconnected from MongoDB!"));
});

mongoose.connection.on("error", (err) => {
  console.error(chalk.red(`MongoDB connection error: ${err.message}`));
});

export default mongoose.connection;
