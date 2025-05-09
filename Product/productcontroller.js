const productcontroller = require("./productSchema")

const ProductAdd = ((req, res) => {
    const Product = new productcontroller({
        Name: req.body.name,
        Model: req.body.model,
        Price: req.body.price,
        category: req.body.category
    })
    Product.save()
        .then((result) => {
            console.log(result);
            res.json({
                msg: "Registered successfullu",
                data: result
            })
        })
        .catch((err) => {
            res.json({
                err: err

            })
        })
})

const Productlist = ((req, res) => {
    productcontroller.find()
        .then((result) => {
            console.log(result);
            res.json(result)
        })
        .catch((err) => {
            res.json({
                err: err
            })
        })
})

const singleProduct = ((req, res) => {
    let Name = req.params.name
    productcontroller.find({ Name: Name })
        .then((result) => {
            console.log(result);
            res.json(result)
        })
        .catch((err) => {
            res.json({
                err: err
            })
        })
})
const deleteProduct = ((req, res) => {
    let productid = req.params.productid
    productcontroller.findByIdAndDelete(productid)
        .then((result) => {
            console.log(result);
            res.json(result)
        })
        .catch((err) => {
            res.json({
                err: err
            })
        })
})

const productupdate = ((req, res) => {
    let productid = req.params.productid
    let { Name, Model, Price, category } = req.body
    productcontroller.findByIdAndUpdate(productid, { Name, Model, Price, category })
        .then((result) => {
            console.log(result);
            res.json(result)

        })
        .catch((err) => {
            res.json({
                err: err
            })
        })
})

const productdeatails=((req,res)=>{
    let productfind=req.query.name;
    productcontroller.find({Name:productfind})
    .then((result)=>{
        console.log(result);
        res.json(result)
    })
    .catch((err)=>{
        res.json({
            err:err
        })
    })
})

module.exports = { ProductAdd, Productlist, singleProduct, deleteProduct, productupdate,productdeatails }