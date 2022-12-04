//import mongoose
const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{type:String},
    password:{type:String},
    firstname:{type:String},
    lastname:{type:String}
})
//craete model
const UsersModel = mongoose.model('user',userSchema)


module.exports = UsersModel