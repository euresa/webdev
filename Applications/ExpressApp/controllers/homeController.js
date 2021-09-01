
exports.respondWithName = (req, res) => {
    var nameGiven = req.params.myName;
    res.render("name", {name: nameGiven});
};

exports.setContactPage = (req, res) => {
    res.render("contactPage");
}

exports.setHomePage = (req, res) => {
    res.render("index");
}

exports.submitContactForm = (req, res) => {
    res.render("thanks");
}