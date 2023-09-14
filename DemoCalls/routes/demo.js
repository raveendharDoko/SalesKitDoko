const express = require('express')
const { verifyUser } = require('../models/auth')
const demoController = require('../controllers/demo')

const demoCallRouter = express.Router()

demoCallRouter.use(verifyUser)

demoCallRouter.post("/assignDemo", demoController.assignDemo)
demoCallRouter.post("/updateReport", demoController.updateReport) // updating the status of demo
demoCallRouter.get("/getAllDemo", demoController.getAllDemo)
demoCallRouter.post("/updateStatus",demoController.updateStatus)


module.exports = demoCallRouter