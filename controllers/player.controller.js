const Player = require("../models/player.model");

exports.player_create = function(req, res, teamId) {
    console.log(req.body);
    let player = new Player(
        {
            name: req.body.playerName,
            team: teamId,
            points: 0,
            id: req.body.playerId
        }
    );

    player.save(function (err) {
        if (err) {
            return err;
        }
        res.send();
    })
};

exports.player_read = function(req, res) {
    Player.findById(req.params.id, function(err, player){
        if(err) return err;
        res.send(player);
    })
};

exports.player_update = function(req, res) {
    Player.findByIdAndUpdate(req.params.id, {$set: req.body},
        function (err, player){
            if(err) return next(err);
            res.send("Player updated");
        });
};

exports.player_delete = function(req, res) {
    Player.findByIdAndRemove(req.params.id,
        function (err){
            if(err) return next(err);
            res.send("Player Deleted");
        });
};

exports.update_points = function(req, res) {
    Player.findOneAndUpdate({ id: req.params.id }, { $set: { points: req.body.playerPoints }},
        function (err, player) {
            if (err) return err;
            res.send("Points updated");
        });
};