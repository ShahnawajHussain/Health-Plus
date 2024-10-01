const mongoose = require("mongoose")
const doctorSchema = new mongoose.Schema({
    userId:{
        type:String,
    },
    firstName:{
        type:String,
        required:[true,'first name is required'],
    },
    lastName:{
        type:String,
        required:[true,'last name is required'],
    },
    phone:{
        type:String,
        required:[true,'phone number is required'],
    },
    email:{
        type:String,
        required:[true,'email is required'],
    },
    website:{
        type:String,

    },
    specialization:{
        type:String,
        required:[true,'specialization is required']

    },
    experiance:{
        type:String,
        required:[true,'experiance is required'],
    },
    feesperconsultation:{
        type:Number,
        required:[true,'fee is required'],
    },
    status:{
       type:String,
       default:'pending',  
    },
    timing:{
        type:Object,
        required:[true,'work timing is required'],
    }

},{timeStamps:true})

const doctorModel = mongoose.model("doctors",doctorSchema);
module.exports=doctorModel;