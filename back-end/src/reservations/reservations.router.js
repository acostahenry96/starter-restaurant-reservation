/*** @type {Router}*/

const router = require("express").Router();
const controller = require("./reservations.controller");
const methodNotAllowed = require("../errors/notFound");

    /*My other router handlers*/

const toSeatRouter = require("../seat/seat.router");
const toStatusRouter = require("../status/status.router");
const toEditRouter = require("../edit/edit.router");
const toNewRouter = require("../new/new.router");


router
    .route("/")
    .get(controller.list)
    .all(methodNotAllowed);

router.use("/new", toNewRouter);

router
    .route("/:reservation_id")
    .get(controller.read)
    .put(controller.update)
    .all(methodNotAllowed);

    
router.use("/:reservation_id/seat", toSeatRouter);

router.use("/:reservation_id/status", toStatusRouter);

router.use("/:reservation_id/edit", toEditRouter);




module.exports = router;
