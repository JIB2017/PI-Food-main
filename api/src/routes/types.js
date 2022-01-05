const { Router } = require("express");
const { service } = require("../services/services");
const { Recipe, Type } = require("../db");
const { API_KEY } = process.env;

const router = Router();

router.get("/", (request, response, next) => {});


module.exports = router;
