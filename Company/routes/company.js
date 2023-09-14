const express = require("express")
const { verifyUser } = require("../models/auth")
const { addCompany, getAllCompany } = require("../controllers/company")

const companyRouter = express.Router()

companyRouter.use(verifyUser)

companyRouter.post("/addCompany", addCompany)
companyRouter.get("/getAllCompany", getAllCompany)

module.exports = companyRouter
