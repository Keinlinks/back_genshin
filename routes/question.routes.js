const express = require("express");
const { byID } = require("../controlllers/byId.question");
const { byLevel } = require("../controlllers/byLevel.question");
const { getAnswer } = require("../controlllers/getAnswer.question");
const { postWin } = require("../controlllers/win");
const router = express.Router();

router.get("/byID/:id", byID);

router.get("/byLevel/:level", byLevel);

router.get("/getAnswer/:id", getAnswer);

router.post("/win", postWin);

module.exports = router;
