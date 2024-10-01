const appointmentModel = require('../models/appointmentModel')
const doctorModel=require('../models/doctorModel')
const userModels = require('../models/userModels')
const getDoctorInfoController=async(req,res)=>{
    try {
        const doctor=await doctorModel.findOne({userId:req.body.userId})
        res.status(200).send({
            success:true,
            message:'doctor data fetch success',
            data:doctor,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'error in fetching doctor details'
        })
    }
}
const updateProfileController=async(req,res)=>{
 try {
    const doctor =await doctorModel.findOneAndUpdate({userId:req.body.userId},req.body)
    res.status(201).send({
        success:true,
        message:'doctor profile updated',
        data:doctor,
    })
 } catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Doctor profile update issue',
        error
    })
 }
}
//get single doc
const getDoctorByIdConroller=async(req,res)=>{
    try {
       const doctor=await doctorModel.findOne({_id:req.body.doctorId})
       res.status(200).send({
        success:true,
        message:'single doc info fetched',
        data:doctor
       }) 
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error while fetching',
            error
        })
    }

}

const doctorAppointmentsController=async(req,res)=>{
    try {
        const doctor = await doctorModel.findOne({userId:req.body.userId})
        const appointments =await appointmentModel.find({doctorId:doctor._id})
        res.status(200).send({
            success:true,
            message:'doctor appointments fetch successfully',
            data:appointments,
         })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error while fetching',
            error
        })
    }
}

const updateStatusController =async(req,res)=>{
    try {
        const {appointmentsId,status}=req.body
        const appointments = await appointmentModel.findByIdAndUpdate(appointmentsId,{status})
        const user =await userModels.findOne({_id:appointments.userId})
        user.notification.push({
            type:'status updated',
            message:`your appointment has been updated ${status}`,
            onClickPath:'/doctor-appointments'
        })
        await user.save()
        res.status(200).send({
            success:true,
            message:"appointment status updated"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'err in update status',
            error
        })
    }
}
module.exports={getDoctorInfoController,updateProfileController,getDoctorByIdConroller,
    doctorAppointmentsController,updateStatusController}