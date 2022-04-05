const express = require("express");
const router = express.Router();

const table_controller = require("../controllers/table.controller");

router.post("/create", table_controller.table_create);
router.post('/addmember/:id', table_controller.table_addMember);
router.get("/count", table_controller.table_count);
router.get("/:id", table_controller.table_read);
router.put('/:id/update', table_controller.table_update);
router.delete('/:id/delete', table_controller.table_delete);

module.exports = router;