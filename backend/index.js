const express = require("express");
const cors = require("cors");
require("dotenv").config();

const {dataBase} = require("./db/db");
const User = require("./routes/user");
const Rol = require("./routes/rol");
const Auth = require("./routes/auth");
const Category = require("./routes/category");
const Product = require("./routes/product");
const Sale = require("./routes/sale");
const DetailSale = require("./routes/datailSale");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/user/", User);
app.use("/api/rol/", Rol);
app.use("/api/auth/", Auth);
app.use("/api/category/", Category);
app.use("/api/product/", Product);
app.use("/api/sale/", Sale)
app.use("/api/detailSale/", DetailSale)






app.listen(process.env.PORT, ()=>{
    console.log("Server running on port", process.env.PORT)
});

dataBase();