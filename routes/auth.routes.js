const express = require("express");
const { register } = require("../auth_controller/registrer");
const {
  authSimple,
  getCurrentUser,
} = require("../auth_controller/authtenticate");
const router = express.Router();

router.post("/register", register);

router.post("/login", authSimple);

router.get("/authByToken", getCurrentUser);

module.exports = router;
