const { Router } = require("express");
const recipe = require("../controllers/recipe.controller.js");
const diets = require("../controllers/diets.controller.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/recipes", recipe.recipes);
router.get("/recipes/:id", recipe.recipeId);
router.get("/diets", diets.diets);
router.get("/dishes", recipe.dishes);
router.post("/recipe", recipe.create);

module.exports = router;
