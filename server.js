const express=require("express");
const path=require("path");
const port=process.env.PORT || 5000;
const fileUpload=require("express-fileupload");

let intial_path=path.join(__dirname,"public");

const app=express();


app.use(express.json());
app.use(express.static(intial_path));
app.use(fileUpload());

app.get("/",(req,res)=>{
    res.sendFile(path.join(intial_path,"index.html"));
})

app.get("/editor",(req,res)=>{
    res.sendFile(path.join(intial_path,"editor.html"));
})

app.post("/upload",(req,res)=>{
    let file=req.files?.image;
    let date=new Date();
    // image name
    let imageName=date.getDate() + date.getTime() + file.name;
    // upload path
    let path="public/uploads/"+imageName;
    // create upload
    file.mv(path,(err,result)=>{
        if(err){
            throw err;
        }else{
            res.json(`uploads/${imageName}`);
        }
    })
})

app.get("/:blog",(req,res)=>{
    res.sendFile(path.join(intial_path,"blog.html"));
})
app.use((req,res)=>{
    res.json("404");
})

app.listen(port,()=>{
    console.log("Listening at port",port);
})