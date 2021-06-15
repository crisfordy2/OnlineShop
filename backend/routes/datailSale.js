const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Auth = require("../middleware/auth");
const Employee = require("../middleware/employee");
const User = require("../models/user");
const Sale = require("../models/sale");
const DetailSale = require("../models/datailSale");
const Product = require("../models/product");


router.post("/add", Auth, Employee, async(req, res)=>{
    if(!req.body.idSale || !req.body.idProduct) return res.status(401).send("Imcomplete data");

    const validSale = mongoose.isValidObjectId(req.body.idSale);
    if(!validSale) return res.status(401).send("Invalid Sale");

    const validProduct = mongoose.isValidObjectId(req.body.idProduct);
    if(!validProduct) return res.status(401).send("Invalid Product");  
    
    const existSale = await Sale.findById(req.body.idSale)
    if(!existSale) return res.status(401).send("Sale dosen't exist")

    const existProduct = await Product.findById(req.body.idProduct)
    if(!existProduct) return res.status(401).send("Product dosen't exist")

    const detailSale = new DetailSale({    
        idSale: req.body.idSale,
        idProduct: req.body.idProduct
    })

    const result = await detailSale.save();
    if(!result) return res.status(401).send("Error creating DetailSale");

    return res.status(200).send({result})
})


router.get("/get", Auth, Employee, async(req, res)=>{

    const detailSale = await DetailSale.find().populate("idProduct", "name").exec();
    if(!detailSale) return res.status(401).send("No results");
    return res.status(200).send({detailSale});
})


router.put("/update", Auth, Employee, async(req, res)=>{
    if(!req.body.idSale || !req.body.idProduct || !req.body._id) return res.status(401).send("Imcomplete data");

    const validDetailSale = mongoose.isValidObjectId(req.body._id);
    if(!validDetailSale) return res.status(401).send("Invalid DetailSale");

    const validSale = mongoose.isValidObjectId(req.body.idSale);
    if(!validSale) return res.status(401).send("Invalid Sale");

    const validProduct = mongoose.isValidObjectId(req.body.idProduct);
    if(!validProduct) return res.status(401).send("Invalid Product");  

    const existDetailSale = await DetailSale.findById(req.body._id)
    if(!existDetailSale) return res.status(401).send("DetailSale dosen't exist")
    
    const existSale = await Sale.findById(req.body.idSale)
    if(!existSale) return res.status(401).send("Sale dosen't exist")

    const existProduct = await Product.findById(req.body.idProduct)
    if(!existProduct) return res.status(401).send("Product dosen't exist")

    const detailSale = await DetailSale.findByIdAndUpdate(req.body._id,{    
        idSale: req.body.idSale,
        idProduct: req.body.idProduct,
        status: true
    })

    if(!detailSale) return res.status(401).send("Error updating detailSale");
    return res.status(200).send({detailSale});    
})


router.delete("/delete/:_id", Auth, Employee, async(req, res)=>{
    if(!req.params._id) return res.status(401).send("Imcomplete data");

    const validDetailSale = mongoose.isValidObjectId(req.params._id);
    if(!validDetailSale) return res.status(401).send("Invalid DetailSale");     

    const existDetailSale = await DetailSale.findById(req.params._id)
    if(!existDetailSale) return res.status(401).send("DetailSale dosen't exist")    

    const detailSale = await DetailSale.findByIdAndDelete(req.params._id)

    if(!detailSale) return res.status(401).send("Error updating detailSale");
    return res.status(200).send("Delete");    
})


module.exports = router;
