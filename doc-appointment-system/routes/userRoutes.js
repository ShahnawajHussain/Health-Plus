const express =require('express')
const { loginController, registerController,
 authController, applyDoctorController,
 getAllNotificationController,deleteAllNotificationController,
  getAllDoctorssController,bookAppointmentController, bookingAvailabilityController, 
  userAppointmentsController} = require('../controllers/userCtrl')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.post('/login',loginController)
router.post('/register',registerController)

//auth||post
router.post('/getUserData',authMiddleware,authController)
//apply Doctor||post
router.post('/apply-doctor',authMiddleware,applyDoctorController)
//notification ||post
router.post('/get-all-notification',authMiddleware,getAllNotificationController)
//notification ||post
router.post('/delete-all-notification',authMiddleware,deleteAllNotificationController)

//get all doc
router.get('/getAllDoctorss',authMiddleware,getAllDoctorssController)

//book appointment
router.post('/book-appointment',authMiddleware,bookAppointmentController)

//booking availability
router.post('/booking-availability',authMiddleware,bookingAvailabilityController)

//appointment list
router.get('/user-appointments',authMiddleware,userAppointmentsController)
module.exports =router;