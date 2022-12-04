let mealTypeModel = require("../model/MealTypeModel")
let mealType = require("../resources/mealtype.json")
const MealTypeController = {
    apiHome:function(request,response){
        response.status(200).send({
            status:true,
        })
    },
    getMealType:async function(request,response){
        try{
        let result  = await mealTypeModel.find()
        response.status(200).send({
            status:true,
            mealType:result
        })
    }catch(error){
        response.status(500).send({
            status:false,
            error
        })
    }
    },
    addMealType:async function(request,response){
        try{
            
        let result =await mealTypeModel.insertMany(mealType)
        response.status(200).send({
            status:true,
            message:"mealtype added succesfully",
            result:result
        })
    }catch(error){
        response.status(500).send({
            status:false,
            message:"server error",
            error
        })
    }
    }
}


module.exports = MealTypeController;