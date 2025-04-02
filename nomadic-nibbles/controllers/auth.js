import { User, Recipe } from "../models/user.js";
import bcrypt from "bcrypt";

export const getSignUp = (req, res) => {
  res.render("auth/sign-up");
};

export const getSignIn = (req, res) => {
  res.render("auth/sign-in");
};

export const registerUser = async (req, res) => {
  if (req.body.password !== req.body.confirmPassword) return res.send("Password and Confirm Password must match");
  const userInDB = await User.findOne({ username: req.body.username });
  if (userInDB) return res.send("Username already taken.");
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  const user = await User.create({
    username: req.body.username,
    password: hashedPassword,
    region: { major: req.body.majorRegion, sub: req.body.subRegion }
  });
  req.session.user = { _id: user._id, username: user.username };
  req.session.save(() => {
    res.redirect("/profile");
  });
};

export const loginUser = async (req, res) => {
  const userInDatabase = await User.findOne({ username: req.body.username });
  if (!userInDatabase) return res.send("Login failed. Please try again.");
  const validPassword = bcrypt.compareSync(req.body.password, userInDatabase.password);
  if (!validPassword) return res.send("Login failed. Please try again.");
  req.session.user = { _id: userInDatabase._id, username: userInDatabase.username };
  req.session.save(() => {
    res.redirect("/profile");
  });
};

export const signOutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.session.user._id;
    const profileUser = await User.findById(userId);
    if (!profileUser) return res.status(404).send("User not found");
    const recipes = await Recipe.find({ author: profileUser._id });
    res.render("profile", { profileUser, recipes, user: req.session.user });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const profileUser = await User.findById(userId);
    if (!profileUser) return res.status(404).send("User not found");
    const recipes = await Recipe.find({ author: profileUser._id });
    res.render("profile", { profileUser, recipes, user: req.session.user });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
