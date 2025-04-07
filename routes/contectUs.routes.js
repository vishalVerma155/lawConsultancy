// routes/contactUsRoutes.js

const express = require('express');
const router = express.Router();
const {createMessage, getAllMessages, getMessageById, deleteMessage} = require('../controllers/contectUs.controllers.js');
const verifyJWT = require('../middleware/auth.middleware.js');

// POST /api/contact - Create new message
router.post('/createMessage', createMessage);

// GET /api/contact - Get all messages
router.get('/getAllMessages',verifyJWT, getAllMessages );

// GET /api/contact/:id - Get single message by ID
router.get('/getMessage/:id', verifyJWT, getMessageById);


// DELETE /api/contact/:id - Delete a message
router.delete('/deleteMessage/:id', verifyJWT, deleteMessage);

module.exports = router;
