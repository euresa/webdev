"use strict";

const Article = require("../models/article"),
    getArticleParams = body => {
        return {
            title: body.title,
            real: body.real
        };
    };



module.exports = {
    index: (req, res, next) => {
        Article.find()
            .then(articles => {
                res.locals.articles = articles;
                next();
            })
            .catch(error => {
                console.log(`Error fetching articles: ${error.message}`);
                next(error);
            });
    },
    indexView: (req, res) => {
        res.render("articles/index");
    },

    new: (req, res) => {
        res.render("articles/new");
    },

    create: (req, res, next) => {
        if (req.skip) return next();
        let articleParams = getArticleParams(req.body);
        Article.create(articleParams)
            .then(article => {
                res.locals.redirect = "/articles";
                res.locals.article = article;
                next();
            })
            .catch(error => {
                console.log(`Error saving article: ${error.message}`);
                next(error);
            });
    },
    
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath !== undefined) res.redirect(redirectPath);
        else next();
    },

    show: (req, res, next) => {
        let articleId = req.params.id;
        Article.findById(articleId)
            .then(article => {
                res.locals.article = article;
                next();
            })
            .catch(error => {
                console.log(`Error fetching article by ID: ${error.message}`);
                next(error);
            });
    },

    showView: (req, res) => {
        res.render("articles/show");
    },

    update: (req, res, next) => {
        let articleId = req.params.id,
            articleParams = getArticleParams(req.body);

        Article.findByIdAndUpdate(articleId, {
            $set: articleParams
        })
            .then(article => {
                res.locals.redirect = `/articles/${articleId}`;
                res.locals.article = article;
                next();
            })
            .catch(error => {
                console.log(`Error updating article by ID: ${error.message}`);
                next(error);
            });
    },

    delete: (req, res, next) => {
        let articleId = req.params.id;
        Article.findByIdAndRemove(articleId)
            .then(() => {
                res.locals.redirect = "/articles";
                next();
            })
            .catch(error => {
                console.log(`Error deleting article by ID: ${error.message}`);
                next();
            });
    }
};
