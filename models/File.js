const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    projectName: { type: String, required: true },
    fileUrl: { type: String, required: true },
    status: { type: String, default: 'uploaded' },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('File', fileSchema);
