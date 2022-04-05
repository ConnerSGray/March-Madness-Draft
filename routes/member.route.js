const express = require("express");
const router = express.Router();

const member_controller = require("../controllers/member.controller");

router.post("/create", member_controller.member_create);
router.post('/addplayer/:id', member_controller.member_addPlayer);
router.get("/:id", member_controller.member_read);
router.put('/:id/update', member_controller.member_update);
router.delete('/:id/delete', member_controller.member_delete);

module.exports = router;