const { DataTypes, UUIDV4 } = require("sequelize");
const { Recipe, Type } = require("../db");
const service = require("../services/services.js");

const recipes = async (request, response, next) => {
  try {
    const allRecipes = await service.dataAPI();
    const name = request.query.name;
    const filter = request.query.filter; // 'All' 'API' 'DB'
    const order = request.query.order; // 'A-Z' 'Z-A' 'MIN-MAX' 'MAX-MIN'
    const currentPage = request.query.currentPage; // 'current page'(number)
  
    if (name && filter === "All" & !order) {
      let recipe = allRecipes.filter((el) =>
        el.name.toLowerCase().includes(name.toLowerCase())
      );
      recipe.length > 0
        ? response.status(202).send(recipe)
        : response.status(500).send("The recipe was not found");
    } else {
      response.status(202).send(allRecipes);
    }
  }
  catch(error) {
    next(error)
  }
};

const paginacion = async (request, response, next) => {
  const prueba = await Recipe.findAndCountAll({
    limit: 3,
    offset: 10,
  });
  response.send(prueba);
};

const recipeId = async (request, response, next) => {
  try {
    // let uuid = request.params.id;
    // if (
    //   /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi.test(
    //     uuid
    //   )
    // ) {
    //   const allRecipes = await Recipe.findAll({
    //     where: { id: uuid },
    //   });
    //   response.status(202).send(allRecipes);
    // } else {
    //   let id = parseInt(request.params.id);
    //   const allRecipes = await Recipe.findAll({
    //     where: { id: id },
    //   });
    //   response.status(202).send(allRecipes);
    // }
    const allRecipes = await service.dataAPI();
    let id = request.params.id;
    let recipe = allRecipes.filter((el) => el.id == id);
    response.status(202).send(recipe);
    // const recipeId = await axios.get(
    //   `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
    // );
    // let recipe = allRecipes.filter((el) => el.id === id);
  } catch (error) {
    next(error);
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

module.exports = { recipes, recipeId, create, paginacion };
