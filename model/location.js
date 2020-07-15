const mongoose=require('mongoose');
// define the collection struc
const LocationSchema= mongoose.Schema({
    name:{
        type:String,
        required:true
    }


});
// creating the collection
module.exports=mongoose.model("location",LocationSchema)