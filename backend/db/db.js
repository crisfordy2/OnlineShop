const mongoose = require("mongoose");

const dataBase = async ()=>{
    await mongoose.connect(process.env.DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }).then(()=>{
        console.log("DB On")
    })
    .catch(()=>{
        console.log("DB off")
    })
}

module.exports = {dataBase};