const express = require("express");
const router = express.Router();

const team_controller = require("../controllers/team.controller");

router.post("/create", team_controller.team_create);
router.post('/addplayer/:id', team_controller.team_addPlayer);
router.get("/:id", team_controller.team_read);
router.put('/:id/update', team_controller.team_update);
router.delete('/:id/delete', team_controller.team_delete);

module.exports = router;