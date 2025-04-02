import db from "./db/connection.js";
import { User, Recipe } from "./models/user.js";
import bcrypt from "bcrypt";

// Define realistic user data by subregion with a true dish for each.
const userData = {
  Asia: {
    "East Asia": { username: "Hiroshi Tanaka", dish: "Sushi" },
    "South Asia": { username: "Priya Patel", dish: "Biryani" },
    "Southeast Asia": { username: "Nguyen Van An", dish: "Pho" },
    "Central Asia": { username: "Azamat Yusupov", dish: "Plov" },
    "Western Asia": { username: "Ali Hassan", dish: "Hummus" }
  },
  Europe: {
    "Northern Europe": { username: "Lars Jensen", dish: "Smørrebrød" },
    "Southern Europe": { username: "Antonio Rossi", dish: "Pizza Margherita" },
    "Eastern Europe": { username: "Ivan Ivanov", dish: "Borscht" },
    "Western Europe": { username: "Sophie Dubois", dish: "Coq au Vin" }
  },
  Africa: {
    "North Africa": { username: "Fatima El-Amin", dish: "Couscous" },
    "Sub-Saharan Africa": { username: "Kwame Mensah", dish: "Jollof Rice" }
  },
  Americas: {
    "North America": { username: "Emily Johnson", dish: "Poutine" },
    "South America": { username: "Carlos Mendoza", dish: "Empanadas" },
    "Central America": { username: "Juan Perez", dish: "Gallo Pinto" },
    "Caribbean": { username: "Roxanne Brown", dish: "Jerk Chicken" }
  },
  Oceania: {
    "Australia & New Zealand": { username: "Jack Wilson", dish: "Meat Pie" },
    "Melanesia": { username: "Manaia Tawake", dish: "Laplap" },
    "Micronesia": { username: "Keola Nalu", dish: "Chicken Kelaguen" },
    "Polynesia": { username: "Moana Tui", dish: "Poi" }
  }
};

// Realistic instructions for home dishes.
const homeDishInstructions = {
  "Sushi": "Prepare sushi rice with vinegar, sugar, and salt. Slice fresh fish and assemble nigiri or maki rolls.",
  "Biryani": "Marinate meat with yogurt and spices, layer with partially cooked basmati rice, then slow-cook until fragrant.",
  "Pho": "Simmer beef bones with ginger, onions, and spices for hours. Serve with rice noodles, thinly sliced beef, and fresh herbs.",
  "Plov": "Sauté onions and carrots, add rice and spices, then cook slowly until the rice is fluffy and aromatic.",
  "Hummus": "Blend chickpeas, tahini, lemon juice, garlic, and olive oil until smooth. Garnish with paprika and parsley.",
  "Smørrebrød": "Spread butter on rye bread, then top with cold cuts, cheese, and pickled vegetables.",
  "Pizza Margherita": "Spread tomato sauce on dough, top with mozzarella and basil, then bake in a hot oven until bubbly.",
  "Borscht": "Boil beets, cabbage, and potatoes in a rich broth. Serve hot with a dollop of sour cream and dill.",
  "Coq au Vin": "Slow-cook chicken in red wine with mushrooms, onions, and garlic until tender and flavorful.",
  "Couscous": "Steam couscous and toss with spiced vegetables, chickpeas, olive oil, and lemon juice.",
  "Jollof Rice": "Cook rice in a rich tomato and pepper sauce with spices, stirring in vegetables and protein.",
  "Poutine": "Layer crispy fries with fresh cheese curds and hot savory gravy.",
  "Empanadas": "Fill pastry dough with seasoned meat, fold, and bake until golden.",
  "Gallo Pinto": "Mix rice and beans with sautéed onions, peppers, and spices, then garnish with cilantro.",
  "Jerk Chicken": "Marinate chicken in a blend of scotch bonnet peppers, allspice, thyme, and ginger, then grill until charred.",
  "Meat Pie": "Fill pastry with a savory mix of minced meat, gravy, and vegetables, then bake until the crust is golden.",
  "Laplap": "Mix grated root vegetables and plantains, wrap in banana leaves, and steam until firm.",
  "Chicken Kelaguen": "Toss cooked chicken with lime juice, chopped chili, and shredded coconut, then serve chilled.",
  "Poi": "Mash cooked taro with water until smooth and slightly tangy."
};

// Define second dish options per continent.
const secondDishOptions = {
  Asia: ["Ramen", "Dim Sum", "Bibimbap", "Pad Thai", "Curry Laksa"],
  Europe: ["Sauerbraten", "Paella", "Pierogi", "Moussaka", "Ratatouille"],
  Africa: ["Tagine", "Bobotie", "Egusi Soup", "Injera", "Suya"],
  Americas: ["Ceviche", "Churrasco", "Clam Chowder", "Tamales", "Lobster Roll"],
  Oceania: ["Hangi", "Pavlova", "Lamingtons", "Anzac Biscuits", "Kumara Fries"]
};

// Realistic instructions for second dishes.
const secondDishInstructions = {
  "Ramen": "Simmer pork or chicken broth for several hours, then serve with noodles, sliced pork, a soft-boiled egg, and scallions.",
  "Dim Sum": "Prepare a variety of steamed dumplings filled with shrimp, pork, or vegetables. Serve with soy sauce.",
  "Bibimbap": "Arrange steamed rice in a bowl topped with assorted sautéed vegetables, a fried egg, and a dollop of gochujang. Mix before eating.",
  "Pad Thai": "Stir-fry rice noodles with shrimp, tofu, bean sprouts, and eggs. Toss with tamarind sauce and garnish with peanuts.",
  "Curry Laksa": "Simmer a spicy coconut broth with curry paste, then add rice noodles, shrimp, and tofu. Garnish with cilantro.",
  "Sauerbraten": "Marinate beef in vinegar and spices, slow-cook with onions and carrots, then serve with a robust gravy.",
  "Paella": "Sauté onions, garlic, and tomatoes; add rice, saffron, seafood, and chicken; cook until the rice develops a crispy base.",
  "Pierogi": "Fill dumpling dough with mashed potatoes and cheese, boil until tender, then pan-fry in butter with onions.",
  "Moussaka": "Layer eggplant with spiced ground lamb and a creamy béchamel sauce, then bake until the top is golden.",
  "Ratatouille": "Slow-simmer eggplant, zucchini, bell peppers, and tomatoes with garlic and herbs until a thick stew forms.",
  "Tagine": "Slow-cook meat and vegetables with cumin, coriander, and cinnamon in a traditional tagine until tender.",
  "Bobotie": "Mix spiced minced meat with dried fruit and a custard topping, bake until set, and serve with chutney.",
  "Egusi Soup": "Cook ground melon seeds with leafy greens and meat in a thick, spicy broth until flavors meld.",
  "Injera": "Prepare a sourdough flatbread fermented from teff flour, used as an edible plate for hearty stews.",
  "Suya": "Skewer thin slices of spiced beef and grill until charred, then serve with sliced onions and tomatoes.",
  "Ceviche": "Marinate fresh fish in lime juice with sliced onions, cilantro, and chili until the fish turns opaque.",
  "Churrasco": "Grill marinated beef to perfection, slice thinly, and serve with a vibrant chimichurri sauce.",
  "Clam Chowder": "Simmer clams, potatoes, and onions in a creamy broth seasoned with thyme and bay leaves.",
  "Tamales": "Fill masa dough with spiced meat, wrap in corn husks, and steam until the dough is tender.",
  "Lobster Roll": "Toss fresh lobster meat with a light lemon dressing, then serve in a toasted, buttered bun.",
  "Hangi": "Slow-cook meat and root vegetables in an earth oven until tender and infused with smoky flavor.",
  "Pavlova": "Bake a meringue base until crisp outside yet soft inside, then top with whipped cream and fresh fruit.",
  "Lamingtons": "Cube sponge cake, dip in chocolate glaze, then roll in desiccated coconut.",
  "Anzac Biscuits": "Mix oats, coconut, golden syrup, and butter, shape into cookies, and bake until crisp.",
  "Kumara Fries": "Cut sweet potatoes into fries, toss with olive oil and spices, then bake until crispy."
};

const availableSecondDishes = {
  Asia: [...secondDishOptions.Asia],
  Europe: [...secondDishOptions.Europe],
  Africa: [...secondDishOptions.Africa],
  Americas: [...secondDishOptions.Americas],
  Oceania: [...secondDishOptions.Oceania]
};

const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomSecondDish = (homeContinent) => {
  const continents = Object.keys(availableSecondDishes).filter(
    (continent) => continent !== homeContinent && availableSecondDishes[continent].length > 0
  );
  if (continents.length === 0) {
    throw new Error("No available second dish options for non-home continents.");
  }
  const chosenContinent = randomChoice(continents);
  const dish = availableSecondDishes[chosenContinent].shift();
  return { continent: chosenContinent, dish };
};

const seedData = async () => {
  try {
    // Wait for the connection to be open
    await new Promise((resolve, reject) => {
      if (db.readyState === 1) return resolve();
      db.once("open", resolve);
      db.on("error", reject);
    });
    console.log("MongoDB connection established.");

    await db.dropDatabase();
    console.log("Database dropped");

    // Build user objects for every subregion.
    const usersArr = [];
    for (const major in userData) {
      for (const sub in userData[major]) {
        const entry = userData[major][sub];
        usersArr.push({
          username: entry.username,
          password: bcrypt.hashSync("password", 10),
          region: { major, sub }
        });
      }
    }

    const users = await User.create(usersArr);
    console.log("Users created:", users.map(u => u.username));

    // Create recipes.
    const recipesArr = [];
    users.forEach((user) => {
      // Recipe 1: Home dish using realistic instructions.
      const homeDish = userData[user.region.major][user.region.sub].dish;
      const homeInstructions = homeDishInstructions[homeDish] || "Follow traditional methods.";
      recipesArr.push({
        title: `${user.username}'s Traditional Dish: ${homeDish}`,
        ingredients: ["Ingredient1", "Ingredient2", "Ingredient3"],
        instructions: homeInstructions,
        region: user.region,
        author: user._id
      });

      // Recipe 2: Second dish from a random continent (different from user's home continent).
      const second = getRandomSecondDish(user.region.major);
      const secondDishName = second.dish;
      const secondInstructions = secondDishInstructions[secondDishName] || "Prepare according to local traditions.";
      recipesArr.push({
        title: `${user.username}'s ${secondDishName} Special`,
        ingredients: ["IngredientA", "IngredientB", "IngredientC"],
        instructions: secondInstructions,
        region: { major: second.continent, sub: secondDishName },
        author: user._id
      });
    });

    const recipes = await Recipe.create(recipesArr);
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
