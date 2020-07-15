const connectDb=require('../config/db');
class LocationOperation{
    constructor(){
        this.LocationModel=require('../model/location')
    }

    //add location
      async insertLocation(name){
        try{
            const locationDB= await  new this.LocationModel({
                name:name
                
            });

           return await locationDB.save();
        }catch(error){
            console.log("There was an error while inserting the data ",error);
            throw new Error("Error while inserting the data");
        }
    }

    async getLocation(){
        try{
            const locationList= await this.LocationModel.find();
            return locationList;          
        }catch(error){
            console.log("There was an error while fetching the data ",error);
            throw new Error("Error while fetching the data");
        }
    }

        // delete task
        async removeLocation(id){
           try {
               const location= await this.LocationModel.findById(id);
               if(!location){
                    console.log("Record not present");
                    return {"isdeleted":false,"error":"Record not present"}
               }
               const data=await this.LocationModel.findByIdAndRemove(id);
               console.log(data,id);
                return {"isdeleted":true,"id":id};
    
             } catch (error) {
                 console.log("error while deleting an document ",error);
                 throw new Error("Error while deleting the data")
             }
        }
    
}


    
module.exports=LocationOperation;