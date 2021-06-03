const router = require("express").Router();

const controller = require("./dashboard.controller");
const methodNotAllowed = require("../errors/notFound");

router  
    .route("/")
    .get(controller.list)
    .all(methodNotAllowed);


module.exports = router;