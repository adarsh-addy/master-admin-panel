require('dotenv').config();
const express=require("express")
const morgan =require("morgan")
const cors=require('cors')
const app=express();
app.use(morgan());
app.use(cors());

app.use(express.json());

app.get('/',(req,res)=>{
    console.log("server is running");
    res.json({
        message:"Server is running"
    })
})

const BackendRouter=require('./router/backend');
app.use('/backend',BackendRouter);




// const errorHandler = require("./utils/errorHandler.js")
// to handle errors*************************************************************
// app.use('*', (req, res,next) => {
//     const error = new Error("resources not found");
//     error.status = 404;


//     next(error);

// })

// app.use('*', (error, req, res, next) => {
//     errorHandler(error,res)
// })
// ********************************************************************************************
app.use('*', (req, res) => {
    
    res.status(404).send("route not found")
      // res.sendStatus(404)
  
  })

const Port=process.env.PORT || 5800;

app.listen(Port,()=>{
    console.log(`Port is listen on ${Port}`);
})