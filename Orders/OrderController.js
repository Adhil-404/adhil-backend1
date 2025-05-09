const ordercontroller = require("./orderSchema")
const jwt = require('jsonwebtoken');


const Ordercart = ((req, res) => {
    console.log(req.headers.authorization);
    let token=req.headers.authorization.slice(7)
    let decode=jwt.decode(token)
    console.log(decode,token)
    let userId=decode._id

    const { productId } = req.body;
    const cart = new ordercontroller({
        productId,
        userId

    })
    cart.save()
        .then((result) => {
            console.log(result);
            res.json({
                msg: "success",
                data: result
            })

        })
        .catch((err) => {
            res.json({
                err: err
            })
        })
})

const usercart=((req,res)=>{
    console.log(req.headers.authorization);
let token=req.headers.authorization.slice(7)
console.log(token);
let decode=jwt.decode(token)
let userid=decode._id
console.log(decode);

    ordercontroller.find({userId:userid})
    .populate("productId")
    .select("-userid")
    .then((result) => {
        console.log(result);
        res.json(result)
    })
    .catch((err) => {
        res.json({
            err:err
        })
    })
})




module.exports = { Ordercart,usercart }