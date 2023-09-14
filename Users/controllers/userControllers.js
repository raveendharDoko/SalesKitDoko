const User = require("../schema/user.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const emailRegex = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/

const createPowers = async (req, res) => {
    try {
        let { username, email, password, role } = req.body, hashPass;

        if (!username || !email || !password || !role) {
            return res.send({ status: 1, response: "All fields are mandatory" })
        }

        if (emailRegex.test(email) === false) {
            return res.send({ status: 1, reponse: "Email format is not valid" })
        }

        if (req.userInfo.userRole !== 4) {
            return res.send({ status: 1, response: "You're not allowded to perform the task" })
        }

        hashPass = await bcrypt.hash(password, 10)

        await User.create({ username, email, password: hashPass, role })
        return res.send({ status: 1, response: "Role created" })

    } catch (error) {
        return res.send({ status: 0, response: error })
    }
}



const employeeRegister = async (req, res) => {
    try {
        let { username, email, password } = req.body, hashPass;

        if (!username || !email || !password) {
            return res.send({ status: 1, response: "All fields are mandatory" })
        }

        if (emailRegex.test(email) === false) {
            return res.send({ status: 1, reponse: "Email format is not valid" })
        }

        const checkExist = await User.findOne({ email: email })
        if (checkExist) {
            return res.send({ status: 1, response: "Employee with emailId already exist" })
        }

        hashPass = await bcrypt.hash(password, 10)

        await User.create({ username, email, password: hashPass })
        return res.send({ status: 1, response: "Registered successfully" })
    } catch (error) {
        return res.send({ status: 0, response: error })
    }
}



const login = async (req, res) => {
    try {
        let { email, password } = req.body, matchPass, token;
        const checkExist = await User.findOne({ email: email })

        if (!email || !password) {
            return res.send({ status: 1, response: "All fields are mandatory" })
        }

        if (emailRegex.test(email) === false) {
            return res.send({ status: 1, reponse: "Email format is not valid" })
        }

        if (!checkExist) {
            return res.send({ status: 1, response: "User need to register first in order to login" })
        }
        matchPass = await bcrypt.compare(password, checkExist.password)
        if (matchPass === false) {
            return res.send({ status: 1, response: "Password doesn't match" })
        }
        token = jwt.sign({ user: { userId: checkExist._id, userRole: checkExist.role, username: checkExist.username } }, process.env.JWT_SECRET, { expiresIn: "2h" })
        return res.send({ status: 1, data: "Logged successfully", token })
    } catch (error) {
        return res.send({ status: 0, response: error })
    }
}



const createRelationship = async (req, res) => {
    try {
        let { employeeId } = req.body, getUser;
        getUser = await User.findById({ _id: employeeId })

        if (req.userInfo.userRole !== 2) {
            return res.send({ status: 1, response: "You're not an manager" })
        }
        if (getUser.role !== 1) {
            return res.send({ status: 1, response: "You can't assign" })
        }
        if (getUser.managedBy !== null) {
            return res.send({ status: 1, response: `Manager already assigned to ${getUser._id}` })
        }
        await User.findByIdAndUpdate({ _id: getUser._id }, { managedBy: req.userInfo.userId })
        return res.send({ status: 1, response: "Manager assigned" })
    } catch (error) {
        return res.send({ status: 0, response: error })
    }
}



const getAllEmployees = async (req, res) => {
    try {
        let getAllEmployees = await User.find({ role: 1 })
        if (req.userInfo.userRole !== 4) {
            return res.send({ status: 1, reponse: "Not authorized" })
        }
        if (getAllEmployees.length === 0) {
            return res.send({ status: 1, data: getAllEmployees })
        }
        return res.send({ status: 1, data: getAllEmployees })
    } catch (error) {
        return res.send({ status: 0, response: error })
    }
}



const getAllAdmins = async (req, res) => {
    try {
        let getAllEmployees = await User.find({ role: 3 })
        if (req.userInfo.userRole !== 4) {
            return res.send({ status: 1, reponse: "Not authorized" })
        }
        if (getAllEmployees.length === 0) {
            return res.send({ status: 1, data: getAllEmployees })
        }
        return res.send({ status: 1, data: getAllEmployees })
    } catch (error) {
        return res.send({ status: 0, response: error })
    }
}



const getAllManagers = async (req, res) => {
    try {
        let getAllEmployees = await User.find({ role: 2 })
        if (req.userInfo.userRole !== 4) {
            return res.send({ status: 1, reponse: "Not authorized" })
        }
        if (getAllEmployees.length === 0) {
            return res.send({ status: 1, data: getAllEmployees })
        }
        return res.send({ status: 1, data: getAllEmployees })
    } catch (error) {
        return res.send({ status: 0, response: error })
    }
}



module.exports = { createPowers, login, employeeRegister, createRelationship, getAllEmployees, getAllManagers, getAllAdmins }
