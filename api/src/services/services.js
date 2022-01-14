const axios = require("axios");
const { Recipe, Type } = require("../db");
const { API_KEY } = process.env;

const dataAPI = async (next) => {
  try {
    // pedido a la api
    const dataApi = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    );
    // pedido a la base de datos
    const infoDB = await Recipe.findAll({
      include: {
        model: Type,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });
    // formateo los datos traídos de la api
    if (dataApi && infoDB) {
      const infoAPI = await dataApi.data.results.map((el) => {
        return {
          id: el.id,
          name: el.title,
          resume: el.summary,
          score: el.spoonacularScore,
          level: el.healthScore,
          steps: el.analyzedInstructions.steps
            ? el.analyzedInstructions.steps
            : "Sin datos...",
          image: el.image,
          types: el.diets,
          dishTypes: el.dishTypes,
        };
      });
      // conncateno los pedidos a la api con el de la base de datos
      const concat = [...infoDB, ...infoAPI];
      return concat;
    }
  } catch (error) {
    next(error);
  }
};

const allDataAPI = async (next) => {
  // pedido a la api
  try {
    // pedido a la api
    const dataApi = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`
    );
    // pedido a la base de datos
    const infoDB = await Recipe.findAll({
      include: {
        model: Type,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });
    // formateo los datos traídos de la api
    if (dataApi && infoDB) {
      const infoAPI = await dataApi.data.results.map((el) => {
        return {
          id: el.id,
          name: el.title,
          resume: el.summary,
          score: el.spoonacularScore,
          level: el.healthScore,
          steps: el.analyzedInstructions.map((el) =>
            el.steps ? el.steps : "Sin datos..."
          ),
          image: el.image,
          types: el.diets,
          dishTypes: el.dishTypes,
        };
      });
      // conncateno los pedidos a la api con el de la base de datos
      const concat = [...infoDB, ...infoAPI];
      return concat;
    }
  } catch (error) {
    next(error);
  }
};

const recipeId = async (request, response, next) => {
  try {
    const id = request.params.id;
    const recipe = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
    );
    const res = await recipe.data?.map((el) => {
      return {
        id: el.id,
        name: el.title,
        image: el.image,
        dishTypes: el.dishTypes,
        types: el.diets,
        resume: el.summary,
        score: el.spoonacularScore,
        level: el.healthScore,
        steps: el.analyzedInstructions.steps,
      };
    });
    return res;
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

module.exports = { dataAPI, allDataAPI, recipeId };
