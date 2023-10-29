const mongoose = require("mongoose")


const ProductSchema = mongoose.Schema({
    title: String,
    description: String,
    category: String,
    price: Number,
    userID: String
})

const ProductModel = mongoose.model("product", ProductSchema)

module.exports = ProductModel