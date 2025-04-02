import { Router } from "express";
import * as controllers from "../controllers/auth.js";
import isSignedIn from "../middleware/is-signed-in.js";

const router = Router();

router.get("/sign-up", controllers.getSignUp);
router.get("/sign-in", controllers.getSignIn);
router.post("/sign-up", controllers.registerUser);
router.post("/sign-in", controllers.loginUser);
router.get("/sign-out", controllers.signOutUser);
router.get("/profile", isSignedIn, controllers.getProfile);
router.get("/profile/:id", controllers.getUserProfile);

export default router;
