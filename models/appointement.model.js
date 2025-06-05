const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    // ✅ Basic Details Section
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    mobileNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: /^\S+@\S+\.\S+$/
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other']
    },
    purposeOfVisit: {
        type: String,
        required: true,
        trim: true
    },
    photoIdProofUrl: {
        type: String, // URL to uploaded file (e.g., Cloudinary, S3)
        required: true
    },

    requiredAppointmentDate: {
        type: Date, 
        required: true
    },

    // ✅ Additional (Optional) Details Section
    fatherOrHusbandName: {
        type: String,
        trim: true
    },
    aadhaarNumber: {
        type: String,
        match: /^\d{12}$/, // Aadhaar format: 12-digit number
        trim: true
    },
    barCouncilRegistrationNumber: {
        type: String,
        trim: true
    },
    enrollmentDate: {
        type: Date
    },
    lawFirmName: {
        type: String,
        trim: true
    },
    whomToMeet: {
        type: String,
        trim: true
    },
    caseOrFileNumber: {
        type: String,
        trim: true
    },
    supportingDocumentsUrls: {
        type: [String], // array of URLs
        default: []
    }
}, { timestamps: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
