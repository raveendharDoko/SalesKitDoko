const SalesCalls = require("../schema/salesCall.js")


const assignSaleCalls = async (req, res) => {
    try {
        let { companyId, assignedTo } = req.body, checkIfAssigned;

        if (!companyId || !assignedTo) {
            return res.send({ status: 1, response: "All fields are mandatory" })
        }

        if (req.userInfo.userRole !== 2) {
            return res.send({ status: 0, response: "You're not an manager" })
        }
        checkIfAssigned = await SalesCalls.findOne({ companyId: companyId })
        if (checkIfAssigned) {
            return res.send({ status: 1, response: `This company already assigned to ${checkIfAssigned.assignedTo} ` })
        }

        await SalesCalls.create({ companyId, assignedTo, assignedBy: req.userInfo.userId })
        return res.send({ status: 1, response: "Call assigned" })

    } catch (error) {
        return res.send({ status: 0, response: error.message })
    }
}


const yourCallList = async (req, res) => {

    try {
        let getCallList = await SalesCalls.find({ assignedTo: req.userInfo.userId })
        let getCompany = await SalesCalls.aggregate([{
            $lookup: {
                from: "companies",
                localField: "companyId",
                foreignField: "_id",
                as: "getCompany",
            },
        }])

        if (getCallList.length === 0) {
            return res.send({ status: 1, response: getCallList })
        }
        let info = getCompany.map((call) => {
            let obj = {}
            obj.companyId = call.companyId
            obj.assignedBy = call.assignedBy
            obj.assignedOn = call.assignedDate
            obj.status = call.status
            obj.companyNumber = call.getCompany[0].contact
            return obj
        })
        return res.send({ status: 0, response: info })

    } catch (error) {
        return res.send({ status: 0, response: error.message })
    }
}


const updateReport = async (req, res) => {
    try {
        let { callId, report } = req.body, getCall;

        if (!callId || !report) {
            return res.send({ status: 1, response: "All fields are mandatory" })
        }

        getCall = await SalesCalls.findById({ _id: callId })
        if (getCall.assignedTo = req.userInfo.userId)
            if (!getCall) {
                return res.send({ status: 1, response: "No sales call found" })
            }
        await SalesCalls.findByIdAndUpdate({ _id: getCall._id }, { $push: { remarks: [{ data: report }] } })
        return res.send({ status: 1, response: "Report updated" })
    } catch (error) {
        return res.send({ status: 0, response: error.message })
    }
}


const getAllCalls = async (req, res) => {
    try {
        let getAssignedCalls;

        getAssignedCalls = await SalesCalls.find({ assignedBy: req.userInfo.userId })
        if (!getAssignedCalls) {
            return res.send({ status: 1, data: getAssignedCalls })
        }
        return res.send({ status: 1, data: getAssignedCalls })
    } catch (error) {
        return res.send({ status: 0, response: error.message })
    }
}

// status 1 = In progress
// status 2 = Call not answered
// status 3 = Call attended and customer is busy
// status 4 = Call attended and informed to call in a schedule
// status 5 = Call attended and conveienced for demo
// status 6 = Call attended and customer not showing interest

const updateStatus = async(req,res)=>{
    try {
        let {status,id} = req.body,getCall;

        getCall = await SalesCalls.findById({_id:id})

        if(!getCall){
            return res.send({status:1,response:"No calls found"})
        }
        await SalesCalls.findByIdAndUpdate({_id:id},{status:status})
        return res.send({status:1, response:"Status updated"})

    } catch (error) {
        return res.send({status:0, response: error.message})
    }
}


module.exports = { assignSaleCalls, yourCallList, updateReport,getAllCalls,updateStatus }

