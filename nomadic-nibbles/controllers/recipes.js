import { Recipe } from "../models/user.js";

export const index = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("author");
    res.render("recipes/index", { recipes });
  } catch (err) {
    console.error("Error fetching recipes:", err);
    res.status(500).send("Server Error");
  }
};

export const show = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate("author");
    if (!recipe) return res.status(404).send("Recipe not found");
    res.render("recipes/show", { recipe });
  } catch (err) {
    console.error("Error fetching recipe:", err);
    res.status(500).send("Server Error");
  }
};

export const newForm = (req, res) => {
  res.render("recipes/new");
};

export const editForm = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).send("Recipe not found");
    if (!recipe.author.equals(req.user._id))
      return res.status(403).send("Not authorized to edit this recipe");
    res.render("recipes/edit", { recipe });
  } catch (err) {
    console.error("Error fetching edit form:", err);
    res.status(500).send("Server Error");
  }
};

export const create = async (req, res) => {
  try {
    console.log("Create recipe payload:", req.body);
    const { title, ingredients, instructions, majorRegion, subRegion } = req.body;
    if (!title || !ingredients || !instructions || !majorRegion || !subRegion)
      return res.redirect("/recipes/new");
    const ingArray = Array.isArray(ingredients)
      ? ingredients
      : ingredients.split(",").map(i => i.trim()).filter(i => i.length > 0);
    const newRecipe = new Recipe({
      title,
      ingredients: ingArray,
      instructions,
      region: { major: majorRegion, sub: subRegion },
      author: req.user._id
    });
    await newRecipe.save();
    res.redirect(`/recipes/${newRecipe._id}`);
  } catch (err) {
    console.error("Error creating recipe:", err);
    res.status(500).send("Server Error");
  }
};

export const update = async (req, res) => {
  try {
    const { title, ingredients, instructions, majorRegion, subRegion } = req.body;
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).send("Recipe not found");
    if (!recipe.author.equals(req.user._id))
      return res.status(403).send("Not authorized to edit this recipe");
    if (title) recipe.title = title;
    if (ingredients)
      recipe.ingredients = Array.isArray(ingredients)
        ? ingredients
        : ingredients.split(",").map(i => i.trim());
    if (instructions) recipe.instructions = instructions;
    if (majorRegion && subRegion)
      recipe.region = { major: majorRegion, sub: subRegion };
    await recipe.save();
    res.redirect(`/recipes/${recipe._id}`);
  } catch (err) {
    console.error("Error updating recipe:", err);
    res.status(500).send("Server Error");
  }
};

export const remove = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).send("Recipe not found");
    if (!recipe.author.equals(req.user._id))
      return res.status(403).send("Not authorized to delete this recipe");
    await recipe.remove();
    res.redirect("/recipes");
  } catch (err) {
    console.error("Error deleting recipe:", err);
    res.status(500).send("Server Error");
  }
};
export const searchByRegion = async (req, res) => {
  try {
    const { major, sub } = req.query;
    let query = {};
    if (major && major.trim() !== "") {
      query["region.major"] = major;
    }
    if (sub && sub.trim() !== "") {
      query["region.sub"] = sub;
    }
    const recipes = await Recipe.find(query).populate("author");
    res.render("recipes/searchByRegion", { recipes, major, sub });
  } catch (err) {
    console.error("Error searching by region:", err);
    res.status(500).send("Server Error");
  }
};
