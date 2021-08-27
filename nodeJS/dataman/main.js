const port = 3000,
    http = require('http'),
    httpStatus = require('http-status-codes'),
    router = require("./router"),
    contentTypes = require('./contentTypes'),
    utils = require("./utils");


router.get('/', (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.html);
    utils.getFile('views/index.html', res);
});
router.get("/courses.html", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.html);
    utils.getFile('views/courses.html', res);
});
router.get("/contact.html", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.html);
    utils.getFile('views/contact.html', res);
});

router.post("/", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.html);
    utils.getFile('views/thanks.html', res);
});

router.get("/graph.png", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.png);
    utils.getFile('public/images/graph.png', res);
});
router.get("/people.jpg", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.jpg);
    utils.getFile('public/images/people.jpg', res);
});
router.get("/product.jpg", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.jpg);
    utils.getFile('public/images/product.jpg', res);
});


router.get("/dataman.css", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.css);
    utils.getFile('public/css/dataman.css', res);
});
router.get("/boostrap.css", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.css);
    utils.getFile('public/css/boostrap.css', res);
});

router.get("/dataman.js", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.js);
    utils.getFile('public/js/dataman.js', res);
});

http.createServer(router.handle).listen(port);
console.log(`The Server is listening on port number: ${port}`);