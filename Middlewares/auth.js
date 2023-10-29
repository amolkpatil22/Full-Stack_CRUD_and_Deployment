const jwt = require("jsonwebtoken")
const { BlacklistModel } = require("../Model/UserModel")

const auth = async (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1]
    let loginstatus = await BlacklistModel.findOne({ id: token })
    if (!loginstatus) {
        jwt.verify(token, "masai", (err, decoded) => {
            if (err) {
                res.status(200).send({ "msg": "Please Login first" })
            }
            else {
                req.body.userID = decoded.id
                next()
            }
        })
    }
    else {
        res.status(200).send({ "msg": "Please Login" })
    }

}

module.exports = auth