// models/user.js
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const regionSchema = new Schema({
  name: { type: String, required: true }
}, { _id: false }); // _id is disabled for nested documents

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  region: { type: regionSchema, required: true }  // embedded region schema
}, { timestamps: true });
const User = model('User', userSchema);

const recipeSchema = new Schema({
  title: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  region: { type: regionSchema, required: true }  // embedded region schema
}, { timestamps: true });
const Recipe = model('Recipe', recipeSchema);

export { regionSchema, User, Recipe };
