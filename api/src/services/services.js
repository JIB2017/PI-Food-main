const axios = require("axios");
const { Recipe, Type } = require("../db");
const { API_KEY } = process.env;

const dataAPI = async () => {
  // pedido a la api
  const dataApi = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
  );
  // formateo los datos traídos de la api
  if (dataApi && infoDB) {
    const infoAPI = await dataApi.data.results.map((el) => {
      return {
        id: el.id,
        name: el.title,
        resume: el.summary,
        score: el.healthScore,
        level: el.healthScore,
        steps: el.analyzedInstructions.steps,
        image: el.image,
        types: el.diets,
      };
    });
    // pedido a la base de datos
    const infoDB = await Recipe.findAll({ includes: Type });
    // conncateno los pedidos a la api con el de la base de datos
    const concat = [...infoDB, ...infoAPI];
    return concat;
  }
};

const types = async () => {
  // pedido a la api
  const getDataApi = await dataAPI();
  let apiTypes = await getDataApi.data.results.map((el) => el.diets); // apiTypes = [[varios types], [varios types], [varios types], [varios types]]
  apiTypes.flat(); // apiTypes = [type, type, type]

  apiTypes.forEach((el) => {
    Type.findOrCreate({
      where: { name: el },
    });
  });

  return apiTypes;
};

module.exports = { dataAPI, types };
