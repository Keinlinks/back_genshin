const { answer } = require("../databaseConfig");

const getAnswer = (req, res) => {
  const id = req.params.id;
  try {
    answer
      .findOne({
        where: {
          id: id,
        },
      })
      .then((answer) => {
        if (!answer) {
          res.send({ message: "Id invalido" });
          return;
        }
        res.send({
          answer: answer,
        });
      });
  } catch (e) {
    res.status(500).send({ message: "Error: servidor caido" });
  }
};

module.exports = { getAnswer };
