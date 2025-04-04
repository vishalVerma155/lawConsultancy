const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    fullName: { type: String, required: true, trim: true },
    fatherName: { type: String,  trim: true },
    gender: { type: String },
    mobile: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    requiredAppointmentDate: { type: Date, required: true },
    description: { type: String, trim: true },
    status: { type: String,enum : ["pending", "completed"], trim: true, default : "pending" },
}, { timestamps: true }); // ✅ Adds createdAt & updatedAt fields

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
