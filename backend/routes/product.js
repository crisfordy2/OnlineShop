const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Category = require("../models/category");
const Auth = require("../middleware/auth");
const Employee = require("../middleware/employee");
const Product = require("../models/product");
const Provider = require("../models/user");


router.post("/add", Auth, Employee, async(req, res)=>{
    if(!req.body.name || !req.body.price || !req.body.idProvider || !req.body.idCategory) return res.status(401).send("Imcomplete data");

    const validCategory = mongoose.isValidObjectId(req.body.idCategory);
    if(!validCategory) return res.status(401).send("Invalid Category");

    const validProvider = mongoose.isValidObjectId(req.body.idProvider);
    if(!validProvider) return res.status(401).send("Invalid Provider");  
    
    const existCategory = await Category.findById(req.body.idCategory)
    if(!existCategory) return res.status(401).send("Category dosen't exist")

    const existProvider = await Provider.findById(req.body.idProvider)
    if(!existProvider) return res.status(401).send("Provider dosen't exist")

    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        idProvider: req.body.idProvider,
        idCategory: req.body.idCategory
    })

    const result = await product.save();
    if(!result) return res.status(401).send("Error creating product");

    return res.status(200).send({result})
})


router.get("/get/:name?", Auth, async(req, res)=>{

    const products = await Product.find({name: new RegExp(req.params["name"], "i")}).populate("idCategory", "name").exec();

    if(!products) return res.status(401).send("No Results");
    return res.status(200).send({products});
})



router.put("/update", Auth, Employee, async(req, res)=>{
    if(!req.body.name || !req.body.price || !req.body.idProvider || !req.body.idCategory || !req.body._id) return res.status(401).send("Imcomplete data");

    const validCategory = mongoose.isValidObjectId(req.body.idCategory);
    if(!validCategory) return res.status(401).send("Invalid Category");

    const validProvider = mongoose.isValidObjectId(req.body.idProvider);
    if(!validProvider) return res.status(401).send("Invalid Provider");  

    const validProduct = mongoose.isValidObjectId(req.body._id);
    if(!validProduct) return res.status(401).send("Invalid Product");
    
    const existCategory = await Category.findById(req.body.idCategory)
    if(!existCategory) return res.status(401).send("Category dosen't exist")

    const existProvider = await Provider.findById(req.body.idProvider)
    if(!existProvider) return res.status(401).send("Provider dosen't exist")

    const existProduct = await Product.findById(req.body._id)
    if(!existProduct) return res.status(401).send("Product dosen't exist")

    const product = await Product.findByIdAndUpdate(req.body._id,{
        name: req.body.name,
        price: req.body.price,
        idProvider: req.body.idProvider,
        idCategory: req.body.idCategory,
        status: true
    })

    if(!product) return res.status(401).send("Error updating product");
    return res.status(200).send({product});
    
})


router.put("/delete", Auth, Employee, async(req, res)=>{
    if(!req.body.name || !req.body.price || !req.body.idProvider || !req.body.idCategory || !req.body._id) return res.status(401).send("Imcomplete data");

    const validCategory = mongoose.isValidObjectId(req.body.idCategory);
    if(!validCategory) return res.status(401).send("Invalid Category");

    const validProvider = mongoose.isValidObjectId(req.body.idProvider);
    if(!validProvider) return res.status(401).send("Invalid Provider");  

    const validProduct = mongoose.isValidObjectId(req.body._id);
    if(!validProduct) return res.status(401).send("Invalid Product");
    
    const existCategory = await Category.findById(req.body.idCategory)
    if(!existCategory) return res.status(401).send("Category dosen't exist")

    const existProvider = await Provider.findById(req.body.idProvider)
    if(!existProvider) return res.status(401).send("Provider dosen't exist")

    const existProduct = await Product.findById(req.body._id)
    if(!existProduct) return res.status(401).send("Product dosen't exist")

    const product = await Product.findByIdAndUpdate(req.body._id,{
        name: req.body.name,
        price: req.body.price,
        idProvider: req.body.idProvider,
        idCategory: req.body.idCategory,
        status: false
    })

    if(!product) return res.status(401).send("Error updating product");
    return res.status(200).send({product});
    
})

module.exports = router;