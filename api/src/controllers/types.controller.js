const { Type } = require("../db");

const types = (request, response, next) => {
  const getTypes = await service.dataAPI();
  let apiTypes = await getTypes.data.results.map((el) => el.diets); // apiTypes = [[varios types], [varios types], [varios types], [varios types]]
  apiTypes.flat(); // apiTypes = [type, type, type]

  // Guardo los modelos con cada uno en la base de datos
  apiTypes.forEach((el) => {
    Type.findOrCreate({
      // Type acaba de ser llenado con todos los tipos de dieta sin repetirse
      where: { name: el },
    });
  });

  const allTypes = await Type.findAll();
  response.send(allTypes);
};

module.exports = types;
