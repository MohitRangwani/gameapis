const connectDb=require('../config/db');
class ProviderOperation{
    constructor(){
        this.ProviderModel=require('../model/providers')
    }
     //add location
     async insertProvider(locationId,name,address){
        try{
            const locationDB= await  new this.ProviderModel({
                name:name,
                locationId:locationId,
                address:address
            });

           return await locationDB.save();
        }catch(error){
            console.log("There was an error while inserting the data ",error);
            throw new Error("Error while inserting the data");
        }
    }

    async getProviders(){
        try{
            const providerList= await this.ProviderModel.find();
            return providerList;          
        }catch(error){
            console.log("There was an error while fetching the data ",error);
            throw new Error("Error while fetching the data");
        }
    }
}


    
module.exports=ProviderOperation;