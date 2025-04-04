import db from "./db/connection.js";
import { User, Recipe } from "./models/user.js";
import bcrypt from "bcrypt";

// -------------------------
// 1. User Data & Home Dishes
// -------------------------
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

// -------------------------------
// 2. Detailed Home Dish Recipe Mapping
// -------------------------------
const homeDishDetails = {
  "Sushi": {
    description:
      "Fresh, vinegared rice paired with delicately sliced fish—a staple of Japanese cuisine.",
    prepTime: "30 minutes",
    cookTime: "15 minutes",
    totalTime: "45 minutes",
    servings: "2-3 servings",
    ingredients: [
      "1 cup sushi rice",
      "2 tbsp rice vinegar",
      "1 tbsp sugar",
      "1 tsp salt",
      "100g fresh fish, sliced",
      "Assorted vegetables for garnish"
    ],
    instructions: [
      "Rinse sushi rice until water runs clear.",
      "Cook rice using the proper water ratio.",
      "Mix rice vinegar, sugar, and salt until dissolved, then fold into the warm rice.",
      "Slice fresh fish and vegetables uniformly.",
      "Form small mounds of rice and top with a slice of fish.",
      "Serve immediately with soy sauce, wasabi, and pickled ginger."
    ]
  },
  "Biryani": {
    description:
      "A spiced rice dish layered with marinated chicken and aromatic spices, offering a rich taste of India.",
    prepTime: "30 minutes (plus 4 hours marination)",
    cookTime: "1 hour",
    totalTime: "1 hour 30 minutes (plus marination)",
    servings: "4 servings",
    ingredients: [
      "500g chicken thighs",
      "2 cups basmati rice",
      "1 cup yogurt",
      "2 onions, thinly sliced",
      "2 garlic cloves, minced",
      "1 tbsp ginger paste",
      "1 tsp turmeric",
      "1 tsp red chili powder",
      "1 tsp garam masala",
      "2 tbsp ghee",
      "Pinch of saffron infused in 2 tbsp warm milk"
    ],
    instructions: [
      "Marinate chicken in yogurt, ginger-garlic paste, turmeric, red chili powder, and garam masala for at least 4 hours.",
      "Rinse and soak basmati rice for 20 minutes.",
      "Fry thinly sliced onions in ghee until caramelized; reserve some for garnish.",
      "Layer the marinated chicken and partially-cooked rice in a heavy pot.",
      "Drizzle saffron-infused milk over the layers.",
      "Cover tightly and cook on low heat (dum method) for 20–30 minutes.",
      "Fluff the rice gently and serve with raita and lemon wedges."
    ]
  },
  "Pho": {
    description:
      "A fragrant Vietnamese noodle soup with a clear, savory broth and fresh herbs.",
    prepTime: "20 minutes",
    cookTime: "6 hours",
    totalTime: "6 hours 20 minutes",
    servings: "4 servings",
    ingredients: [
      "2 lbs beef bones",
      "1 large onion, halved",
      "1 piece ginger (3 inches), halved",
      "3 star anise",
      "3 cloves",
      "1 cinnamon stick",
      "Fish sauce, to taste",
      "Salt, to taste",
      "200g rice noodles",
      "Fresh herbs, bean sprouts, lime, and chili for garnish"
    ],
    instructions: [
      "Char the onion and ginger under high heat until slightly blackened.",
      "Rinse the charred ingredients and add them to a large pot with beef bones, star anise, cloves, and cinnamon stick.",
      "Cover with water and simmer gently for 6 hours, skimming impurities.",
      "Strain the broth and season with fish sauce and salt.",
      "Prepare rice noodles according to package instructions.",
      "Divide noodles among bowls, top with thinly sliced raw beef and fresh garnishes.",
      "Ladle hot broth over the top and serve immediately."
    ]
  },
  "Plov": {
    description:
      "A hearty Central Asian rice dish featuring tender lamb and aromatic spices.",
    prepTime: "20 minutes",
    cookTime: "1 hour",
    totalTime: "1 hour 20 minutes",
    servings: "4 servings",
    ingredients: [
      "500g lamb, cubed",
      "2 cups basmati rice",
      "1 large onion, diced",
      "2 carrots, diced",
      "1 tsp cumin",
      "1 tsp coriander",
      "1 tsp paprika",
      "2 tbsp oil",
      "Water as needed",
      "Fresh herbs for garnish"
    ],
    instructions: [
      "Heat oil in a heavy pot and sauté diced onions and carrots until soft.",
      "Add lamb cubes and brown on all sides.",
      "Stir in basmati rice and sprinkle in cumin, coriander, and paprika.",
      "Pour in enough water to cover the ingredients.",
      "Simmer until the rice is fluffy and the lamb is tender, about 1 hour.",
      "Fluff with a fork, garnish with fresh herbs, and serve."
    ]
  },
  "Hummus": {
    description:
      "A creamy Middle Eastern dip made from blended chickpeas and tahini, perfect with pita bread.",
    prepTime: "10 minutes",
    cookTime: "0 minutes",
    totalTime: "10 minutes",
    servings: "4 servings",
    ingredients: [
      "1 can chickpeas, drained and rinsed",
      "3 tbsp tahini",
      "Juice of 1 lemon",
      "1 garlic clove, minced",
      "2 tbsp olive oil",
      "Water as needed",
      "Salt, to taste",
      "1 tsp cumin",
      "Paprika and parsley for garnish"
    ],
    instructions: [
      "Combine chickpeas, tahini, lemon juice, garlic, and olive oil in a blender.",
      "Blend until smooth, adding water gradually to achieve desired consistency.",
      "Season with salt and cumin.",
      "Transfer to a bowl, drizzle with olive oil, and garnish with paprika and parsley."
    ]
  },
  "Smørrebrød": {
    description:
      "A traditional Scandinavian open-faced sandwich with a variety of toppings.",
    prepTime: "10 minutes",
    cookTime: "0 minutes",
    totalTime: "10 minutes",
    servings: "1 serving per sandwich",
    ingredients: [
      "2 slices dense rye bread",
      "Butter",
      "Assorted cold cuts",
      "Sliced cheese",
      "Pickles",
      "Fresh herbs for garnish"
    ],
    instructions: [
      "Thinly slice the rye bread if not pre-sliced.",
      "Spread butter evenly over each slice.",
      "Layer with cold cuts, cheese, and pickles.",
      "Garnish with fresh herbs and serve immediately."
    ]
  },
  "Pizza Margherita": {
    description:
      "A classic Italian pizza with fresh tomato sauce, mozzarella, and basil.",
    prepTime: "1 hour 30 minutes (including dough rising time)",
    cookTime: "10-12 minutes",
    totalTime: "1 hour 45 minutes",
    servings: "1 pizza (serves 2-3)",
    ingredients: [
      "1 pizza dough ball",
      "1/2 cup tomato sauce",
      "200g fresh mozzarella, torn",
      "Fresh basil leaves",
      "1 tbsp olive oil",
      "Salt to taste"
    ],
    instructions: [
      "Preheat your oven to 475°F (245°C).",
      "Roll out the pizza dough and let it rise until doubled in size.",
      "Spread tomato sauce evenly over the dough.",
      "Add torn mozzarella and scatter basil leaves on top.",
      "Bake until the crust is crisp and cheese is bubbly, about 10-12 minutes.",
      "Drizzle with olive oil, slice, and serve."
    ]
  },
  "Borscht": {
    description:
      "A hearty Eastern European beet soup, served hot with sour cream and dill.",
    prepTime: "20 minutes",
    cookTime: "1 hour",
    totalTime: "1 hour 20 minutes",
    servings: "4 servings",
    ingredients: [
      "4 cups beef or vegetable broth",
      "2 medium beets, peeled and diced",
      "1/4 head cabbage, shredded",
      "2 potatoes, peeled and cubed",
      "2 carrots, sliced",
      "1 tbsp vinegar",
      "Salt and sugar to taste",
      "Sour cream and fresh dill for serving"
    ],
    instructions: [
      "Bring the broth to a boil in a large pot.",
      "Add diced beets, cabbage, potatoes, and carrots.",
      "Simmer until vegetables are tender, about 1 hour.",
      "Season with vinegar, salt, and a touch of sugar.",
      "Serve hot with a dollop of sour cream and garnish with fresh dill."
    ]
  },
  "Coq au Vin": {
    description:
      "A classic French stew of chicken braised in red wine with bacon, mushrooms, and onions.",
    prepTime: "20 minutes (plus overnight marination)",
    cookTime: "1 hour 30 minutes",
    totalTime: "1 hour 50 minutes (plus marination)",
    servings: "4 servings",
    ingredients: [
      "1kg chicken pieces",
      "2 cups red wine",
      "100g bacon, diced",
      "200g mushrooms, sliced",
      "1 large onion, chopped",
      "2 garlic cloves, minced",
      "Fresh thyme and bay leaves",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Marinate chicken in red wine, garlic, onions, and herbs overnight in the fridge.",
      "Sear the chicken pieces in a hot pot until browned; then remove.",
      "Sauté bacon, mushrooms, and small onions in the same pot.",
      "Return the chicken to the pot, add the marinade, and simmer until tender, about 1.5 hours.",
      "Reduce the sauce slightly and serve with mashed potatoes or crusty bread."
    ]
  },
  "Couscous": {
    description:
      "A light North African dish of steamed couscous mixed with sautéed vegetables and a citrus dressing.",
    prepTime: "15 minutes",
    cookTime: "15 minutes",
    totalTime: "30 minutes",
    servings: "4 servings",
    ingredients: [
      "2 cups couscous",
      "1 zucchini, diced",
      "1 bell pepper, diced",
      "1 carrot, diced",
      "2 garlic cloves, minced",
      "2 tbsp olive oil",
      "Juice of 1 lemon",
      "Salt and pepper to taste",
      "Toasted almonds and parsley for garnish"
    ],
    instructions: [
      "Steam couscous according to package instructions until light and fluffy.",
      "Sauté diced zucchini, bell pepper, carrot, and garlic in olive oil until tender.",
      "Combine the steamed couscous with the sautéed vegetables.",
      "Drizzle with lemon juice, season with salt and pepper.",
      "Garnish with toasted almonds and chopped parsley, then serve."
    ]
  },
  "Jollof Rice": {
    description:
      "A flavorful West African rice dish cooked in a rich tomato and pepper sauce.",
    prepTime: "20 minutes",
    cookTime: "40 minutes",
    totalTime: "1 hour",
    servings: "4 servings",
    ingredients: [
      "2 cups rice",
      "4 tomatoes, blended",
      "1 red bell pepper, blended",
      "1 onion, blended",
      "2 garlic cloves, minced",
      "1 tsp grated ginger",
      "Mixed spices to taste",
      "Oil for sautéing",
      "Fried plantains for garnish"
    ],
    instructions: [
      "Blend tomatoes, red bell pepper, and onion into a smooth sauce.",
      "Heat oil in a pot and sauté minced garlic and ginger until fragrant.",
      "Add the blended sauce and cook for 10 minutes.",
      "Stir in washed rice and add water to cover.",
      "Simmer until rice is cooked and flavors meld together.",
      "Garnish with fried plantains and serve with a side salad."
    ]
  },
  "Poutine": {
    description:
      "A Canadian comfort food featuring crispy fries, fresh cheese curds, and savory gravy.",
    prepTime: "15 minutes",
    cookTime: "20 minutes",
    totalTime: "35 minutes",
    servings: "2-3 servings",
    ingredients: [
      "4 large potatoes, cut into fries",
      "200g cheese curds",
      "2 cups beef or chicken gravy",
      "Oil for frying",
      "Salt to taste"
    ],
    instructions: [
      "Fry or bake the thick-cut potato fries until golden and crispy.",
      "Warm the cheese curds and prepare the gravy.",
      "Layer the fries on a plate, sprinkle with cheese curds, and immediately pour hot gravy over top.",
      "Serve immediately while the cheese is melting."
    ]
  },
  "Empanadas": {
    description:
      "A Latin American pastry filled with a savory beef mixture, perfect as a snack or meal.",
    prepTime: "45 minutes",
    cookTime: "25 minutes",
    totalTime: "1 hour 10 minutes",
    servings: "6-8 empanadas",
    ingredients: [
      "2 cups all-purpose flour",
      "1/2 tsp salt",
      "100g butter, chilled",
      "Cold water as needed",
      "500g ground beef",
      "1 onion, finely chopped",
      "2 garlic cloves, minced",
      "1 tsp cumin",
      "1 tsp paprika",
      "1/2 cup tomato sauce"
    ],
    instructions: [
      "Prepare the dough by mixing flour, salt, and butter. Gradually add cold water until a smooth dough forms; let it rest.",
      "Cook ground beef with chopped onions, garlic, cumin, and paprika until fully cooked; mix in tomato sauce.",
      "Roll out the dough and cut into circles.",
      "Place a spoonful of meat mixture onto each circle, fold and seal the edges.",
      "Bake in a preheated oven at 375°F (190°C) until golden brown, about 25 minutes.",
      "Serve warm."
    ]
  },
  "Gallo Pinto": {
    description:
      "A traditional Central American dish of rice and black beans, seasoned perfectly.",
    prepTime: "15 minutes",
    cookTime: "15 minutes",
    totalTime: "30 minutes",
    servings: "4 servings",
    ingredients: [
      "2 cups cooked rice",
      "1 cup black beans",
      "1 onion, diced",
      "1 bell pepper, diced",
      "1 garlic clove, minced",
      "1 tsp cumin",
      "Salt and pepper to taste",
      "Fresh cilantro and lime wedges for garnish"
    ],
    instructions: [
      "Sauté diced onions, bell peppers, and garlic in a little oil until soft.",
      "Add cooked rice and black beans, stirring in cumin, salt, and pepper.",
      "Cook until heated through and flavors meld.",
      "Garnish with chopped cilantro and lime wedges, and serve."
    ]
  },
  "Jerk Chicken": {
    description:
      "A spicy Caribbean dish featuring marinated chicken with bold flavors.",
    prepTime: "20 minutes (plus 4 hours marination)",
    cookTime: "30 minutes",
    totalTime: "4 hours 50 minutes",
    servings: "4 servings",
    ingredients: [
      "1kg chicken pieces",
      "3 scotch bonnet peppers, seeded and chopped",
      "1 tsp allspice",
      "1 tsp thyme",
      "2 garlic cloves, minced",
      "1 inch ginger, grated",
      "Juice of 1 lime",
      "Salt to taste"
    ],
    instructions: [
      "Blend scotch bonnet peppers, allspice, thyme, garlic, ginger, and lime juice to create the marinade.",
      "Coat chicken pieces thoroughly and let marinate for at least 4 hours in the fridge.",
      "Preheat grill to high heat and grill the chicken until the skin is charred and the meat is cooked through, about 30 minutes.",
      "Serve with rice and peas and a squeeze of fresh lime."
    ]
  },
  "Meat Pie": {
    description:
      "A savory pie filled with a rich beef and vegetable mixture, encased in flaky pastry.",
    prepTime: "45 minutes (plus 30 minutes chilling)",
    cookTime: "35 minutes",
    totalTime: "1 hour 20 minutes",
    servings: "6 servings",
    ingredients: [
      "2 cups all-purpose flour",
      "100g butter, chilled",
      "Cold water as needed",
      "500g minced beef",
      "1 onion, diced",
      "2 carrots, diced",
      "1 cup peas",
      "1 cup beef stock",
      "Mixed herbs (thyme, rosemary)",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Prepare the shortcrust pastry by mixing flour, chilled butter, and water. Let the dough chill for 30 minutes.",
      "Sauté minced beef with diced onions, carrots, and peas until cooked through. Add beef stock and herbs, and cook until thickened.",
      "Roll out the pastry, fill with the meat mixture, and cover with another layer of pastry. Seal the edges.",
      "Bake in a preheated oven at 400°F (200°C) until the crust is golden and crisp, about 35 minutes.",
      "Allow to cool slightly before serving."
    ]
  },
  "Laplap": {
    description:
      "A traditional Melanesian dish made from grated root vegetables steamed in banana leaves.",
    prepTime: "20 minutes",
    cookTime: "2 hours",
    totalTime: "2 hours 20 minutes",
    servings: "4 servings",
    ingredients: [
      "500g cassava, grated",
      "2 plantains, grated",
      "1 sweet potato, grated",
      "1 cup coconut milk",
      "Salt and spices to taste",
      "Banana leaves for wrapping",
      "Spicy tomato sauce for serving"
    ],
    instructions: [
      "Grate cassava, plantains, and sweet potato thoroughly.",
      "Mix the grated vegetables with coconut milk, salt, and spices.",
      "Wrap the mixture in banana leaves and secure tightly with twine.",
      "Steam for 1.5 to 2 hours until the mixture is firm.",
      "Unwrap, slice, and serve with a side of spicy tomato sauce."
    ]
  },
  "Chicken Kelaguen": {
    description:
      "A Chamorro dish featuring shredded chicken mixed with lime, onions, chilies, and coconut.",
    prepTime: "20 minutes (plus 30 minutes chilling)",
    cookTime: "30 minutes",
    totalTime: "1 hour 20 minutes",
    servings: "4 servings",
    ingredients: [
      "500g chicken breast",
      "Juice of 2 limes",
      "1 red onion, diced",
      "2 green chilies, chopped",
      "1 cup grated coconut",
      "Salt to taste"
    ],
    instructions: [
      "Boil the chicken until tender, then shred finely.",
      "Combine the shredded chicken with lime juice, diced red onions, chopped green chilies, and grated coconut.",
      "Season with salt and refrigerate for at least 30 minutes.",
      "Serve chilled as a salad or in soft tortillas."
    ]
  },
  "Poi": {
    description:
      "A traditional Polynesian starchy side dish made from steamed taro, mashed into a smooth consistency.",
    prepTime: "15 minutes",
    cookTime: "45 minutes",
    totalTime: "1 hour",
    servings: "4 servings",
    ingredients: [
      "500g taro, peeled",
      "Water as needed"
    ],
    instructions: [
      "Steam the peeled taro until very soft, about 45 minutes.",
      "Mash the taro gradually with water until a smooth, pudding-like consistency forms.",
      "Allow to ferment slightly at room temperature for a mild tang.",
      "Serve as a starchy side dish."
    ]
  }
};

// -------------------------------
// 3. Detailed Second Dish Recipe Mapping
// -------------------------------
const secondDishDetails = {
  // Asian second dishes
  "Ramen": {
    description:
      "A comforting bowl of Japanese noodle soup with a rich pork broth and soft-boiled egg.",
    prepTime: "20 minutes",
    cookTime: "6 hours",
    totalTime: "6 hours 20 minutes",
    servings: "2 servings",
    ingredients: [
      "2 packs dried ramen noodles",
      "2 lbs pork bones",
      "3 cloves garlic, minced",
      "1 inch ginger, sliced",
      "2 scallions, chopped",
      "Soy sauce to taste",
      "2 soft-boiled eggs",
      "Nori sheets for garnish"
    ],
    instructions: [
      "Soak ramen noodles until soft.",
      "Simmer pork bones with garlic, ginger, and scallions for at least 6 hours to develop a rich broth.",
      "Strain the broth and return to a clean pot.",
      "Add the noodles, pork slices, and soft-boiled eggs.",
      "Garnish with chopped scallions and nori.",
      "Serve immediately while hot."
    ]
  },
  "Dim Sum": {
    description:
      "Delicate steamed dumplings filled with a savory mix of shrimp and vegetables.",
    prepTime: "45 minutes",
    cookTime: "15 minutes",
    totalTime: "1 hour",
    servings: "6-8 pieces",
    ingredients: [
      "Dumpling wrappers",
      "200g shrimp, finely chopped",
      "1 cup finely chopped mixed vegetables",
      "1 tsp grated ginger",
      "2 scallions, chopped",
      "Soy sauce for dipping"
    ],
    instructions: [
      "Mix shrimp, vegetables, ginger, and scallions in a bowl.",
      "Place a spoonful of filling in the center of each dumpling wrapper.",
      "Fold the wrapper to seal the filling inside.",
      "Steam dumplings in a bamboo steamer for 15 minutes.",
      "Serve hot with soy sauce for dipping."
    ]
  },
  "Bibimbap": {
    description:
      "A vibrant Korean dish of mixed rice topped with assorted vegetables and a fried egg.",
    prepTime: "25 minutes",
    cookTime: "20 minutes",
    totalTime: "45 minutes",
    servings: "2 servings",
    ingredients: [
      "2 cups cooked rice",
      "Assorted vegetables (spinach, bean sprouts, zucchini, carrots)",
      "1 egg",
      "Gochujang (Korean chili paste)",
      "Sesame oil",
      "Soy sauce"
    ],
    instructions: [
      "Prepare and season each vegetable separately with a dash of soy sauce and sesame oil.",
      "Fry an egg sunny-side up.",
      "Place cooked rice in a bowl and neatly arrange the vegetables on top.",
      "Place the fried egg in the center.",
      "Drizzle gochujang over the top and mix before eating."
    ]
  },
  "Pad Thai": {
    description:
      "A popular Thai stir-fried noodle dish with shrimp, tofu, and a tangy tamarind sauce.",
    prepTime: "20 minutes",
    cookTime: "15 minutes",
    totalTime: "35 minutes",
    servings: "2 servings",
    ingredients: [
      "200g rice noodles",
      "150g shrimp",
      "100g tofu, cubed",
      "2 eggs",
      "Bean sprouts",
      "Tamarind paste",
      "Fish sauce",
      "Palm sugar",
      "Crushed peanuts",
      "Lime wedges"
    ],
    instructions: [
      "Soak rice noodles until pliable.",
      "Stir-fry garlic, tofu, and shrimp in a hot wok.",
      "Add the noodles and prepare a sauce with tamarind paste, fish sauce, and palm sugar.",
      "Toss in scrambled eggs and bean sprouts.",
      "Plate the dish, garnish with crushed peanuts and lime wedges.",
      "Serve immediately."
    ]
  },
  "Curry Laksa": {
    description:
      "A spicy Malaysian noodle soup featuring a fragrant coconut curry broth.",
    prepTime: "15 minutes",
    cookTime: "30 minutes",
    totalTime: "45 minutes",
    servings: "2 servings",
    ingredients: [
      "Rice noodles",
      "200g shrimp",
      "100g tofu, cubed",
      "Bean sprouts",
      "2 tbsp curry paste",
      "1 cup coconut milk",
      "2 cups chicken stock",
      "Fresh cilantro"
    ],
    instructions: [
      "Prepare rice noodles according to package instructions.",
      "Heat chicken stock and stir in curry paste until fragrant.",
      "Add coconut milk and bring to a simmer.",
      "Add shrimp, tofu, and bean sprouts; cook until shrimp is done.",
      "Garnish with fresh cilantro and serve hot."
    ]
  },
  // European second dishes
  "Sauerbraten": {
    description:
      "A traditional German pot roast marinated in vinegar and spices, resulting in tender, flavorful meat.",
    prepTime: "30 minutes (plus 3 days marination)",
    cookTime: "2 hours",
    totalTime: "2 hours 30 minutes (plus marination)",
    servings: "4 servings",
    ingredients: [
      "1.5 kg beef roast",
      "1 cup vinegar",
      "1 cup water",
      "2 onions, sliced",
      "2 carrots, chopped",
      "2 celery stalks, chopped",
      "Bay leaves, cloves, peppercorns",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Marinate the beef roast in a mixture of vinegar, water, onions, carrots, celery, and spices for 3 days in the refrigerator.",
      "Remove the roast and pat dry. Sear on all sides in a hot pot.",
      "Add the marinade and simmer for about 2 hours until the meat is tender.",
      "Adjust seasoning with salt and pepper, slice and serve with the reduced sauce."
    ]
  },
  "Paella": {
    description:
      "A classic Spanish dish of saffron-infused rice loaded with seafood and chicken.",
    prepTime: "20 minutes",
    cookTime: "40 minutes",
    totalTime: "1 hour",
    servings: "4 servings",
    ingredients: [
      "2 cups short-grain rice",
      "1/4 tsp saffron threads",
      "500g chicken pieces",
      "300g mixed seafood",
      "1 red bell pepper, sliced",
      "1 onion, chopped",
      "2 garlic cloves, minced",
      "4 cups chicken broth",
      "Olive oil, salt, and pepper"
    ],
    instructions: [
      "Sauté chicken pieces in olive oil until browned; remove and set aside.",
      "Sauté onions, garlic, and red bell pepper until soft in the same pan.",
      "Add rice and saffron, stirring to coat the grains.",
      "Pour in chicken broth, return the chicken, and add mixed seafood.",
      "Cook over medium heat until rice absorbs the liquid and forms a crust at the bottom, about 40 minutes.",
      "Season with salt and pepper, then serve."
    ]
  },
  "Pierogi": {
    description:
      "Delicious dumplings filled with mashed potatoes and cheese, served with a topping of sautéed onions.",
    prepTime: "30 minutes",
    cookTime: "15 minutes",
    totalTime: "45 minutes",
    servings: "4 servings",
    ingredients: [
      "2 cups all-purpose flour",
      "1/2 cup water",
      "1 egg",
      "Salt to taste",
      "2 cups mashed potatoes",
      "1 cup shredded cheese",
      "1 onion, sliced for frying",
      "Butter for frying"
    ],
    instructions: [
      "Mix flour, water, egg, and a pinch of salt to form a dough; let rest.",
      "Combine mashed potatoes and cheese for the filling.",
      "Roll out the dough and cut into circles.",
      "Place a spoonful of filling on each circle, fold, and seal the edges.",
      "Boil the pierogi until they float, then lightly fry in butter with sliced onions.",
      "Serve warm."
    ]
  },
  "Moussaka": {
    description:
      "A layered Greek casserole featuring eggplant, spiced ground lamb, and a creamy béchamel sauce.",
    prepTime: "40 minutes",
    cookTime: "1 hour",
    totalTime: "1 hour 40 minutes",
    servings: "6 servings",
    ingredients: [
      "2 eggplants, sliced",
      "500g ground lamb",
      "1 onion, chopped",
      "2 garlic cloves, minced",
      "400g tomato sauce",
      "1 tsp cinnamon",
      "1/2 cup béchamel sauce",
      "Olive oil, salt, and pepper"
    ],
    instructions: [
      "Slice eggplants and sprinkle with salt; let sit to remove bitterness, then rinse and pat dry.",
      "Sauté chopped onions and garlic in olive oil; add ground lamb and cook until browned.",
      "Stir in tomato sauce and cinnamon; simmer for 15 minutes.",
      "Layer eggplant slices with the meat sauce in a baking dish.",
      "Top with béchamel sauce and bake at 375°F (190°C) for 40 minutes until golden.",
      "Allow to cool slightly before serving."
    ]
  },
  "Ratatouille": {
    description:
      "A hearty and flavorful vegetable stew from Provence, bursting with summer produce.",
    prepTime: "20 minutes",
    cookTime: "45 minutes",
    totalTime: "1 hour 5 minutes",
    servings: "4 servings",
    ingredients: [
      "1 eggplant, diced",
      "2 zucchinis, sliced",
      "1 red bell pepper, diced",
      "1 yellow bell pepper, diced",
      "4 tomatoes, chopped",
      "1 onion, sliced",
      "2 garlic cloves, minced",
      "Olive oil, salt, pepper, and fresh herbs (thyme, basil)"
    ],
    instructions: [
      "Sauté onions and garlic in olive oil until translucent.",
      "Add eggplant and bell peppers; cook until slightly softened.",
      "Stir in zucchinis and tomatoes.",
      "Season with salt, pepper, and fresh herbs.",
      "Simmer over low heat for 45 minutes until vegetables are tender and flavors meld.",
      "Serve hot."
    ]
  },
  // African second dishes
  "Tagine": {
    description:
      "A Moroccan stew slow-cooked in a tagine, featuring tender lamb with apricots and spices.",
    prepTime: "20 minutes",
    cookTime: "1.5 hours",
    totalTime: "1 hour 50 minutes",
    servings: "4 servings",
    ingredients: [
      "500g lamb, cubed",
      "1 onion, sliced",
      "2 garlic cloves, minced",
      "1 cup dried apricots",
      "1 tsp cumin",
      "1 tsp coriander",
      "1/2 tsp cinnamon",
      "2 cups water or broth",
      "Olive oil, salt, and pepper"
    ],
    instructions: [
      "Brown lamb cubes in olive oil in a tagine or heavy pot.",
      "Add sliced onions, garlic, and spices; cook until fragrant.",
      "Pour in water or broth and add dried apricots.",
      "Cover and simmer for 1.5 hours until the lamb is tender.",
      "Season with salt and pepper, then serve with couscous or flatbread."
    ]
  },
  "Bobotie": {
    description:
      "A South African dish featuring spiced minced meat topped with a creamy egg custard, baked to perfection.",
    prepTime: "30 minutes",
    cookTime: "40 minutes",
    totalTime: "1 hour 10 minutes",
    servings: "4 servings",
    ingredients: [
      "500g minced meat",
      "1 onion, chopped",
      "2 garlic cloves, minced",
      "1 slice white bread, soaked in milk",
      "1 tbsp curry powder",
      "2 eggs",
      "1/2 cup milk",
      "Raisins, salt, and pepper to taste"
    ],
    instructions: [
      "Sauté chopped onions and garlic until soft; add minced meat and cook until browned.",
      "Mix in curry powder, soaked bread, and raisins.",
      "Transfer mixture to a baking dish.",
      "Beat eggs with milk and pour over the meat mixture.",
      "Bake at 350°F (175°C) for 40 minutes until the custard is set and golden on top.",
      "Serve with rice."
    ]
  },
  "Egusi Soup": {
    description:
      "A hearty Nigerian soup made with ground melon seeds, leafy greens, and meat, served with fufu.",
    prepTime: "20 minutes",
    cookTime: "40 minutes",
    totalTime: "1 hour",
    servings: "4 servings",
    ingredients: [
      "1 cup ground egusi (melon seeds)",
      "500g assorted meat (beef, goat, or fish)",
      "2 cups leafy greens (spinach or bitterleaf)",
      "1 onion, chopped",
      "2 tomatoes, chopped",
      "2 garlic cloves, minced",
      "Spices and stock as needed"
    ],
    instructions: [
      "Sauté onions, garlic, and tomatoes until soft.",
      "Add the meat and cook until browned.",
      "Stir in ground egusi and mix well.",
      "Pour in stock and simmer for 40 minutes.",
      "Add leafy greens and cook until wilted.",
      "Season to taste and serve with fufu or bread."
    ]
  },
  "Injera": {
    description:
      "A spongy, sour flatbread from Ethiopia, perfect for scooping up rich stews.",
    prepTime: "10 minutes (plus overnight fermentation)",
    cookTime: "10 minutes per injera",
    totalTime: "Overnight plus 10 minutes per injera",
    servings: "Multiple injera",
    ingredients: [
      "2 cups teff flour",
      "Water as needed",
      "Salt to taste"
    ],
    instructions: [
      "Mix teff flour with water to form a smooth batter.",
      "Cover and let ferment overnight at room temperature.",
      "Heat a non-stick skillet and pour a thin layer of batter, swirling to cover evenly.",
      "Cook until holes form and the edges lift, then remove.",
      "Repeat for remaining batter and serve with stews."
    ]
  },
  "Suya": {
    description:
      "A popular West African street food of spicy grilled beef skewers, coated in ground peanuts and spices.",
    prepTime: "20 minutes (plus 2 hours marination)",
    cookTime: "10 minutes",
    totalTime: "2 hours 30 minutes",
    servings: "4 servings",
    ingredients: [
      "500g beef, thinly sliced",
      "2 tbsp ground peanuts",
      "1 tsp chili powder",
      "1 tsp garlic powder",
      "Salt to taste",
      "Oil for grilling"
    ],
    instructions: [
      "Marinate beef slices with ground peanuts, chili powder, garlic powder, and salt for 2 hours.",
      "Thread beef onto skewers.",
      "Grill over high heat for about 10 minutes until charred and cooked to your liking.",
      "Serve immediately with sliced onions and tomatoes."
    ]
  },
  // Americas second dishes
  "Ceviche": {
    description:
      "A refreshing dish of raw fish cured in citrus juices, mixed with onions, cilantro, and chili.",
    prepTime: "15 minutes",
    cookTime: "0 minutes",
    totalTime: "15 minutes",
    servings: "4 servings",
    ingredients: [
      "500g fresh fish, diced",
      "Juice of 4 limes",
      "1 red onion, thinly sliced",
      "1 bunch cilantro, chopped",
      "1 chili, finely chopped",
      "Salt to taste"
    ],
    instructions: [
      "Combine diced fish, lime juice, red onion, cilantro, and chili in a bowl.",
      "Mix well and let sit in the refrigerator for 15 minutes until the fish is 'cooked' by the citrus.",
      "Season with salt and serve chilled."
    ]
  },
  "Churrasco": {
    description:
      "A succulent South American grilled steak, typically served with chimichurri sauce.",
    prepTime: "15 minutes (plus marination)",
    cookTime: "10 minutes",
    totalTime: "25 minutes",
    servings: "2 servings",
    ingredients: [
      "2 steaks (flank or sirloin)",
      "2 tbsp olive oil",
      "Salt and pepper to taste",
      "For chimichurri: parsley, garlic, red wine vinegar, olive oil, salt, and pepper"
    ],
    instructions: [
      "Marinate steaks with olive oil, salt, and pepper for at least 15 minutes.",
      "Grill over high heat for about 5 minutes per side for medium-rare.",
      "Prepare chimichurri sauce by blending parsley, garlic, red wine vinegar, olive oil, salt, and pepper.",
      "Slice the steak, drizzle with chimichurri, and serve."
    ]
  },
  "Clam Chowder": {
    description:
      "A hearty New England soup filled with clams, potatoes, and a creamy base.",
    prepTime: "15 minutes",
    cookTime: "30 minutes",
    totalTime: "45 minutes",
    servings: "4 servings",
    ingredients: [
      "2 cans clams with juice",
      "2 potatoes, cubed",
      "1 onion, chopped",
      "2 celery stalks, chopped",
      "2 cups clam juice or broth",
      "1 cup heavy cream",
      "2 tbsp butter",
      "Salt, pepper, and thyme to taste"
    ],
    instructions: [
      "Sauté onions and celery in butter until soft.",
      "Add potatoes and clam juice; simmer until potatoes are tender, about 30 minutes.",
      "Stir in heavy cream and clams, and heat through.",
      "Season with salt, pepper, and thyme, then serve hot."
    ]
  },
  "Tamales": {
    description:
      "Steamed masa dough filled with spiced meat, wrapped in corn husks—a Mesoamerican classic.",
    prepTime: "45 minutes",
    cookTime: "90 minutes",
    totalTime: "2 hours 15 minutes",
    servings: "10-12 tamales",
    ingredients: [
      "2 cups masa harina",
      "1/2 cup lard or shortening",
      "1 cup broth",
      "Salt to taste",
      "Filling: 500g spiced meat, onions, garlic, cumin, paprika",
      "Corn husks, soaked in water"
    ],
    instructions: [
      "Mix masa harina, lard, broth, and salt to form a soft dough.",
      "Spread dough onto soaked corn husks; add the meat filling in the center and fold.",
      "Steam the tamales in a steamer for about 90 minutes until firm.",
      "Serve warm with salsa."
    ]
  },
  "Lobster Roll": {
    description:
      "A classic New England sandwich featuring tender lobster meat tossed in a light dressing, served in a toasted bun.",
    prepTime: "15 minutes",
    cookTime: "10 minutes",
    totalTime: "25 minutes",
    servings: "2 servings",
    ingredients: [
      "1 lobster tail (cooked and chopped)",
      "2 tbsp mayonnaise",
      "1 tsp lemon juice",
      "Salt and pepper to taste",
      "2 buttered buns",
      "Chopped celery (optional)"
    ],
    instructions: [
      "Cook the lobster tail, then extract and chop the meat.",
      "Mix lobster meat with mayonnaise, lemon juice, salt, pepper, and optional celery.",
      "Fill buttered buns with the lobster mixture and serve immediately."
    ]
  },
  // Oceania second dishes
  "Hangi": {
    description:
      "A traditional Maori meal, slow-cooked in an earth oven with meat and root vegetables wrapped in banana leaves.",
    prepTime: "1 hour",
    cookTime: "3 hours",
    totalTime: "4 hours",
    servings: "6 servings",
    ingredients: [
      "1kg meat (chicken, pork, or lamb)",
      "Assorted root vegetables (potatoes, kumara, carrots)",
      "Banana leaves",
      "Salt and herbs to taste"
    ],
    instructions: [
      "Marinate meat and vegetables with salt and herbs.",
      "Wrap in banana leaves and place in an earth oven or slow cooker.",
      "Cook slowly for about 3 hours until tender.",
      "Unwrap and serve with traditional sauces."
    ]
  },
  "Pavlova": {
    description:
      "A light meringue dessert with a crisp exterior and soft interior, topped with whipped cream and fresh fruits.",
    prepTime: "20 minutes",
    cookTime: "1 hour",
    totalTime: "1 hour 20 minutes",
    servings: "8 servings",
    ingredients: [
      "4 egg whites",
      "1 cup caster sugar",
      "1 tsp vinegar",
      "1 tsp cornstarch",
      "Whipped cream and assorted fresh fruits for topping"
    ],
    instructions: [
      "Beat egg whites until stiff peaks form, gradually adding caster sugar.",
      "Fold in vinegar and cornstarch.",
      "Spread the meringue on a baking sheet and bake at 250°F (120°C) for 1 hour.",
      "Allow to cool completely.",
      "Top with whipped cream and fresh fruits before serving."
    ]
  },
  "Lamingtons": {
    description:
      "A classic Australian dessert of sponge cake cubes coated in chocolate glaze and rolled in desiccated coconut.",
    prepTime: "30 minutes",
    cookTime: "25 minutes",
    totalTime: "55 minutes",
    servings: "12 lamingtons",
    ingredients: [
      "1 sponge cake",
      "2 cups chocolate icing",
      "2 cups desiccated coconut"
    ],
    instructions: [
      "Cut the sponge cake into cubes.",
      "Dip each cube into chocolate icing, then roll in desiccated coconut.",
      "Set aside to allow the icing to set.",
      "Serve at room temperature."
    ]
  },
  "Anzac Biscuits": {
    description:
      "Crunchy, sweet biscuits made with oats, coconut, and golden syrup, with a rich historical background.",
    prepTime: "15 minutes",
    cookTime: "15 minutes",
    totalTime: "30 minutes",
    servings: "20 biscuits",
    ingredients: [
      "1 cup rolled oats",
      "1 cup shredded coconut",
      "1 cup all-purpose flour",
      "1/2 cup golden syrup",
      "1/2 cup butter, melted"
    ],
    instructions: [
      "Mix oats, shredded coconut, and flour together.",
      "Stir in melted butter and golden syrup until combined.",
      "Shape into biscuits and place on a baking tray.",
      "Bake at 350°F (175°C) for 15 minutes until golden.",
      "Cool and serve."
    ]
  },
  "Kumara Fries": {
    description:
      "Crispy baked sweet potato fries, a healthy alternative loaded with flavor.",
    prepTime: "15 minutes",
    cookTime: "30 minutes",
    totalTime: "45 minutes",
    servings: "4 servings",
    ingredients: [
      "4 sweet potatoes, cut into fries",
      "2 tbsp olive oil",
      "Salt and spices to taste"
    ],
    instructions: [
      "Preheat oven to 425°F (220°C).",
      "Toss sweet potato fries in olive oil, salt, and desired spices.",
      "Spread evenly on a baking sheet.",
      "Bake for 30 minutes, turning halfway, until crispy and golden.",
      "Serve hot."
    ]
  }
};

// -------------------------------
// 4. Second Dish Options by Continent
// -------------------------------
const secondDishOptions = {
  Asia: ["Ramen", "Dim Sum", "Bibimbap", "Pad Thai", "Curry Laksa"],
  Europe: ["Sauerbraten", "Paella", "Pierogi", "Moussaka", "Ratatouille"],
  Africa: ["Tagine", "Bobotie", "Egusi Soup", "Injera", "Suya"],
  Americas: ["Ceviche", "Churrasco", "Clam Chowder", "Tamales", "Lobster Roll"],
  Oceania: ["Hangi", "Pavlova", "Lamingtons", "Anzac Biscuits", "Kumara Fries"]
};

// Make a copy so we can remove options as they are used.
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

// -------------------------
// 5. Seed Data Function
// -------------------------
const seedData = async () => {
  try {
    // Wait for the database connection.
    await new Promise((resolve, reject) => {
      if (db.readyState === 1) return resolve();
      db.once("open", resolve);
      db.on("error", reject);
    });
    console.log("MongoDB connection established.");
    await db.dropDatabase();
    console.log("Database dropped");

    // Create users from userData.
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
    console.log("Users created:", users.map((u) => u.username));

    // Build recipes for each user.
    const recipesArr = [];
    users.forEach((user) => {
      // Recipe 1: Home Dish
      const homeDishName = userData[user.region.major][user.region.sub].dish;
      const homeRecipe = homeDishDetails[homeDishName] || {
        description: `A traditional dish: ${homeDishName}`,
        prepTime: "30 minutes",
        cookTime: "1 hour",
        totalTime: "1 hour 30 minutes",
        servings: "4 servings",
        ingredients: ["Ingredient1", "Ingredient2", "Ingredient3"],
        instructions: ["Step 1", "Step 2", "Step 3"]
      };

      const homeRecipeObj = {
        title: `${homeDishName}`,
        description: homeRecipe.description,
        prepTime: homeRecipe.prepTime,
        cookTime: homeRecipe.cookTime,
        totalTime: homeRecipe.totalTime,
        servings: homeRecipe.servings,
        ingredients: Array.isArray(homeRecipe.ingredients)
          ? homeRecipe.ingredients.join(", ")
          : homeRecipe.ingredients,
        instructions: Array.isArray(homeRecipe.instructions)
          ? homeRecipe.instructions.join("\n")
          : homeRecipe.instructions,
        region: user.region,
        author: user._id
      };
      recipesArr.push(homeRecipeObj);

      // Recipe 2: Second Dish from a different continent.
      const second = getRandomSecondDish(user.region.major);
      const secondDishName = second.dish;
      const secondRecipe = secondDishDetails[secondDishName] || {
        description: `A special dish: ${secondDishName}`,
        prepTime: "30 minutes",
        cookTime: "1 hour",
        totalTime: "1 hour 30 minutes",
        servings: "4 servings",
        ingredients: ["IngredientA", "IngredientB", "IngredientC"],
        instructions: ["Step A", "Step B", "Step C"]
      };

      const secondRecipeObj = {
        title: `${secondDishName}`,
        description: secondRecipe.description,
        prepTime: secondRecipe.prepTime,
        cookTime: secondRecipe.cookTime,
        totalTime: secondRecipe.totalTime,
        servings: secondRecipe.servings,
        ingredients: Array.isArray(secondRecipe.ingredients)
          ? secondRecipe.ingredients.join(", ")
          : secondRecipe.ingredients,
        instructions: Array.isArray(secondRecipe.instructions)
          ? secondRecipe.instructions.join("\n")
          : secondRecipe.instructions,
        // For the region, we set the major as the dish's originating continent.
        region: { major: second.continent, sub: secondDishName },
        author: user._id
      };
      recipesArr.push(secondRecipeObj);
    });

    const recipesCreated = await Recipe.create(recipesArr);
    console.log("Recipes created:", recipesCreated.map((r) => r.title));
    console.log("Seeding complete!");
  } catch (err) {
    console.error("Error seeding data:", err);
  } finally {
    await db.close();
    console.log("Database connection closed");
  }
};

seedData();