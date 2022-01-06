const { Router } = require("express");
const { Recipe, Type } = require("../db");

const recipes = async (request, response, next) => {
  const allRecipes = await service.dataAPI();
  const name = request.query.name;

  if (name) {
    let recipe = allRecipes.filter((el) =>
      el.title.toLowerCase().includes(name.toLowerCase())
    );
    recipe.length > 0
      ? response.status(202).send(recipe)
      : response.status(404).send("The recipe was not found");
  } else {
    response.status(202).send(allRecipes);
  }
};

const recipeId = async (request, response, next) => {
  const id = request.params.id;
  const recipeId = await axios.get(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
  );
  response.status(202).send(recipeId);
};

const create = async (request, response, next) => {
  let { id, name, resume, score, level, steps, types } = request.body;

  let recipeCreated = await Recipe.create({
    id: id,
    name: name,
    resume: resume,
    score: score,
    level: level,
    steps: steps,
  });

  let recipeType = await Type.findAll({
    where: { name: types },
  });

  await recipeCreated.addType(recipeType);
  response;
};

module.exports = { recipes, recipeId, create };
