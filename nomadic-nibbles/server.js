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
const PORT = process.env.PORT || "3000";

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(logger("dev"));
app.set("view engine", "ejs");
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  })
);
app.use(passUserToView);
app.use(express.static("public"));
app.use("/assets", express.static("assets"));

app.use("/", router);

db.on("connected", () => {
  console.clear();
  console.log(chalk.blue(`Connected to MongoDB ${db.name}.`));

app.listen(PORT, '::', () => {
    console.log(chalk.green(`The express app is ready on port ${PORT}!`));
  });
});
