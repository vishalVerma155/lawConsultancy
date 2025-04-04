const Admin = require("../models/admin.model");
const {hashPassword, comparePassword} = require("../utils/bcrypt.js");
const {generateJWT} = require('../utils/jwt.js')

// ✅ Register Admin
const registerAdmin = async (req, res) => {
    try {
        const { userName, password } = req.body;

        // Check if admin already exists
        const existingAdmin = await Admin.find();
        if (existingAdmin.length > 0) {
            return res.status(400).json({ success: false, message: "Admin already existed" });
        }

        const hashedPassword = await hashPassword(password);

        // Create new admin
        const newAdmin = new Admin({ userName, password : hashedPassword });
        await newAdmin.save();
        
        res.status(201).json({ success: true, message: "Admin registered successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// ✅ Login Admin
const loginAdmin = async (req, res) => {
    try {
        const { userName, password } = req.body;

        const admin = await Admin.findOne({ userName });
        if (!admin) {
            return res.status(404).json({ success: false, message: "Admin not found" });
        }

        const isMatch = await comparePassword(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const payload = {
            _id : admin._id,
            userName : admin.userName
        }
        // Generate JWT Token
        const token = generateJWT(payload);
        res.cookie("AccessToken", token);


        res.status(200).json({ success: true, message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// ✅ Get Admin Profile
const getAdminProfile = async (req, res) => {
    try {
        const id = req.user._id;
        const admin = await Admin.findById(id).select("-password");
        if (!admin) {
            return res.status(404).json({ success: false, message: "Admin not found" });
        }
        res.status(200).json({ success: true, data: admin });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = { registerAdmin, loginAdmin, getAdminProfile };
