import mongoose from "mongoose";
import chalk from "chalk";

mongoose.set("returnOriginal", false);

mongoose.connect(process.env.MONGODB_URI).catch((err) => {
  console.log(`Error connection to MongoDB: ${err.message}`);
});

mongoose.connection.on("disconnected", () => {
  console.log(chalk.bold("Disconnected from MongoDB!"));
});

mongoose.connection.on("error", (err) => {
  console.log(chalk.red(`MongoDB connection error: ${err.message}`));
});

export default mongoose.connection;
