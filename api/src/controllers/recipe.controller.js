const { Recipe, Type } = require("../db");
const service = require("../services/services.js");
const axios = require("axios");
const { API_KEY } = process.env;

const recipes = async (request, response, next) => {
  // recetas
  const allRecipes = await service.dataAPI();
  const searchedRecipes = await service.allDataAPI();
  const recipesInApi = allRecipes.filter((el) => !el.createdByUser);
  const recipesInDb = allRecipes.filter((el) => el.createdByUser);
  // queries de búsquedas y filtros
  const name = request.query.name;
  const filter = request.query.filter; // 'All' 'API' 'DB'
  const type = request.query.type; // tipos de dieta
  // tipos de dieta
  const typesInAll = allRecipes.filter((el) => el.types.includes(type));
  const typesInApi = recipesInApi.filter((el) => el.types.includes(type));
  const typesInDb = recipesInDb.filter((el) => el.types.includes(type));
  // queries para el paginado
  let page = request.query.page ? parseInt(request.query.page) : 1;

  const limit = 9;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  let aux;

  const results = {};

  try {
    // si solo se busca por nombre
    if (name) {
      results.filter = "All";

      let recipe = searchedRecipes.filter((el) =>
        el.name.toLowerCase().includes(name.toLowerCase())
      );
      recipe.length
        ? (aux = recipe)
        : response.status(500).send("The recipes was not found");
    }

    // si solo se aplican filtros
    if (!name && !type) {
      if (filter === "All" || results.filter == "All") {
        aux = allRecipes;
        results.filter = "All";
      }
      if (filter === "API" || results.filter == "API") {
        aux = recipesInApi;
        results.filter = "API";
      }
      if (filter === "DB" || results.filter == "DB") {
        aux = recipesInDb;
        results.filter = "DB";
      }
    }

    // si se filtran por tipos de dieta

    if (!name && type && filter) {
      results.types = type;
      results.filter = filter;
      if (filter === "All") {
        aux = typesInAll;
      }
      if (filter === "API") {
        aux = typesInApi;
      }
      if (filter === "DB") {
        aux = typesInDb;
      }
    }

    if (startIndex > 0) {
      results.previous = page - 1;
    }

    if (endIndex < aux.length) {
      results.next = page + 1;
    }
    results.totalPages = Math.ceil(aux.length / limit);
    results.actualPage = page;
    //console.log(aux)

    console.log(`Total de recetas: ${allRecipes.length}`);
    console.log(`Recetas pedidas: ${aux.length}`);
    console.log(`Páginas en total: ${Math.ceil(aux.length / limit)}`);
    console.log(`Página actual: ${page}`);
    results.results = aux.slice(startIndex, endIndex);
    console.log(startIndex, endIndex);
    response.status(202).send(results);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

const recipeId = async (request, response, next) => {
  // const recipe = await service.recipeId();
  // try {
  //   response.status(202).send(recipe);
  // } catch (error) {
  //   response.json({ message: error.message });
  // }
  try {
    const id = request.params.id;
    const recipe = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
    );
    // const res = await recipe.data.map((el) => {
    //   return {
    //     id: el.id,
    //     name: el.title,
    //     image: el.image,
    //     dishTypes: el.dishTypes,
    //     types: el.diets,
    //     resume: el.summary,
    //     score: el.spoonacularScore,
    //     level: el.healthScore,
    //     steps: el.analyzedInstructions.steps,
    //   };
    // });
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

    let recipeType = await Type.findAll({
      where: { name: types },
    });

    recipeCreated.addType(recipeType);
    response.send("Receta Creada");
  } catch (error) {
    next(error);
  }
};

const pagination = async (request, response, next) => {
  const allRecipes = await service.dataAPI();
  const page = parseInt(request.query.page); // 1
  const limit = parseInt(request.query.limit); // 9

  const startIndex = (page - 1) * limit; // (1 - 1) * 9 = 0
  const endIndex = page * limit; // 1 * 9 = 9

  const results = {};

  if (endIndex < allRecipes.length) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }
  try {
    results.results = allRecipes.slice(startIndex, endIndex); // model.slice(startIndex, endIndex)
    response.paginatedResults = results;
    response.json(response.paginatedResults);
  } catch (e) {
    response.status(500).json({ message: e.message });
  }
};

module.exports = { recipes, recipeId, create };
