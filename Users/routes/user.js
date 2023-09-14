const express = require("express")
const userControllers = require("../controllers/userControllers")
const { verifyUser } = require("../models/auth")

const userRouter = express.Router()


userRouter.post("/register", userControllers.employeeRegister)
userRouter.post("/login", userControllers.login)

userRouter.use(verifyUser)

userRouter.post("/createPower", userControllers.createPowers) // create Admin and manager by superAdmin 
userRouter.post("/createNetwork", userControllers.createRelationship) // adding team members by manager

userRouter.get("/getAllAdmin", userControllers.getAllAdmins)
userRouter.get("/getAllManager", userControllers.getAllManagers)
userRouter.get("/getAllEmployees", userControllers.getAllEmployees)


module.exports = userRouter

