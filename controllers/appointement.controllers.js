const Appointment = require("../models/appointement.model.js");

// ✅ Create Appointment
const createAppointment = async (req, res) => {
    try {
        const data = req.body;
        const { fullName, mobileNumber, email, gender, requiredAppointmentDate } = req.body;

        const idPhoto = req.files['idPhoto']?.[0]?.path || null;
        const additionalDocs = req.files['additionalDocs']?.map(file => file.path) || [];

        if (!fullName || !mobileNumber || !email || !requiredAppointmentDate || !gender || !idPhoto) {
            return res.status(404).json({ success: false, error: "Name, mobile, email, gender, photo of id proof and required appointement date is compulsary" })
        }

        const payload = {photoIdProofUrl : idPhoto, supportingDocumentsUrls : additionalDocs, ...data}
        const newAppointment = new Appointment(payload);
        await newAppointment.save();
        res.status(201).json({ success: true, message: "Appointment created successfully", data: newAppointment });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// ✅ Get All Appointments
const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: appointments });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// ✅ Get Single Appointment by ID
const getAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ success: false, error: "Appointment not found" });
        }
        res.status(200).json({ success: true, data: appointment });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// ✅ Update Appointment
const updateAppointment = async (req, res) => {
    try {
        const { status } = req.body;
        const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!updatedAppointment) {
            return res.status(404).json({ success: false, error: "Appointment not found" });
        }
        res.status(200).json({ success: true, message: "Appointment updated successfully", data: updatedAppointment });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// ✅ Delete Appointment
const deleteAppointment = async (req, res) => {
    try {
        const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!deletedAppointment) {
            return res.status(404).json({ success: false, error: "Appointment not found" });
        }
        res.status(200).json({ success: true, message: "Appointment deleted successfully", deletedAppointment });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    createAppointment,
    getAllAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment
};
