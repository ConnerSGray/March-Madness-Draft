const Table = require("../models/table.model");
const MemberController = require("./member.controller");

exports.table_create = function(req, res) {
    Table.countDocuments(function(err, count) {
        let table = new Table(
            {
                name: count + 1
            }
        );
        
        table.save(function (err) {
            if (err) {
                return next(err);
            }
            res.redirect("/backend");
        });
    });
    
};

exports.table_read = function(req, res) {
    Table.findById(req.params.id, function(err, table){
        if(err) return next(err);
        res.send(table);
    })
};

exports.table_update = function(req, res) {
    Table.findByIdAndUpdate(req.params.id, {$set: req.body},
        function (err, table){
            if(err) return next(err);
            res.send("Table updated");
        });
};

exports.table_delete = function(req, res) {
    Table.findByIdAndRemove(req.params.id,
        function (err){
            if(err) return next(err);
            res.send("Table Deleted");
        });
};

exports.table_count = function(req, res) {
    Table.countDocuments(
        function (err, count) {
            if(err) return next(err);
            res.send();
        });
};

exports.table_addMember = async function(req, res) {
    let table = await Table.findById(req.params.id);
    MemberController.member_create(req, res, table._id);
    res.redirect("/backend");
};




