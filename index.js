const express = require("express")
const { connection } = require("./db/db")
const { userRoute } = require("./Routes/User.Route")
const ProductRoute = require("./Routes/Product.Route")
const cors = require("cors")
const app = express()

app.use(cors())
app.use(express.json())
app.use("/user", userRoute)
app.use("/product", ProductRoute)

app.listen(8080, async () => {
    try {
        await connection
        console.log("Server is running")
    }
    catch (err) {
        console.log("Error while running the server")
    }
})