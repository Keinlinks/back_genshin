const { sequelize, questions } = require("../databaseConfig");
const { Op } = require("sequelize");
const byLevel = async (req, res) => {
  try {
    await sequelize.authenticate();
    //primeras configuraciones
    filter = req.params.level;
    const headers = req.headers;
    const omitsJSON = req.header("omit");
    const omits = JSON.parse(omitsJSON);
    //llamada al servidor
    if (filter === "easy" || filter === "medium" || filter === "hard") {
      questions
        .findAll({
          where: {
            level: filter,
            id: {
              [Op.notIn]: omits,
            },
          },
        })
        .then((results) => {
          res.send({
            level: filter,
            question: results[randomNumber(results.length)],
          });
        });
    } else {
      res.send("Error: dificultad erronea");
    }
  } catch (error) {
    console.error("Error al autenticar con la base de datos:");
    res
      .status(500)
      .send("Error interno del servidor al conectar con la base de datos.");
  }
};

module.exports = { byLevel };
function randomNumber(max) {
  return Math.floor(Math.random() * (max - 0) + 0);
}
