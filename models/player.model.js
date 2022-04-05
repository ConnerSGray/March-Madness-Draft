const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let PlayerSchema = new Schema({
    name: {type: String, required: true},
    team: {
        type: Schema.Types.ObjectId,
        ref: "Team"
    },
    points: {type: Number, required: true},
    id: {type: String, required: true}
});

module.exports = mongoose.model("Player", PlayerSchema);