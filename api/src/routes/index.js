const { Router } = require("express");
const Recipes = require("./recipes");
const Recipe = require("./recipe");
const Types = require("./types");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/recipes", Recipes);
router.use("/types", Types);
router.use("/recipe", Recipe);

module.exports = router;
