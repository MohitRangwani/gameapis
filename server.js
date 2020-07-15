const express=require("express");
const app=express();
const PORT= process.env.PORT || 3000;
const connectDb=require('./config/db');

// create connection request globally
connectDb()

// initialize middleware
app.use(express.json({extended:false}))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
// define routes
app.use('/api/location',require('./route/location'));
app.use('/api/provider',require('./route/provider'));


app.listen(PORT,(error)=>{
    if(error){
        throw new Error("There was an error while listening to port number ",PORT)
    }else{
        console.log("Application running on port number ",PORT)
    }
})     