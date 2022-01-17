const axios = require("axios");
const { Recipe, Type } = require("../db");
const { API_KEY } = process.env;

const getDataAPI = async (next) => {
  try {
    // pedido a la api
    const dataApi = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    );
    // formateo los datos traídos de la api
    if (dataApi) {
      const infoAPI = await dataApi.data.results.map((el) => {
        return {
          id: el.id,
          name: el.title,
          resume: el.summary,
          score: el.spoonacularScore,
          level: el.healthScore,
          steps: el.analyzedInstructions[0]
            ? el.analyzedInstructions[0].steps.map((el) => [el.number, el.step])
            : "Sin datos...",
          image: el.image,
          types: el.diets,
          dishTypes: el.dishTypes,
        };
      });
      return infoAPI;
    }
  } catch (error) {
    next(error);
  }
};

const getDataDB = async () => {
  // pedido a la api
  try {
    return await Recipe.findAll({
      include: {
        model: Type,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });
  } catch (error) {
    next(error);
  }
};

const dataAll = async () => {
  try {
    const dataApi = await getDataAPI();
    const dataDb = await getDataDB();
    const all = [...dataDb, ...dataApi];
    return all;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { dataAll };
