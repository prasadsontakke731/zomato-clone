//import mongoose
const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const mealTypeSchema = new Schema({
    name:{type:String},
    content:{type:String},
    image:{type:String},
    meal_type:{type:Number}
})
//craete model
const MealTypeModel = mongoose.model('mealType',mealTypeSchema)


module.exports = MealTypeModel