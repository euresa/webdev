"use strict"

const router = require("express").Router(),
    homeController = require("../controllers/homeController"),
    articlesController = require("../controllers/articlesController");

router.get("/", articlesController.index, homeController.index);


module.exports = router;