const mongoose = require("mongoose");
const {model, Schema} = mongoose;

const tagSchema = new Schema({
    name:String
})

const Tag = model("Tag", tagSchema);

module.exports = Tag;