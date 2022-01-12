const { Recipe, Type } = require("../db");
const service = require("../services/services.js");
const axios = require("axios");
const { API_KEY } = process.env;

const recipes = async (request, response, next) => {
  // recetas
  const allRecipes = await service.dataAPI();
  // const searchedRecipes = await service.allDataAPI();
  // queries de búsquedas y filtros
  const name = request.query.name;
  const type = request.query.type; // tipos de dieta
  // queries para el paginado
  let page = request.query.page ? parseInt(request.query.page) : 1;

  const limit = 9;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  let aux;

  const results = {};

  try {
    // si solo se busca por nombre
    if (name && !type) {
      let recipe = allRecipes.filter((el) =>
        el.name.toLowerCase().includes(name.toLowerCase())
      );
      recipe.length ? (aux = recipe) : next();
    }
    // si solo se pide el filtro
    if (type && !name) {
      let diets = allRecipes.filter((el) => el.types.includes(type));
      diets.length ? (aux = diets) : next();
    }
    // si se piden ambas cosas
    if (type && name) {
      let recipe = allRecipes.filter((el) =>
        el.name.toLowerCase().includes(name.toLowerCase())
      );
      let diets = recipe.filter((el) => el.types.includes(type));
      diets.length ? (aux = diets) : next();
    }
    // ningun caso, me traigo todas
    if (!type && !name) {
      aux = allRecipes;
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
    console.log(`Comienzo: ${startIndex} Final: ${endIndex}`);
    console.log(`Filtrado por: '${type}'`);
    console.log(`Los que incluyan: '${name}'`);
    response.status(200).send(results);
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

module.exports = { recipes, recipeId, create };
