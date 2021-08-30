"use strict";

const Article = require("../models/article");

var allArticles;

module.exports = {
    index: (req, res) => {
        Article.find({}, (error, articles) => {
            if (error) {console.log(`I made and error: ${error.message}`);} 
            else { allArticles = articles; res.render("index", { articles: allArticles });}
        });
    }
};