const RestuarantModel = require("../model/RestuarantModel")
const restuarantList = require("../resources/restaurant.json")
const RestuarantController ={
    getRestauarantList:async function(request,response){
        try{
let result = await RestuarantModel.find()
        
        response.status(200).send({
            status:true,
            reasuarant:result
        })
    }catch(error){
        response.status(500).send({
            status:false,
            error
        })
    }
    },
    addRestuarantList:async function(request,response){
        try{
        let result = await RestuarantModel.insertMany(restuarantList)
        response.status(200).send({
            status:true,
            message:"added successfully",
            result:result
        })
    }catch(error){
        response.status(500).send({
            status:false,
            error
        })
    }
    },
    getRestuarantDetailsById:async function(request,response){
        try{
        let {id} = request.params;
        let data =await RestuarantModel.findById(id)
        response.status(200).send({
            status:true,
            result:data,
        })
    }catch(error){
        response.status(500).send({
            status:false,
            error
        })
    }
    },
    getRestuarantLocationId:async function(request,response){
        let {lid,rest} = request.query 
        // console.log(lid,rest);
        try {
            let data = await RestuarantModel.find(
              {
                name: { $regex: rest + ".*", $options: "i" },
                location_id: Number(lid),
              },
              {name: 1,
                image: 1,
                location: 1,
                locality: 1,
                city: 1,}
            );
            response.status(200).send({ status: true, result: data });
          }catch (error) {
            response.status(500).send({
              status: false,
              message: "server error",
              error,
            });
          }
        
    },
    filterRestuarant:async function(request,response){
        let {mealtype,
            location,
            cuisine,
            lcost,
            hcost,
            page,
            sort,
            itemsPerPage,
        } = request.body;
        sort = sort ? sort :1;
        page = page ? page :1;
        //  itemsPerPage = 2;
        itemsPerPage = itemsPerPage ? itemsPerPage : 2;

        let startingIndex = page * itemsPerPage - itemsPerPage;
        let lastIndex = page * itemsPerPage;
        
        let filterObject = {}
        if(mealtype) filterObject["mealtype_id"] = mealtype 
        if(location) filterObject["location_id"] = location
        if(cuisine) filterObject["cuisine_id"] = {$in:cuisine}
        if(lcost && hcost ) filterObject["min_price"] = {$lte:hcost, $gte:lcost};
        cuisine && (filterObject["cuisine_id"] = { $in: cuisine });
        try{
       let result = await RestuarantModel.find(filterObject,{
        aggregate_rating: 1,
        city: 1,
        image: 1,
        locality: 1,
        name: 1,
        min_price: 1,
        cuisine: 1,
       }).sort({
        min_price:sort,
    })
    const filterResult = result.slice(startingIndex,lastIndex)
        response.status(200).send({
            status:true,
            result:filterResult
        })
    }catch(error){
        response.status(500).send({
            status:false,
            message:"server error"
        })
    }
    }
}

module.exports = RestuarantController