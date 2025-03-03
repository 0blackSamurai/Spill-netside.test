const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const userSchema = new Schema({
    name: {type:String},
    email: {type:String, required: true, unique: true},
    password: {type:String, required: true},
    role:{type:String},
    age: {type:Number},
    adr:[{address: String,
        zipcode: String,
        city: String,
    }]

});


module.exports = mongoose.models.User || mongoose.model("User", userSchema);