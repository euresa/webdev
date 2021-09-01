const express = require("express"),
	app = express(),
	homeController = require("./controllers/homeController"),
	errorController = require("./controllers/errorController"),
	layouts = require("express-ejs-layouts");

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

/* MIDDLEWARE */
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(layouts);
app.use(express.static("public"));


/* ROUTER */
app.get("/", homeController.setHomePage);
app.get("/name/:myName", homeController.respondWithName);
app.get("/contact", homeController.setContactPage);
app.post("/contact", homeController.submitContactForm);

/* Error Handling */
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);


/* PORT LISTENING */
app.listen(app.get("port"), () => {
	console.log(`Server running at http://localhost:${app.get("port")}`);
});

