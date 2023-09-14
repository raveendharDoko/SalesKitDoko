const mongoose = require("mongoose")

let ObjectId = mongoose.Types.ObjectId
const demoAssignSchema = mongoose.Schema({
    callId: {
        type: ObjectId
    },
    status:{
        type:Number,
        default:1
    },
    assignedTo:{
        type:ObjectId,
        ref:"users"
    },
    assignedBy:{
        type:ObjectId,
        ref:"users"
    },
    remarks:[
        {
            enteredDate: { type: String, default: Date.now() },
            data: { type: String }
        }
    ],
},
{
    timestamps:true,
    versionKey:false
})

module.exports = mongoose.model("demoCall",demoAssignSchema)