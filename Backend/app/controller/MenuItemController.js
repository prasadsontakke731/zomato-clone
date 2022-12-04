let MenuItemsModel = require("../model/MenuItemsModel")
let menuItems = require("../resources/menuitems.json")
const MenuItemsController = {
    getMenuItems:async function(request,response){
        let id = request.query.rid;
        id = id ? id : 0;
       
        try{
        let result  = await MenuItemsModel.find({ restuarantId : id})
        response.status(200).send({
            status:true,
            menuItems:result,
            
        })
    }catch(error){
        response.status(500).send({
            status:false,
            error
        })
    }
    },
    addMenuItems:async function(request,response){
        try{      
        let result =await MenuItemsModel.insertMany(menuItems)
        response.status(200).send({
            status:true,
            message:"MenuItems added succesfully",
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


module.exports = MenuItemsController;