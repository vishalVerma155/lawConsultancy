const ContactUs = require('../models/contectUse.model.js');

// CREATE - Submit a contact message
const createMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Basic validation (can be enhanced)
    if (!name || !email || !subject ) {
      return res.status(400).json({success : false, error: 'All fields are required.' });
    }

    const newMessage = new ContactUs({ name, email, subject, message });
    await newMessage.save();

   return res.status(201).json({success : true, message: 'Message sent successfully.', data: newMessage });
  } catch (error) {
   return res.status(500).json({success : false, error: error.message });
  }
};

// READ ALL - Get all contact messages
const getAllMessages = async (req, res) => {
  try {
    const messages = await ContactUs.find().sort({ createdAt: -1 });
    res.status(200).json({success : true, messages});
  } catch (error) {
    res.status(500).json({success : false, error: error.message });
  }
};

// READ ONE - Get a specific message by ID
const getMessageById = async (req, res) => {
  try {
    const message = await ContactUs.findById(req.params.id);
    if (!message) {
      return res.status(404).json({success : false, error: 'Message not found.' });
    }
    res.status(200).json({success : true, message});
  } catch (error) {
    res.status(500).json({success : false, error: error.message });
  }
};


// DELETE - Remove a message
const deleteMessage = async (req, res) => {
  try {
    const deletedMessage = await ContactUs.findByIdAndDelete(req.params.id);
    if (!deletedMessage) {
      return res.status(404).json({success : false, error: 'Message not found.' });
    }
    res.status(200).json({success : true, message: 'Message deleted successfully.', deletedMessage });
  } catch (error) {
    res.status(500).json({success : false, error: error.message });
  }
};

module.exports = {createMessage, getAllMessages, getMessageById, deleteMessage}