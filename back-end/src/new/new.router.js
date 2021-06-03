const router = require("express").Router();
const methodNotAllowed = require("../errors/notFound");
const controller = require("./new.controller");


router
    .route("/")
    .post(controller.create)
    .all(methodNotAllowed);

module.exports = router;