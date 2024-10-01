const express=require('express')
const { getDoctorInfoController, updateProfileController, getDoctorByIdConroller, doctorAppointmentsController, updateStatusController } = require('../controllers/doctorCtrl')
const authMiddleware =require('../middlewares/authMiddleware')

const router=express.Router()
//post Single Doc info
router.post('/getDoctorInfo',authMiddleware,getDoctorInfoController)

//post  update profile
router.post('/updateProfile', authMiddleware,updateProfileController)

//post get single doc info
router.post('/getDoctorById',authMiddleware,getDoctorByIdConroller)

//get appointments
router.get('/doctor-appointments',authMiddleware,doctorAppointmentsController)

//post update status
router.post('/update-status',authMiddleware,updateStatusController)
module.exports=router