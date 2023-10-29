const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { UserModel, BlacklistModel } = require("../Model/UserModel")

const userRoute = express.Router()


userRoute.post("/register", (req, res) => {
    try {
        bcrypt.hash(req.body.password, 5, async (err, hash) => {
            if (err) {
                res.status(200).send({ "msg": "Unable to hash the password" })
            }
            else {
                let newUser = UserModel({ ...req.body, password: hash })
                await newUser.save()
                res.status(200).send({ "msg": "user addedd successfully", "data": newUser })
            }
        })
    }
    catch (err) {
        res.status(400).send({ "Error": `${err}` })
    }
})


userRoute.post("/login", async (req, res) => {
    try {
        let user = await UserModel.findOne({ email: req.body.email })
        if (user) {
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    res.status(200).send({ "msg": "Invalid User Credential" })
                }
                else {
                    let token = jwt.sign({ id: user._id }, "masai")
                    res.status(200).send({ "msg": "User logged in Successfully", "token": token, "username": user.username })
                }
            })
        }
        else {
            res.status(200).send({ "msg": "User doesnt exitst in database" })
        }

    }
    catch (err) {
        res.status(400).send({ "Error": `${err}` })
    }
})

userRoute.get("/logout", async (req, res) => {
    let token = req.headers.authorization?.split(" ")[1]
    try {
        let blacklistToken = BlacklistModel({ id: token })
        await blacklistToken.save()
        res.status(200).send({ "msg": "Logged out Successfully" })
    }
    catch (err) {
        res.status(400).send({ "Error": `${err}` })
    }
})


module.exports = { userRoute }
