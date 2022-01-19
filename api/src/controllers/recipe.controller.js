const { Recipe, Diet } = require("../db");
const service = require("../services/services.js");
const axios = require("axios");
const { API_KEY } = process.env;

const recipes = async (request, response, next) => {
  try {
    // recetas
    const allRecipes = await service.dataAll();
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
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

const recipeId = async (request, response, next) => {
  try {
    const id = request.params.id;
    const allRecipes = await service.dataAll();
 
    if (id) {
      const filterById = allRecipes.filter((el) => el.id == id);
      console.log(typeof(filterById[0]));
      if (filterById.length > 0) {
        response.status(200).send(filterById);
      } else {
        response.status(500).send("No se encontró la receta");
      }
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

const create = async (request, response, next) => {
  try {
    let { id, name, resume, score, level, steps, createdByUser, diets } =
      request.body;

    let recipeCreated = await Recipe.create({
      id,
      name,
      resume,
      score,
      level,
      steps,
      createdByUser,
    });

    // let formated= Array.isArray(types) ? types: [types];

    let recipeType = await Diet.findAll({
      where: { name: diets },
    });
    console.log(diets);

    await recipeCreated.addDiet(recipeType);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
  response.status(200).send("recipeType");
};

const dishes = async (request, response, next) => {
  try {
    const allRecipes = await service.dataAll();
    const recipesApi = allRecipes.filter((el) => !el.createdByUser)
    const allDishes = recipesApi.map((el) => el.dishTypes);
    const allDishes2 = allDishes.flat();
    const sinRepetir = [];
    for (let i = 0; i < allDishes2.length; i++) {
      if (!sinRepetir.includes(allDishes2[i])) {
        sinRepetir.push(allDishes2[i]);
      }
    }
    const finalDishes = [];
    for (let i = 0; i < sinRepetir.length; i++) {
      finalDishes.push({
        id: i + 1,
        name: sinRepetir[i],
      });
    }
    if (finalDishes) response.status(200).send(finalDishes);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

module.exports = { recipes, recipeId, create, dishes };
