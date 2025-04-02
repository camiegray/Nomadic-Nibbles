import { Router } from "express";
import * as recipesController from "../controllers/recipes.js";
import isSignedIn from "../middleware/is-signed-in.js";

const router = Router();
router.get("/recipes/searchByRegion", recipesController.searchByRegion);
router.get("/recipes/new", isSignedIn, recipesController.newForm);
router.get("/recipes/:id/edit", isSignedIn, recipesController.editForm);
router.get("/recipes", recipesController.index);
router.get("/recipes/:id", recipesController.show);
router.post("/recipes", isSignedIn, recipesController.create);
router.put("/recipes/:id", isSignedIn, recipesController.update);
router.delete("/recipes/:id", isSignedIn, recipesController.remove);


export default router;
