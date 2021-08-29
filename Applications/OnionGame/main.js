"use strict";

const express = require("express"),
    layouts = require("express-ejs-layouts"),
    app = express(),
    router = require("./routes/index"),
    homeController = require("./controllers/homeController"),
    errorController = require("./controllers/errorController"),
    articlesController = require("./controllers/articlesController.js"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    cookieParser = require("cookie-parser"),
    expressSession = require("express-session"),
    connectFlash = require("connect-flash"),
    Article = require("./models/article");

    
mongoose.connect(
    "mongodb://localhost:27017/OnionGame",
    { useNewUrlParser: true }
);

/* Still not sure what this does, but the other line was outdated */
mongoose.Promise = global.Promise //mongoose.set("useCreateIndex", true);

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(
    methodOverride("_method", {
        methods: ["POST", "GET"]
    })
);

app.use(layouts);
app.use(express.static("public"));
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());

app.use(cookieParser("secretOnionGame252"));
app.use(
    expressSession({
        secret: "secretOnionGame252",
        cookie: {
            maxAge: 4000000
        },
        resave: false,
        saveUninitialized: false
    })
);
app.use(connectFlash());

app.use("/", router);

app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});
