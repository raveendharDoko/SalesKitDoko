const DemoCall = require("../schema/demo.js")


const assignDemo = async (req, res) => {
    try {
        let { callId, assignedTo } = req.body

        if (!callId || !assignedTo) {
            return res.send({ status: 1, response: "All fields are mandatory" })
        }

        checkIfAssigned = await DemoCall.findOne({ callId: callId })
        if (checkIfAssigned) {
            return res.send({ status: 1, response: `This demo is already assigned to ${checkIfAssigned.assignedTo} ` })
        }

        await DemoCall.create({ callId, assignedTo, assignedBy: req.userInfo.userId })
        return res.send({ status: 1, response: "Call assigned" })

    } catch (error) {
        return res.send({ status: 0, response: error })
    }
}



const updateReport = async (req, res) => {
    try {
        let { callId, report } = req.body, getCall;

        if (!callId || !report) {
            return res.send({ status: 1, response: "All fields are mandatory" })
        }

        getCall = await DemoCall.findById({ _id: callId })
        if (getCall.assignedTo = req.userInfo.userId)
            if (!getCall) {
                return res.send({ status: 1, response: "No sales call found" })
            }
        await DemoCall.findByIdAndUpdate({ _id: getCall._id }, { $push: { remarks: [{ data: report }] } })
        return res.send({ status: 1, response: "Report updated" })

    } catch (error) {
        return res.send({ status: 0, response: error.message })
    }
}



const getAllDemo = async (req, res) => {
    try {
        let ListOfDemos = await DemoCall.find()
        if (ListOfDemos.length === 0) {
            return res.send({ status: 1, data: ListOfDemos })
        }
        return res.send({ status: 1, data: ListOfDemos })
    } catch (error) {
        return res.send({ status: 0, response: error })
    }
}


// status 1 = In progress
// status 2 = Demo completed and waiting for customer response
// status 3 = Demo completed and customer need one more demo 
// status 4 = Demo completed and customer likes to move forward
// status 5 = Demo completed and customer not moving forward


const updateStatus = async(req,res)=>{
    try {
        let {status,id} = req.body,getDemo;

        getDemo = await DemoCall.findById({_id:id})
        
        if(!getDemo){
            return res.send({status:1,response:"No demo found"})
        }
        await DemoCall.findByIdAndUpdate({_id:id},{status:status})

        return res.send({status:1, response:"Status updated"})

    } catch (error) {
        return res.send({status:0, response: error.message})
    }
}

module.exports = { assignDemo, updateReport, getAllDemo, updateStatus }