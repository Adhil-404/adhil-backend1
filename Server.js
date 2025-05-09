const express=require("express")
const app= express()
const bodyparser=require("body-parser")
app.use(bodyparser.json())
const db=require("./Dbconnection")
const router=require("./router")
app.use("/",router)

app.listen(5000,function(){
    console.log("Server successfully working at port 5000");
     
})  