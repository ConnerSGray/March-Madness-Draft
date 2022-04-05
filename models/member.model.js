const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let MemberSchema = new Schema({
    name: {type: String, required: true},
    table: {
        type: Schema.Types.ObjectId,
        ref: "Table",
        required: true
    },
    players: [{
        type: Schema.Types.ObjectId,
        ref: "Player"
    }]
});

module.exports = mongoose.model("Member", MemberSchema);