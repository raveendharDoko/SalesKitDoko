const express = require("express")
const { verifyUser } = require("../models/auth")
const salesCallController = require("../controllers/salesCallController")

const salesCallRouter = express.Router()

salesCallRouter.use(verifyUser)

salesCallRouter.post("/assignCall",salesCallController.assignSaleCalls)
salesCallRouter.get("/allAssignedCall",salesCallController.getAllCalls) // assign companies with contact to each employees
salesCallRouter.get("/getUserCalls",salesCallController.yourCallList) 
salesCallRouter.post("/updateReport",salesCallController.updateReport) // updating the detailed report of each attended calls in a stretch of followups
salesCallRouter.post("/changeStatus",salesCallController.updateStatus)  // updating the status of call attempt

module.exports = salesCallRouter