const UsersModel = require("../model/UsersModel")

const UsersController = {
    userSignUp:async function(request,response){
        try{
        let data = request.body;
        
        const newUser = new UsersModel({
            
            email:data.email,
            password:data.password,
            firstname:data.firstname ? data.firstname: undefined,
            lastname:data.lastname ? data.lastname: undefined
        })
        let result = await UsersModel.findOne({email:data.email})
        //check already exist users
        if(result){
            response.status(200).send({
                status:false,
                message:"user already exist"
            })
        }else{
            let saveResult =await newUser.save()

        response.status(200).send({
            status:true,
            result:saveResult
        })
        }
        // 
    }catch(error){
        response.status(500).send({
            status:false,
            message:"server error",
            error
        })
    }
    },
    userLogin:async function(request,response){
        try{
        let data = request.body
        let result =await UsersModel.findOne({email:data.email})
        if(result){
            if(result.password===data.password){
                let{_id,email,firstname,lastname} = result;
            response.status(200).send({
                status:true,
                result:{
                _id,
                email,
                firstname,
                lastname
                },
                message:"login successfully"
            })
           
        }else{
            response.status(500).send({
                status:false,
                message:"password is wrong"
            })
        }
        }else{
            response.status(500).send({
                status:false,
                message:"username is wrong"
            })
        }
       

    }catch(error){
        response.status(500).send({
            status:false,
            message:"",
            error
        })
    }
    }
}
module.exports = UsersController