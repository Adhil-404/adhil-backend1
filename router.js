const express = require('express')
const Router = express.Router()
const {authorization}=require("./Orders/Middleware/Auth")

const usercontroller = require("./userController")

Router.post("/userreg", usercontroller.userRegistration)
Router.get("/userlist", usercontroller.userlist)
Router.get("/user/:username", usercontroller.singleuser)
// Router.delete("/user/:userid", usercontroller.deleteuser)
Router.delete("/userD",authorization,usercontroller.deleteuser)
Router.put("/user/", usercontroller.userUpdate)
Router.get("/userfind", usercontroller.userdeatails)
Router.post("/login",usercontroller.login)

const productcontroller = require("./Product/productcontroller")

Router.post("/productreg", productcontroller.ProductAdd)
Router.get("/productlist", productcontroller.Productlist)
Router.get("/singleproduct/:Name", productcontroller.singleProduct)
Router.delete("/product/:productid", productcontroller.deleteProduct)
Router.put("/productupdate/:productid", productcontroller.productupdate)
Router.get("/productdeatails", productcontroller.productdeatails)


const OrderController = require("./Orders/OrderController")


Router.post("/order",OrderController.Ordercart)
Router.get("/cart",OrderController.usercart)
module.exports = Router