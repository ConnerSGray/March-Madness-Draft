const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let TeamSchema = new Schema({
    name: {type: String, required: true},
    knockedOut: {type: Boolean, required: true}
});

//Referencing Guidelines (Parent Referencing)
//https://dev.to/oluseyeo/how-to-create-relationships-with-mongoose-and-node-js-11c8
TeamSchema.virtual("players", {
    ref: "Player",
    localField: "_id",
    foreignField: "team"
});

TeamSchema.set('toObject', { virtuals: true });
TeamSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model("Team", TeamSchema);