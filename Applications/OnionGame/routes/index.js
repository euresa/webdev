"use strict";

const router = require("express").Router(),
  articleRoutes = require("./articleRoutes"),
  errorRoutes = require("./errorRoutes"),
  homeRoutes = require("./homeRoutes");


router.use("/", homeRoutes);
router.use("/articles", articleRoutes);
router.use("/", errorRoutes);

module.exports = router;