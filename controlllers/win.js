const { db_users } = require("../databaseConfig");

const postWin = (req, res) => {
  const { id } = req.body;
  try {
    db_users
      .increment("wins", { by: 1, where: { id: id } })
      .then(() => {
        res.send({ message: "Incremento realizado" });
      })
      .catch((e) => {
        res.status(401).send({ message: "Error: incremento invalido" });
      });
  } catch (e) {
    res.status(500).send({ message: "Error: servidor caido" });
  }
};

module.exports = { postWin };
