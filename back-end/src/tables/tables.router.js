const router = require("express").Router();
const controller = require("./tables.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/")
  .post(controller.create)
  .get(controller.list)
  .delete(controller.deleteTable)
  .all(methodNotAllowed);

router
  .route("/:tableId([0-9]+)")
  .get(controller.read)  
  .all(methodNotAllowed);

router
  .route("/:tableId([0-9]+)/seat")
  .put(controller.updateSeatReservation)
  .delete(controller.deleteSeatReservation)
  .all(methodNotAllowed);

module.exports = router;