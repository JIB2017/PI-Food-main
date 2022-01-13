const { Recipe, Type } = require("../db");
const service = require("../services/services.js");
const axios = require("axios");
const { API_KEY } = process.env;

const recipes = async (request, response, next) => {
  // recetas
  const allRecipes = await service.dataAPI();
  // queries de búsquedas
  const name = request.query.name;
  // queries para el paginado
  // const limit = 9;
  // const startIndex = (page - 1) * limit;
  // const endIndex = page * limit;
  // const pages = Math.ceil(aux.length / limit);
  // const paging = totalPages.slice(startIndex, endIndex);
  // const results = {};
  // let aux;
  // if (startIndex > 0) {
  //   results.previous = page - 1;
  // }

  // if (endIndex < aux.length) {
  //   results.next = page + 1;
  // }
  try {
    // si solo se busca por nombre
    if (name) {
      const recipe = allRecipes.filter((el) =>
        el.name.toLowerCase().includes(name.toLowerCase())
      );
      recipe.length ? response.status(200).send(recipe) : next();
    } else {
      response.status(200).send(allRecipes);
    }
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
        ? recipe.data.analyzedInstructions.steps
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
  let { id, name, resume, score, level, steps, createdByUser, types } =
    request.body;

  try {
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
    response.send(types);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

module.exports = { recipes, recipeId, create };
