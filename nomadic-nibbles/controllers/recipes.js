// controllers/recipes.js
import { Recipe } from '../models/user.js';

export const index = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('author');
    res.render('recipes/index', { recipes });
  } catch (err) {
    console.error("Error fetching recipes:", err);
    res.status(500).send("Server Error");
  }
};

export const show = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('author');
    if (!recipe) return res.status(404).send("Recipe not found");
    res.render('recipes/show', { recipe });
  } catch (err) {
    console.error("Error fetching recipe:", err);
    res.status(500).send("Server Error");
  }
};

export const create = async (req, res) => {
  try {
    const { title, ingredients, instructions, regionName } = req.body;
    if (!title || !ingredients || !instructions || !regionName) {
      return res.redirect('/recipes/new');
    }
    const newRecipe = new Recipe({
      title,
      ingredients: Array.isArray(ingredients)
        ? ingredients
        : ingredients.split(',').map(i => i.trim()),
      instructions,
      region: { name: regionName },
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
    const { title, ingredients, instructions, regionName } = req.body;
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).send("Recipe not found");
    if (!recipe.author.equals(req.user._id)) return res.status(403).send("Not authorized to edit this recipe");
    if (title) recipe.title = title;
    if (ingredients) {
      recipe.ingredients = Array.isArray(ingredients)
        ? ingredients
        : ingredients.split(',').map(i => i.trim());
    }
    if (instructions) recipe.instructions = instructions;
    if (regionName) recipe.region = { name: regionName };
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
    res.redirect('/recipes');
  } catch (err) {
    console.error("Error deleting recipe:", err);
    res.status(500).send("Server Error");
  }
};
