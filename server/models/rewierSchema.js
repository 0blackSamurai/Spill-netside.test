const mongoose = require("mongoose");

const{model, Schema} = mongoose;

const rewviewSchema = new Schema ({
    user:{type:mongoose.Schema.Types.ObjectId, ref:"user", required: true},
    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game",
        required: true
    },
    comment:String,
    recommended:Boolean,
    stars:{type: Number, 
        min: [1,"please give a posotive number between 1-6"],
        Max: [6, "please give a posotive number between 1-6"]
    }
})

const rewview = model("rewview", rewviewSchema);

module.exports = rewview