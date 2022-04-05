const Member = require("../models/member.model");

exports.member_create = function(req, res, tableId) {
    let member = new Member(
        {
            name: req.body.memberName,
            table: tableId
        }
    );
    
    member.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send();
    });
    return member;
};

exports.member_read = function(req, res) {
    Member.findById(req.params.id, function(err, member){
        if(err) return next(err);
        res.send(member);
    }).populate("players");
};

exports.member_update = function(req, res) {
    Member.findByIdAndUpdate(req.params.id, {$set: req.body},
        function (err, member){
            if(err) return next(err);
            res.send("Member updated");
        });
};

exports.member_delete = function(req, res) {
    Member.findByIdAndRemove(req.params.id,
        function (err){
            if(err) return next(err);
            res.send("Member Deleted");
        });
};

exports.member_addPlayer = async function(req, res) {
    let member = await Member.findById(req.params.id);
    member.players.push(req.body.playerId);
    member.save(function(err, doc){
        if(err){
            return console.error(err)
        }
    });
    
    res.redirect("/backend");
};