const express = require('express');
const app = express();
const {JsonDB,Config} = require('node-json-db')

var db = new JsonDB(new Config("data", true, false, '/'));


const getData = async(path)=>{
    try{
       return await db.getData(path);
    }
    catch(error){
        console.log("Error occured : ",error);
        return null;
    }
}


app.get("/",(req,res)=>{
    res.send("<h1>Home Page</h1><a href=/api/resources>Resouces</a>");
})
app.get("/api/resources",async(req,res)=>{
    try{
        const data = await getData("/resources")
        res.status(200).json(data);
    }
    catch(error){
        console.log("Error occured : ",error);
        res.status(500).json({error : "Error"})
    }
});
app.get("/api/resources/:id", async (req,res) => {
    try{
        const {id} = req.params;
        console.log(id);
        const resources = await getData("/resources")
        const resource = resources.find( (resource) =>  resource.id == id );
        if(!resource){
            res.send("<h1>Error 404 : Resource Not Found</h1>");
            return;
        }
        //console.log(resource);
        res.status(200).json(resource);
    }
    catch(error){
        console.log("Error occured : ",error);
        res.status(500).json({error : "Error"})
    }
})

app.all("*",(req,res)=>{
    res.send("<h1>Error 404 : Resource Not Found</h1>");
})
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server hosted on port : ${PORT}`);
})