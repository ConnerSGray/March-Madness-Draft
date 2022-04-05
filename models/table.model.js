const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let TableSchema = new Schema({
    name: {type: String, required: true}
});

//Referencing Guidelines (Parent Referencing)
//https://dev.to/oluseyeo/how-to-create-relationships-with-mongoose-and-node-js-11c8
TableSchema.virtual("members", {
    ref: "Member",
    localField: "_id",
    foreignField: "table"
});

TableSchema.set('toObject', { virtuals: true });
TableSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model("Table", TableSchema);