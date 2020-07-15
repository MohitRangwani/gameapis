const express=require("express");
const router=express.Router();
const ProviderOperation=require('../operation/ProviderOperation');
const { check, validationResult ,param} = require('express-validator');


router.post('/',[
    check('name').not().isEmpty().withMessage("Please pass the provider name"),
    check('address').not().isEmpty().withMessage("Please pass the provider address"),
    check('locationId').not().isEmpty().withMessage("Please pass the provider's location"),
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
        let operation =new ProviderOperation();
        const {locationId,name,address}=req.body;
        // insert the record
        let insertedProvider= await operation.insertProvider(locationId,name,address)
        res.status(200).json({
                success:true,
                provider:insertedProvider       
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
        
        let operation =new ProviderOperation();
        let providerList= await operation.getProviders();
        res.status(200).json(providerList);
    }catch(error){console.log(error)
            res.status(500).json({
                "success":false,
                "error":error.message
            })
    }    
})
module.exports=router