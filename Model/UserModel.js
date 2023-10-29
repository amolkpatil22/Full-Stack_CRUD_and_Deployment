const mongoose = require("mongoose")


const UserSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
})

const BlacklistSchema = mongoose.Schema({
    id: String
})

const BlacklistModel = mongoose.model("blacklist", BlacklistSchema)
const UserModel = mongoose.model("user", UserSchema)

module.exports = { UserModel, BlacklistModel }