import "dotenv/config";
import express from "express";
import db from "./db/connection.js";
import MongoStore from "connect-mongo";
import methodOverride from "method-override";
import logger from "morgan";
import chalk from "chalk";
import session from "express-session";
import router from "./routes/index.js";
import passUserToView from "./middleware/pass-user-to-view.js";

const app = express();

const PORT = process.env.PORT ? process.env.PORT : "3000";

// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride("_method"));
// Morgan for logging HTTP requests
app.use(logger("dev"));
// Set View Engine to ejs templating
app.set("view engine", "ejs");
// Configure session based Auth
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
);
// Pass user to locals object middleware
app.use(passUserToView);

app.use("/", router);

db.on("connected", () => {
  console.clear();
  console.log(chalk.blue(`Connected to MongoDB ${db.name}.`));
  app.listen(PORT, () => {
    console.log(chalk.green(`The express app is ready on port ${PORT}!`));
  });
});
