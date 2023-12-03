const { db_users } = require("../databaseConfig");
const bcrypt = require("bcrypt");
const register = (req, res) => {
  const { email, password, name } = req.body;
  const saltRounds = 10;
  db_users
    .findOne({ where: { email: email } })
    .then(async (exist) => {
      if (exist) {
        res.status(409).send({ message: "El mail ya existe" });
      } else {
        bcrypt
          .hash(password, 10)
          .then((passwordHashed) => {
            db_users
              .create({
                email: email,
                password: passwordHashed,
                name: name,
              })
              .then((newUser) => {
                res
                  .status(200)
                  .send({ message: "Usuario creado: ", newUser: newUser });
              })
              .catch((e) => {
                res
                  .status(500)
                  .send({ message: "Error al crear usuario: ", e });
              });
          })
          .catch((e) => {
            res.status(500).send({ message: "Error hash: ", e });
          });
      }
    })
    .catch((e) => {
      console.log("Error al conectar a la base de datos: ", e);
      res.status(500).send({ message: "Error al conectar a la base de datos" });
    });
};

module.exports = { register };
