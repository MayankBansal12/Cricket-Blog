const express=require("express");
const path=require("path");
const port=process.env.PORT || 5000;

let intial_path=path.join(__dirname,"public");

const app=express();

app.use(express.json());
app.use(express.static(intial_path));

app.get("/",(req,res)=>{
    res.sendFile(path.join(intial_path,"home.html"));
})

app.listen(port,()=>{
    console.log("Listening at port",port);
})