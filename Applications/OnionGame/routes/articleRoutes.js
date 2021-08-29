"use strict";

const router = require("express").Router(),
    articlesController = require("../controllers/articlesController");

router.get("/", articlesController.index, articlesController.indexView);
router.get("/new", articlesController.new);
router.post("/create", articlesController.create, articlesController.redirectView);
router.put("/:id/update", articlesController.update, articlesController.redirectView);
router.get("/:id", articlesController.show, articlesController.showView);
router.delete("/:id/delete", articlesController.delete, articlesController.redirectView);
module.exports = router;
