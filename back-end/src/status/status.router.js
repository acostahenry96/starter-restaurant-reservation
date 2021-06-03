const router = require("express").Router({ mergeParams:true });

const controller = require("./status.controller");
const methodNotAllowed = require("../errors/notFound");

router
    .route("/")
    .put(controller.update)
    .all(methodNotAllowed);

module.exports = router;