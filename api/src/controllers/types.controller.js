const { Type } = require("../db");
const service = require("../services/services.js");

const types = async (request, response, next) => {
  try {
    const getTypes = await service.dataAPI();
    let apiTypes = getTypes.map((el) => el.types); // apiTypes = [[varios types], [varios types], [varios types], [varios types]]
    let sinRepetir = apiTypes.flat(1);

    // Guardo los modelos con cada uno en la base de datos
    sinRepetir.forEach((el) => {
      Type.findOrCreate({
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
