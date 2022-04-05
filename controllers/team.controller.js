const Team = require("../models/team.model");
const PlayerController = require("./player.controller");

exports.team_create = function(req, res) {
    let team = new Team(
        {
            name: req.body.teamName,
            knockedOut: false
        }
    );

    team.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send(team._id);
    })
};

exports.team_read = function(req, res) {
    Team.findById(req.params.id, function(err, team){
        if(err) return next(err);
        res.send(team);
    })
};

exports.team_update = function(req, res) {
    Team.findByIdAndUpdate(req.params.id, {$set: req.body},
        function (err, team){
            if(err) return next(err);
            res.send("Team updated");
        });
};

exports.team_delete = function(req, res) {
    Team.findByIdAndRemove(req.params.id,
        function (err){
            if(err) return next(err);
            res.send("Team Deleted");
        });
};

exports.team_addPlayer = async function(req, res) {
    let team = await Team.findById(req.params.id);
    PlayerController.player_create(req, res, team._id);
    res.redirect("/backend");
};