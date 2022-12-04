//import mongoose
const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const MenuItemsSchema = new Schema({
    "name": {type:String},
    "description": {type:String},
    "ingridients": {type:Array},
    "restaurantId": {type:ObjectId},
    "image": {type:String},
    "qty": {type:Number},
    "price": {type:Number}
  })
//craete model
const MenuItemsModel = mongoose.model('menuItem',MenuItemsSchema)


module.exports = MenuItemsModel