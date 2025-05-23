import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const regionSchema = new Schema(
  {
    major: { type: String, required: true },
    sub: { type: String, required: true }
  },
  { _id: false }
);

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    region: { type: regionSchema, required: true }
  },
  { timestamps: true }
);
const User = model('User', userSchema);

const recipeSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    prepTime: { type: String, required: true },
    cookTime: { type: String, required: true },
    totalTime: { type: String, required: true },
    servings: { type: String, required: true },
    ingredients: { type: [String], required: true },
    instructions: { type: [String], required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    region: { type: regionSchema, required: true }
  },
  { timestamps: true }
);
const Recipe = model('Recipe', recipeSchema);

export { regionSchema, User, Recipe };
