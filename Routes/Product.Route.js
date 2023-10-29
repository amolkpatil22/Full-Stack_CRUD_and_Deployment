const express = require("express")
const ProductModel = require("../Model/ProductModel")
const auth = require("../Middlewares/auth")

const ProductRoute = express.Router()
ProductRoute.use(auth)


ProductRoute.get("/", async (req, res) => {
    try {
        let products = await ProductModel.find()
        res.status(200).send({ "msg": "Data fetched Successfully", "data": products })
    }
    catch (err) {
        res.status(400).send({ "Error": `${err}` })
    }
})

ProductRoute.post("/add", async (req, res) => {
    try {
        let product = ProductModel(req.body)
        await product.save()
        res.status(200).send({ "msg": "Data fetched Successfully", "data": product })
    }
    catch (err) {
        res.status(400).send({ "Error": `${err}` })
    }
})

ProductRoute.patch("/update/:id", async (req, res) => {
    let { id } = req.params
    let userID = req.body.userID
    try {
        let product = await ProductModel.findOne({ _id: id })
        if (userID == product.userID) {
            await ProductModel.findOneAndUpdate({ _id: id }, req.body)
            res.status(200).send({ "msg": "Product Updated Successfully", "UpdatedData": req.body })
        }
        else {
            res.status(200).send({ "msg": "You are not Authorized" })
        }
    }
    catch (err) {
        res.status(400).send({ "Error": `${err}` })
    }
})


ProductRoute.delete("/delete/:id", async (req, res) => {
    let { id } = req.params
    let userID = req.body.userID
    try {
        let product = await ProductModel.findOne({ _id: id })
        if (userID == product.userID) {
            await ProductModel.deleteOne({ _id: id })
            res.status(200).send({ "msg": "Product Deleted Successfully" })
        }
        else {
            res.status(200).send({ "msg": "You are not Authorized" })
        }
    }
    catch (err) {
        res.status(400).send({ "Error": `${err}` })
    }
})

module.exports = ProductRoute