const express = require('express');
const multer = require('multer');
const path = require('path');
const File = require('../models/File');
const authenticate = require('../middleware/auth');
const router = express.Router();

// Configure multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});
const upload = multer({ storage });

// Upload file
router.post('/upload', authenticate, upload.single('file'), async (req, res) => {
    const { projectName } = req.body;
    const fileUrl = req.file.path;
    const clientId = req.user.id; // Assuming only clients can upload

    try {
        const newFile = new File({ projectName, fileUrl, clientId });
        await newFile.save();
        res.status(201).json(newFile);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get files
router.get('/', authenticate, async (req, res) => {
    try {
        const files = await File.find({ clientId: req.user.id }); // Filter by client ID
        res.json(files);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
