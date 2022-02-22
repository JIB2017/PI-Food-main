const { Diet } = require("../db");
const axios = require("axios");
const { API_KEY, URL, ADDITIONAL_URL } = process.env;

const diets = async (request, response, next) => {
  try {
    const getTypes = await axios.get(
      `${URL}?apiKey=${API_KEY}${ADDITIONAL_URL}`
    );
    let apiTypes = getTypes.data.results.map((el) => el.diets); // apiTypes = [[varios types], [varios types], [varios types], [varios types]]
    let sinRepetir = apiTypes.flat(); // lo aplana
    
    sinRepetir.push("vegetarian"); // Hardcodeado

    // Guardo los modelos con cada uno en la base de datos
    sinRepetir.forEach(async (el) => {
      await Diet.findOrCreate({
        // Type acaba de ser llenado con todos los tipos de dieta sin repetirse
        where: { name: el },
      });
    });

    const allTypes = await Diet.findAll();
    response.send(allTypes);
  } catch (error) {
    next(error);
  }
};

module.exports = { diets };
