import db from "./db/connection.js";
import { User, Recipe } from "./models/user.js";
import bcrypt from "bcrypt";

// Define regions with subregions
const regions = {
  Asia: ["East Asia", "South Asia", "Southeast Asia", "Central Asia", "Western Asia"],
  Europe: ["Northern Europe", "Southern Europe", "Eastern Europe", "Western Europe"],
  Africa: ["North Africa", "Sub-Saharan Africa"],
  Americas: ["North America", "South America", "Central America", "Caribbean"],
  Oceania: ["Australia & New Zealand", "Melanesia", "Micronesia", "Polynesia"]
};

// Helper function: get random element from an array
const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedData = async () => {
  try {
    // Drop the database first
    await db.dropDatabase();
    console.log("Database dropped");

    // Create 10 users
    const userData = [];
    for (let i = 1; i <= 10; i++) {
      // Choose a random home region for each user
      const majorRegions = Object.keys(regions);
      const homeMajor = randomChoice(majorRegions);
      const homeSub = randomChoice(regions[homeMajor]);
      userData.push({
        username: `user${i}`,
        password: bcrypt.hashSync("password", 10), // All users have password "password"
        region: { major: homeMajor, sub: homeSub }
      });
    }

    const users = await User.create(userData);
    console.log("Users created:", users.map(u => u.username));

    // For each user, create 2 recipes:
    // Recipe 1: from user's home region.
    // Recipe 2: from a random region (major) different from user's home region.
    const recipeData = [];
    users.forEach((user) => {
      // Recipe 1: home region
      recipeData.push({
        title: `Home Recipe of ${user.username}`,
        ingredients: ["ingredient1", "ingredient2", "ingredient3"],
        instructions: "Mix and cook for 20 minutes.",
        region: user.region, // same as user's region
        author: user._id
      });
      // Recipe 2: random region different from user's home major
      const otherMajors = Object.keys(regions).filter((major) => major !== user.region.major);
      const randomMajor = randomChoice(otherMajors);
      const randomSub = randomChoice(regions[randomMajor]);
      recipeData.push({
        title: `World Recipe of ${user.username}`,
        ingredients: ["ingredientA", "ingredientB", "ingredientC"],
        instructions: "Combine all ingredients and simmer.",
        region: { major: randomMajor, sub: randomSub },
        author: user._id
      });
    });

    const recipes = await Recipe.create(recipeData);
    console.log("Recipes created:", recipes.map(r => r.title));

    console.log("Seeding complete!");
  } catch (err) {
    console.error("Error seeding data:", err);
  } finally {
    await db.close();
    console.log("Database connection closed");
  }
};

seedData();
