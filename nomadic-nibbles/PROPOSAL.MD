# 🌍 Nomadic Nibbles

![Nomadic Nibbles Logo](./public/images/logo.png)  
*Screenshot or logo of Nomadic Nibbles will be added here upon completion.*

---

## 📖 Table of Contents

1. [Project Overview](#project-overview)  
2. [MVP](#mvp)  
3. [User Stories](#user-stories)  
4. [Technologies Used](#technologies-used)  
5. [Stretch Goals](#stretch-goals)  
6. [ERD](#erd)
7. [Routes and Controllers](#routes-and-controllers)  
8. [Timeline](#timeline)  
9. [Acknowledgments](#acknowledgments)

---

## 🌟 Project Overview

**Nomadic Nibbles** is a vibrant, full-stack recipe-sharing platform crafted to unite food lovers across the globe. Food has the power to connect people across cultures, and this project celebrates that by providing an international space for culinary storytelling. Built using relational data models (Users, Recipes, and Regions) and RESTful routing, Nomadic Nibbles offers a seamless experience for creating, managing, and exploring a rich tapestry of global recipes.

Powered by **Node.js**, **Express**, **MongoDB**, and **EJS**, this application delivers full CRUD functionality with robust session-based authentication. With a visually stunning interface designed using **CSS Flexbox** and **Grid**, Nomadic Nibbles combines functionality with flair to engage users on both desktops and mobile devices.

---

## 🚀 MVP

The Minimum Viable Product (MVP) for Nomadic Nibbles focuses on delivering core features with polish and personality:

1. **User Authentication & Authorization**  
   - Secure session-based login and registration using Express-session.  
   - Granular authorization ensures that only authenticated users can create, edit, or delete recipes.

2. **Recipe Management**  
   - **Create:** Users can add recipes with fields for title, ingredient list, detailed instructions, and cultural region info.  
   - **Read:** A dynamic recipe index displays all recipes with detailed views showcasing full recipe information.  
   - **Update:** Pre-filled forms enable easy editing of recipes by their respective authors.  
   - **Delete:** Users can remove their recipes with a simple action to maintain control over their contributions.

3. **Regional Focus**  
   - **Users-to-Regions:** Each user is linked to a specific region, tying their identity to a geographic origin.  
   - **Recipes-to-Regions:** Each recipe is associated with a region, emphasizing its cultural origin.

4. **Responsive UI/UX**  
   - A cohesive visual theme inspired by global textiles and earthy tones.  
   - Responsive design using CSS Flexbox and Grid for smooth performance on all devices.  
   - Accessible navigation with a persistent header and WCAG 2.0 AA-compliant contrast.

---

## 👥 User Stories

These user stories guide the MVP development, ensuring Nomadic Nibbles meets the needs of its diverse users:

- **As a food enthusiast,** I want to register and log in securely so that I can manage my recipe contributions with confidence.  
- **As a registered user,** I want to create a recipe complete with ingredients and cultural context so that I can share my culinary discoveries.  
- **As a registered user,** I want to edit my recipes easily so that I can refine them based on new ideas or feedback.  
- **As a registered user,** I want to delete my recipes so that I can maintain a curated collection.  
- **As a visitor,** I want to browse a list of recipes from around the world so that I can find inspiration for my next meal.  
- **As a visitor,** I want to view detailed recipe pages with complete instructions and ingredient lists so that I can recreate dishes at home.

---

## 🛠️ Technologies Used

Nomadic Nibbles leverages a modern MEN stack along with additional tools for a robust and maintainable application:

- **Node.js**: Server-side runtime environment.  
- **Express**: RESTful routing and middleware management.  
- **MongoDB**: Document-based database for flexible schema design.  
- **Mongoose ODM**: Schema enforcement and object modeling for MongoDB.  
- **EJS**: Dynamic server-side rendering for user-friendly views.  
- **Express-session**: Secure session management for user authentication.  
- **HTML5, CSS3 (Flexbox & Grid)**: Semantically structured, responsive front-end design.  
- **Git & GitHub**: Version control with descriptive commits.

---

## 🌱 Stretch Goals

After meeting the MVP requirements, the following enhancements will further elevate Nomadic Nibbles:

1. **Advanced Search & Filtering**: Search by ingredients, cuisine, or dietary preferences.  
2. **Image Uploads**: Integrate file upload capabilities (e.g., multer) for recipe images.  
3. **User Profiles**: Dedicated pages showcasing a user’s recipes, bio, and favorite cuisines.  
4. **Rating System**: Implement a 5-star rating mechanism with average ratings displayed for each recipe.  
5. **Cultural Collections**: Curate themed collections (e.g., "Tastes of Southeast Asia") with storytelling elements.  
6. **RESTful API**: Provide endpoints for mobile app integration or third-party services.

---
## 📊 Entity Relationship Diagram (ERD)

Below is the ERD for **Nomadic Nibbles** which outlines the relationships between Users, Recipes, and Regions.

![Nomadic Nibbles ERD](https://mermaid.ink/img/eyJjb2RlIjoiZXJEaWFncmFtXG4gICAgVVNFUlNcbiAgICB7IGludCB1c2VySUQgUEsgfVxuICAgIHsgc3RyaW5nIGVtYWlsIH0gXG4gICAgeyBzdHJpbmcgcGFzc3dvcmQgfSBcbiAgICB7IHN0cmluZyB1c2VybmFtZSB9XG4gICAgeyBpbnQgcmVnaW9uSUQgRksgfVxuICAgIH0gXG4gICAgUkVDSVBFU0VzXG4gICAgeyBpbnQgcmVjaXBlSUREIFBLIH0gXG4gICAgeyBzdHJpbmcgdGl0bGUgfSBcbiAgICB7IHN0cmluZyBpbnN0cnVjdGlvbnMgfSBcbiAgICB7IGludCB1c2VySUQgRksgfVxuICAgIHsgaW50IHJlZ2lvbklEIFBLIH0gXG4gICAgUkVDSVBFU0VzXG4gICAgeyBpbnQgcmVnaW9uSUQgRksgfVxuICAgIHsgc3RyaW5nIG5hbWUgfSBcbiAgICB7IHN0cmluZyBjb250aW5lbnQgfVxuICAgIH0iLCJtZXJtYWlkIjp7fX0)

---

## 🔀 Routes and Controllers

Nomadic Nibbles adheres to RESTful routing conventions. Below are the primary routes and their corresponding controllers:

### User Routes
- **GET /users/register**  
  Renders the registration form.  
  **Controller**: `auth.registerForm()`

- **POST /users/register**  
  Processes new user registration.  
  **Controller**: `auth.registerUser()`

- **GET /users/login**  
  Renders the login form.  
  **Controller**: `auth.loginForm()`

- **POST /users/login**  
  Authenticates user and starts a session.  
  **Controller**: `auth.loginUser()`

- **GET /users/logout**  
  Logs the user out and ends the session.  
  **Controller**: `auth.logoutUser()`

### Recipe Routes
*(Will be added in a future iteration, potentially in a separate controller and routes file like `recipes.js`.)*

- **GET /recipes**  
  Displays all recipes.  
  **Controller**: `recipes.index()`

- **GET /recipes/new**  
  Renders form for creating a new recipe.  
  **Controller**: `recipes.renderNewForm()`

- **POST /recipes**  
  Creates a new recipe.  
  **Controller**: `recipes.createRecipe()`

- **GET /recipes/:id**  
  Shows details of a specific recipe.  
  **Controller**: `recipes.showRecipe()`

- **GET /recipes/:id/edit**  
  Renders form to edit a recipe.  
  **Controller**: `recipes.renderEditForm()`

- **PUT /recipes/:id**  
  Updates recipe in the database.  
  **Controller**: `recipes.updateRecipe()`

- **DELETE /recipes/:id**  
  Removes a recipe from the database.  
  **Controller**: `recipes.deleteRecipe()`

---
## Timeline

---
## ✨ Acknowledgments

Special thanks to my instructors and peers for their guidance and support throughout the development of Nomadic Nibbles. This project is more than just an application—it’s a culinary adventure that blends global flavors with modern web development practices. 

**Savor the flavors of the world with Nomadic Nibbles!**
