const { DataTypes, UUIDV4 } = require("sequelize");
const { Recipe, Type } = require("../db");
const service = require("../services/services.js");

const recipes = async (request, response, next) => {
  try {
    const allRecipes = await service.dataAPI();
    const recipesInApi = allRecipes.filter((el) => !el.createdByUser);
    const recipesInDb = allRecipes.filter((el) => el.createdByUser);
    const name = request.query.name;
    const filter = request.query.filter; // 'All' 'API' 'DB'
    const order = request.query.order; // 'A-Z' 'Z-A' 'MIN-MAX' 'MAX-MIN'
    const currentPage = request.query.currentPage; // 'current page'(number)

    // se buscan recetas
    if (name) {
      let recipe = allRecipes.filter((el) =>
        el.name.toLowerCase().includes(name.toLowerCase())
      );
      recipe.length > 0
        ? response.status(202).send(recipe)
        : response.status(500).send("The recipe was not found");
    } else if (name && filter !== "All") {
      // se filtra la búsqueda
      // en la API
      if (filter === "API") {
        let searchInApi = recipe.filter((el) => !el.createdByUser);
        response.status(202).send(searchInApi);
      } else {
        // en la base de datos
        let searchInDb = recipe.filter((el) => el.createdByUser);
        response.status(202).send(searchInDb);
      }
    }

    if (!name && order === undefined) {
      if (filter === "All") {
        response.status(202).send(allRecipes);
      }
      if (filter === "API") {
        response.status(202).send(recipesInApi);
      }
      if (filter === "DB") {
        response.status(202).send(recipesInDb);
      }
    }

    if (!name && order !== undefined) {
      if (filter === "All") {
        order === "A-Z"
          ? allRecipes.sort((a, b) => {
              if (a.name > b.name) return 1;
              if (b.name > a.name) return -1;
              return 0;
            })
          : order === "Z-A"
          ? allRecipes.sort((a, b) => {
              if (a.name > b.name) return -1;
              if (b.name > a.name) return 1;
              return 0;
            })
          : order === "MIN-MAX"
          ? allRecipes.sort((a, b) => {
              if (a.score > b.score) return 1;
              if (b.score > a.score) return -1;
              return 0;
            })
          : allRecipes.sort((a, b) => {
              if (a.score > b.score) return -1;
              if (b.score > a.score) return 1;
              return 0;
            });
        response.status(202).send(allRecipes);
      }
      if (filter === "API") {
        order === "A-Z"
          ? recipesInApi.sort((a, b) => {
              if (a.name > b.name) return 1;
              if (b.name > a.name) return -1;
              return 0;
            })
          : order === "Z-A"
          ? recipesInApi.sort((a, b) => {
              if (a.name > b.name) return -1;
              if (b.name > a.name) return 1;
              return 0;
            })
          : order === "MIN-MAX"
          ? recipesInApi.sort((a, b) => {
              if (a.score > b.score) return 1;
              if (b.score > a.score) return -1;
              return 0;
            })
          : recipesInApi.sort((a, b) => {
              if (a.score > b.score) return -1;
              if (b.score > a.score) return 1;
              return 0;
            });
        response.status(202).send(recipesInApi);
      }
      if (filter === "DB") {
        order === "A-Z"
          ? recipesInDb.sort((a, b) => {
              if (a.name > b.name) return 1;
              if (b.name > a.name) return -1;
              return 0;
            })
          : order === "Z-A"
          ? recipesInDb.sort((a, b) => {
              if (a.name > b.name) return -1;
              if (b.name > a.name) return 1;
              return 0;
            })
          : order === "MIN-MAX"
          ? recipesInDb.sort((a, b) => {
              if (a.score > b.score) return 1;
              if (b.score > a.score) return -1;
              return 0;
            })
          : recipesInDb.sort((a, b) => {
              if (a.score > b.score) return -1;
              if (b.score > a.score) return 1;
              return 0;
            });
        response.status(202).send(recipesInDb);
      }
    }
  } catch (error) {
    next(error);
  }
};

const recipeId = async (request, response, next) => {
  try {
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

module.exports = { recipes, recipeId, create };
