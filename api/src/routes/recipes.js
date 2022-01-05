const { Router } = require("express");
const { service } = require("../services/services");
const { Recipe, Type } = require("../db");
const { API_KEY } = process.env;

const router = Router();

router.get("/", async (request, response, next) => {
  const allRecipes = await service.dataAPI();
  const name = request.query.name;

  if (name) {
    let recipe = allRecipes.filter((el) => el.title.includes(name));
    recipe.length > 0
      ? response.status(202).send(recipe)
      : response.status(404).send("The recipe was not found");
  } else {
    response.status(202).send(allRecipes);
  }
});

router.get("/:id", async (request, response, next) => {
  const id = request.params.id;
  const recipeId = await axios.get(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=cd1c445f80d84d1c9c96ede4b7dc7406`
  );
  response.status(202).send(recipeId);
});

module.exports = router;
