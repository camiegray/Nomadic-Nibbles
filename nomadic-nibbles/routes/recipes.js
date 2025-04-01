// routes/recipes.js
import { Router } from 'express';
import * as recipesController from '../controllers/recipes.js';
import isSignedIn from '../middleware/is-signed-in.js';

const router = Router();

// Public routes
router.get('/recipes', recipesController.index);
router.get('/recipes/:id', recipesController.show);

// Protected routes
router.post('/recipes', isSignedIn, recipesController.create);
router.put('/recipes/:id', isSignedIn, recipesController.update);
router.delete('/recipes/:id', isSignedIn, recipesController.remove);

export default router;
