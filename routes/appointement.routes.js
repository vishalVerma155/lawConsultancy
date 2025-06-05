const {createAppointment, getAllAppointments, getAppointmentById, deleteAppointment, updateAppointment} = require('../controllers/appointement.controllers.js');
const express = require('express');
const verifyJWT = require('../middleware/auth.middleware.js');
const {upload} = require('../utils/multer.js')

const router = express.Router();

// 🔹 Create a new appointment
router.post("/createAppointement",upload.fields([
  { name: 'idPhoto', maxCount: 1 },
  { name: 'additionalDocs', maxCount: 10 }
]), createAppointment);

// 🔹 Get all appointments
router.get("/getAllAppointement",verifyJWT, getAllAppointments);

// 🔹 Get a single appointment by ID
router.get("/getAppointementById/:id", verifyJWT, getAppointmentById);

// 🔹 Update an appointment
router.put("/updateAppointementById/:id", verifyJWT, updateAppointment);

// 🔹 Delete an appointment
router.delete("/deleteAppointementById/:id",verifyJWT, deleteAppointment);


module.exports = router;