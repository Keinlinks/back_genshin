const jwt = require("jsonwebtoken");
const crypt = require("bcrypt");

const { db_users } = require("../databaseConfig");

const authSimple = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({
      message: "Correo electrónico y contraseña son obligatorios",
      token: "",
      userData: {},
    });
  }

  if (email || password) {
    db_users
      .findOne({ where: { email: email } })
      .then((user) => {
        if (!user) {
          res.status(401).send({
            message: "Usuario no encontrado",
            token: "",
            userData: {},
          });
          return;
        }
        console.log(user);

        crypt.compare(password, user.password).then((auth) => {
          console.log(auth);
          if (auth) {
            const payload = {
              id: user.id,
            };
            secretKey = process.env.jwtSecretKey;
            const newToken = jwt.sign(payload, secretKey, { expiresIn: "15d" });
            const userData = {
              id: user.id,
              name: user.name,
              email: user.email,
              experience: user.experience,
              wins: user.wins,
              token: newToken,
            };
            db_users
              .update({ token: newToken }, { where: { id: user.id } })
              .then(() => {
                res.status(200).send({
                  message: "Inicio exitoso.",
                  token: newToken,
                  userData: userData,
                });
              })
              .catch((e) => {
                res.status(500).send({
                  message: "Error al actualizar usuario",
                  token: "",
                  userData: "",
                });
              });
          } else {
            res
              .status(401)
              .send({ message: "Clave incorrecta", token: "", userData: {} });
          }
        });
      })
      .catch((e) => {
        res.status(500).send({
          message: "Error al conectar a la base de datos",
          token: "",
          userData: "",
        });
      });
  }
};

const getCurrentUser = (req, res) => {
  const authorizationHeader = req.headers["authorization"];
  if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
    const token = authorizationHeader.slice(7);
    secretKey = process.env.jwtSecretKey;
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        res.status(401).send({ message: "token invalido" });
      } else {
        id = decoded["id"];
        db_users.findOne({ where: { id: id } }).then((user) => {
          if (!user) {
            res.status(404).send({ message: "usuario no encontrado" });
          } else {
            res
              .status(200)
              .send({ message: "Operacion existosa", userData: user });
          }
        });
      }
    });
  }
};

module.exports = { authSimple, getCurrentUser };
