const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const gameSchema = new Schema({
    title: {type: String},
    price: {type: Number},
    discount: {type: Number},
    publisher: {type: String},
    devolper: {type: String},
    releasedate: {type: Date},
    status: {type: String},
    description: {type: String},
    shortDescritons: {type: String},
    img: {type: String},
    tags:
    [{type: mongoose.Schema.Types.ObjectId, 
        ref: "Tag",
        required:false
    }],
    reviwes: [{type: mongoose.Schema.Types.ObjectId, 
        ref: "rewview",
        required:false
    }],

})

const Game = model("Game", gameSchema);

module.exports = Game;