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

const Port=process.env.PORT || 5800;

app.listen(Port,()=>{
    console.log(`Port is listen on ${Port}`);
})