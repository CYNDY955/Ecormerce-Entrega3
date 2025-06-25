const express = require("express")
const app = express();
const cors = require('cors')
const { rateLimit } = require('express-rate-limit');
const api_routes = require("./routes/index");

const limiter = rateLimit({
    windowMs: 100 * 100 * 1000000, 
    limit: 100,
    message: {
        ok: false,
        message: "ha excedido el numero de peticiones"
    }
})

app.use(limiter)

app.use(express.static('public'))
app.use('/images', express.static('public/images'))

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use("/api", api_routes )
    
module.exports = app;