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
          steps: el.analyzedInstructions.map((el) =>
            el.steps ? el.steps : "Sin datos..."
          ),
          image: el.image,
          types: el.diets,
          dishTypes: el.dishTypes
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

const types = async () => {
  // pedido a la api
  const getDataApi = await dataAPI();
  let apiTypes = getDataApi.map((el) => el.types); // apiTypes = [[varios types], [varios types], [varios types], [varios types]]
  apiTypes.flat(); // apiTypes = [type, type, type]

  apiTypes.forEach((el) => {
    Type.findOrCreate({
      where: { name: el },
    });
  });

  return apiTypes;
};

module.exports = { dataAPI };
