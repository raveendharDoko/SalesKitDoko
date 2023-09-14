const express = require('express');
const mongoose = require('mongoose');
const companyRouter = require('./routes/company');
const helmet = require("helmet")
require("dotenv").config()

mongoose.connect(process.env.MONGO_URL)
    .then(console.log("Mongo connected"))
    .catch(err => console.log(err))


const app = express()

app.use(express.json())

app.use(helmet({
    xDownloadOptions: false,
    originAgentCluster: false,
    xDnsPrefetchControl: false,
    xXssProtection: false,
}))

app.use("/",companyRouter)

let port = process.env.PORT
app.listen(port, () => {
    console.log(`Server started on ${port}`);
});