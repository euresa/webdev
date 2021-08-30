"use strict";

const Article = require("../models/article");

var allArticles;

module.exports = {
    index: (req, res) => {
        res.render("index");
    }
};