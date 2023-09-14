const Company = require("../schema/company.js")


const addCompany = async (req, res) => {
    try {
        let { companyName, contact } = req.body;

        if (!companyName || !contact) {
            return res.send({ status: 1, response: "All fields are mandatory" })
        }

        if (req.userInfo.userRole !== 2) {
            return res.send({ status: 0, response: "You're not an manager" })
        }
        
        await Company.create({ companyName, contact })
        return res.send({ status: 1, response: "Company created" })

    } catch (error) {
        return res.send({ status: 0, response: error })
    }
}


const getAllCompany = async (req, res) => {
    try {
        let ListOfCompanies = await Company.find()
        if (ListOfCompanies.length === 0) {
            return res.send({ status: 1, data: ListOfCompanies })
        }
        return res.send({ status: 1, data: ListOfCompanies })
    } catch (error) {
        return res.send({ status: 0, response: error })
    }
}


module.exports = { addCompany, getAllCompany }