const { Type } = require("../db");
const service = require("../services/services.js");

const types = async (request, response, next) => {
  try {
    const getTypes = await service.dataAll();
    let apiTypes = getTypes.map((el) => el.types); // apiTypes = [[varios types], [varios types], [varios types], [varios types]]
    let sinRepetir = apiTypes.flat(1);
    let array = [];

    for(let i = 0; i < sinRepetir.length; i++) {
      if(!array.includes(sinRepetir[i])) {
        array.push(sinRepetir[i]);
      }
    }
    array.push('vegetarian'); // Hardcodeado

    // Guardo los modelos con cada uno en la base de datos
    array.forEach(async (el) => {
      await Type.findOrCreate({
        // Type acaba de ser llenado con todos los tipos de dieta sin repetirse
        where: { name: el },
      });
    });

    const allTypes = await Type.findAll();
    response.send(allTypes);
  } catch (error) {
    next(error);
  }
};

module.exports = { types };
