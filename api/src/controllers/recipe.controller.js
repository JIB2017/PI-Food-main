const { Recipe, Type } = require("../db");
const service = require("../services/services.js");
const axios = require("axios");
const { API_KEY } = process.env;

const recipes = async (request, response, next) => {
  try {
    // recetas
  const allRecipes = await service.dataAPI();
  // queries de búsquedas
  const name = request.query.name;
     // si solo se busca por nombre
    if (name) {
      const recipeName = allRecipes.filter((el) =>
        el.name.toLowerCase().includes(name.toLowerCase())
      );
      if (recipeName.length) {
        response.status(200).send(recipeName);
      }
    } else {
      response.status(200).send(allRecipes);
    }

    // if (order) {
    //   order === "A-Z"
    //     ? recipes.sort((a, b) => {
    //         if (a.name > b.name) return 1;
    //         if (b.name > a.name) return -1;
    //         return 0;
    //       })
    //     : recipes.sort((a, b) => {
    //         if (a.name > b.name) return 1;
    //         if (b.name > a.name) return -1;
    //         return 0;
    //       });
    //   response.status(200).send(recipes);
    // }

    // if (!name && !order) {
    //   response.status(200).send(allRecipes);
    // }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

const recipeId = async (request, response, next) => {
  try {
    const id = request.params.id;
    const recipe = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
    );
    const res = {
      id: recipe.data.id,
      name: recipe.data.title,
      image: recipe.data.image,
      dishTypes: recipe.data.dishTypes,
      types: recipe.data.diets,
      resume: recipe.data.summary,
      score: recipe.data.spoonacularScore,
      level: recipe.data.healthScore,
      steps: recipe.data.analyzedInstructions.steps
        ? recipe.data.analyzedInstructions.steps.flat()
        : "Sin datos...",
    };
    res
      ? response.status(200).json(res)
      : response.status(404).send("Algo pasó con el id");
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

const create = async (request, response, next) => {
  try {
    let { id, name, resume, score, level, steps, createdByUser, types } =
      request.body;

    let recipeCreated = await Recipe.create({
      id: id,
      name: name,
      resume: resume,
      score: score,
      level: level,
      steps: steps,
      createdByUser: createdByUser,
    });

    // let formated= Array.isArray(types) ? types: [types];

    let recipeType = await Type.findAll({
      where: { name: types },
    });
    // console.log(types);
    console.log(types);

    await recipeCreated.addType(recipeType);
    response.json(types);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

module.exports = { recipes, recipeId, create };
