import { Router } from "express";
import userRoutes from "./users.js";
import recipesRouter from "./recipes.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.use("/auth", userRoutes);
router.use(recipesRouter);

export default router;
