import { Recipe } from "../models/user.js";

export const index = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("author");
    res.render("recipes/index", { recipes });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export const show = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate("author");
    if (!recipe) return res.status(404).send("Recipe not found");
    res.render("recipes/show", { recipe });
  } catch (err) {
    console.error(err);
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
    if (!recipe.author.equals(req.session.user._id))
      return res.status(403).send("Not authorized");
    res.render("recipes/edit", { recipe });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export const create = async (req, res) => {
  try {
    const { title, description, prepTime, cookTime, totalTime, servings, ingredients, instructions } = req.body;
    const recipe = new Recipe({
      title,
      description,
      prepTime,
      cookTime,
      totalTime,
      servings,
      ingredients,
      instructions,
      author: req.session.user._id,
      region: { major: req.body.majorRegion, sub: req.body.subRegion }
    });
    await recipe.save();
    res.redirect(`/recipes/${recipe._id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export const update = async (req, res) => {
  try {
    const { title, description, prepTime, cookTime, totalTime, servings, ingredients, instructions } = req.body;
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).send("Recipe not found");
    if (!recipe.author.equals(req.session.user._id))
      return res.status(403).send("Not authorized");
    recipe.title = title;
    recipe.description = description;
    recipe.prepTime = prepTime;
    recipe.cookTime = cookTime;
    recipe.totalTime = totalTime;
    recipe.servings = servings;
    recipe.ingredients = ingredients;
    recipe.instructions = instructions;
    recipe.region = { major: req.body.majorRegion, sub: req.body.subRegion };
    await recipe.save();
    res.redirect(`/recipes/${recipe._id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export const remove = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).send("Recipe not found");
    if (!recipe.author.equals(req.session.user._id))
      return res.status(403).send("Not authorized");
    await recipe.remove();
    res.redirect("/recipes");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export const searchByRegion = async (req, res) => {
  try {
    const { major, sub } = req.query;
    let query = {};
    if (major && major.trim() !== "") query["region.major"] = major;
    if (sub && sub.trim() !== "") query["region.sub"] = sub;
    const recipes = await Recipe.find(query).populate("author");
    res.render("recipes/searchByRegion", { recipes, major, sub });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
