# 🌍 Nomadic Nibbles

![Nomadic Nibbles Landing](assets/Images/shot.png)

---

## 📖 Table of Contents

1. Project Overview
2. MVP
3. User Stories  
4. Stretch Goals
5. ERD
6. Routes and Controllers
7. Timeline


---

## 🌟 Project Overview

**Nomadic Nibbles** is a vibrant, full-stack recipe-sharing platform crafted to unite food lovers across the globe. Food has the power to connect people across cultures, and this project celebrates that by providing an international space for culinary storytelling. Built using relational data models (Users, Recipes, and Regions) and RESTful routing, Nomadic Nibbles offers a seamless experience for creating, managing, and exploring a rich tapestry of global recipes.

---

## 🚀 MVP

The Minimum Viable Product (MVP) for Nomadic Nibbles focuses on delivering core features with polish and personality:

1. **User Authentication & Authorization**  
   - Secure session-based login and registration using Express-session.  
   - Authorization ensures that only authenticated users can create, edit, or delete recipes.

2. **Recipe Management**  
   - **Create:** Users can add recipes with fields for title, ingredient list, detailed instructions, and cultural region info.  
   - **Read:** A dynamic recipe index displays all recipes with detailed views showcasing full recipe information.  
   - **Update:** Pre-filled forms enable easy editing of recipes by their respective authors.  
   - **Delete:** Users can remove their recipes with a simple action to maintain control over their contributions.

3. **Regional Focus**  
   - **Users-to-Regions:** Each user is linked to a specific region, tying their identity to a geographic origin.  
   - **Recipes-to-Regions:** Each recipe is associated with a region, emphasizing its cultural origin.
   - **Recipe-to-User:** Each recipe will be tied to the user that submitted it and vice versa. 

4.  **UI**
   - Design using CSS Flexbox and Grid for smooth performance on all devices.  
   - Accessible navigation with a persistent header and nav bar.
---

## 👥 User Stories

These user stories guide the MVP development, ensuring Nomadic Nibbles meets the needs of its diverse users:

- **As a food enthusiast,** I want to register and log in securely so that I can manage my recipe contributions with confidence.  
- **As a registered user,** I want to create a recipe complete with ingredients and cultural context so that I can share my culinary discoveries.  
- ** As a food enthusiast, I want to be able to register and sign in to the database so that I can add and edit my own recipes.
- **As a registered user,** I want to edit my recipes easily so that I can refine them based on new ideas or feedback.  
- **As a registered user,** I want to delete my recipes so that I can maintain a curated collection.  
- **As a visitor,** I want to browse a list of recipes from around the world so that I can find inspiration for my next meal.  
- **As a visitor,** I want to view detailed recipe pages with complete instructions and ingredient lists so that I can recreate dishes at home.
- ** As a user,** I want to be able to see the origins of the recipe and the user who posted them to see how culinary arts bridges cultures.
---

## 🌱 Stretch Goals

After meeting the MVP requirements, the following enhancements will further elevate Nomadic Nibbles:

1. **Advanced Search & Filtering**: Search by ingredients, cuisine, or dietary preferences.  
2. **Image Uploads**: Integrate file upload capabilities for recipe images.  
3. **User Profiles**: Dedicated pages showcasing a user’s recipes, bio, and favorite cuisines.  
4. **Rating System**: Implement a 5-star rating mechanism with average ratings displayed for each recipe.  
5. **Cultural Collections**: Curate themed collections with storytelling elements.  
6. **RESTful API**: Provide endpoints for mobile app integration or third-party services.

---
## 📊 Entity Relationship Diagram (ERD)

Below is the ERD for **Nomadic Nibbles** outlining the relationships between Users, Recipes, and Regions.

![Nomadic Nibbles ERD](assets/Images/erd2.png)

---

## 🔀 Routes and Controllers

Nomadic Nibbles adheres to RESTful routing conventions. Below are the primary routes and their corresponding controllers:

## Routes, Controllers & Details

| Route                  | Controller                | Detail                                             |
|------------------------|---------------------------|----------------------------------------------------|
| GET /users/register    | auth.registerForm()       | Renders the registration form                      |
| POST /users/register   | auth.registerUser()       | Processes new user registration                    |
| GET /users/login       | auth.loginForm()          | Renders the login form                             |
| POST /users/login      | auth.loginUser()          | Authenticates user and starts a session            |
| GET /users/logout      | auth.logoutUser()         | Logs the user out and ends the session             |
| GET /recipes           | recipes.index()           | Displays all recipes                               |
| GET /recipes/new       | recipes.renderNewForm()   | Renders form for creating a new recipe             |
| POST /recipes          | recipes.createRecipe()    | Creates a new recipe                               |
| GET /recipes/:id       | recipes.showRecipe()      | Shows details of a specific recipe                 |
| GET /recipes/:id/edit  | recipes.renderEditForm()  | Renders form to edit a recipe                      |
| PUT /recipes/:id       | recipes.updateRecipe()    | Updates recipe in the database                     |
| DELETE /recipes/:id    | recipes.deleteRecipe()    | Removes a recipe from the database                 |

---

## Timeline

| Day       |   | Task                           | Blockers               | Notes/ Thoughts                          |
|-----------|---|--------------------------------|------------------------|------------------------------------------|
| Monday    |   | Research                       |                        |                                          |
| Tuesday   |   | Proposal & Routes              |                        | Finalize project proposal                |
| Wednesday |   | Views                          | Initial design issues  | HTML & EJS views for core pages.         |
| Thursday  |   | Views & Routes                 | Minor debugging        | Express routes                           |
| Friday    |   | Testing                        |                        | Combine functionalities                  |
| Saturday  |   | CSS & Styling                  |                        | Flexbox                                  |
| Sunday    |   | Final review and deploy        |                        |                                          |
| Monday    |   | Present!                       |                        |                                          |



**Savor the flavors of the world with Nomadic Nibbles!**
