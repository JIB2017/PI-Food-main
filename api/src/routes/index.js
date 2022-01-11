const { Router } = require("express");
const recipe = require("../controllers/recipe.controller.js");
const type = require("../controllers/types.controller.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/recipes", recipe.recipes);
router.get("/recipes/:id", recipe.recipeId);
router.get("/types", type.types);
router.post("/recipe", recipe.create);

module.exports = router;
