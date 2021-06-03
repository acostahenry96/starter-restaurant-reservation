const router = require("express").Router();
const controller = require("./tables.controller");
const methodNotAllowed = require("../errors/notFound");

router
    .route("/")
    .get(controller.list)
    .all(methodNotAllowed);

router
    .route("/new")
    .post(controller.create)
    .all(methodNotAllowed);

router
    .route("/:table_id/seat")
    .put(controller.update)
    .delete(controller.destroy)
    .all(methodNotAllowed);


module.exports = router;