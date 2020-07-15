const express=require("express");
const router=express.Router();
const LocationOperation=require('../operation/LocationOperation');
const { check, validationResult ,param} = require('express-validator');

router.post('/',[
    check('name').not().isEmpty().withMessage("Please pass the location name")
],async (req,res)=>{
    try {
        // validate the request
        let validationError= validationResult(req);
        if(!validationError.isEmpty()){
            res.status(400).json({
                "success":false,
                "message":validationError.errors
            });
            return
        }
        let operation =new LocationOperation();
        const {name}=req.body;
        // insert the record
        let insertedLocation= await operation.insertLocation(name)
        res.status(200).json({
                success:true,
                location:insertedLocation       
        });
    } catch (error) {
        console.log(typeof error,error.message);
        res.status(500).json({
            "success":false,
            "error":error.message
        })
    }
})


router.get( '/', async (req,res)=>{

    try{
        
        let operation =new LocationOperation();
        let locationList= await operation.getLocation()
        res.status(200).json(locationList);
    }catch(error){console.log(error)
            res.status(500).json({
                "success":false,
                "error":error.message
            })
    }    
})

router.delete('/:id',[param('id').isMongoId().withMessage("Please pass a valid ID")],async (req,res)=>{

    try{

        const {id}=req.params;    
        const validationError= validationResult(req);
        if (!validationError.isEmpty())
        {
            return res.status(400).json({"success":false,"error":validationError.errors})
        }
        let operation =new LocationOperation();
        let result= await operation.removeLocation(id);
        if(!result.isdeleted){
            return res.status(400).json({"success":false,error:result.error})
        }
        res.status(200).json({
                success:true,
                id:result.id          
        });
    }catch(error){
            res.status(500).json({
                "success":false,
                "error":error.message
            })
    }    
})


module.exports=router;
