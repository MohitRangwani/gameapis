const mongoose=require('mongoose');
// define the collection struc
const ProviderSchema= mongoose.Schema({
    locationId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'locations'
    },
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    }

});
// creating the collection
module.exports=mongoose.model("provider",ProviderSchema)