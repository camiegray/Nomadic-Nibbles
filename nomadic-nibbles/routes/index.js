import { Router } from "express";
import userRoutes from "./users.js";
import recipesRoutes from "./recipes.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("home");
});
router.use("/", userRoutes);
router.use("/", recipesRoutes);

export default router;
