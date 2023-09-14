const mongoose = require("mongoose")

const ObjectId = mongoose.Types.ObjectId;

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique:true
    },
    password: {
        type: String
    },
    role: {
        type: Number,
        default: 1
    },
    status: {
        type: Number,
        default: 1
    },
    managedBy: {
        type: ObjectId,
        default: null
    }
},{
    timestamps:true,
    versionKey:false
})


module.exports = mongoose.model("users", userSchema)