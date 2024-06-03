const mongoose = require('mongoose');

const vCardSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    company: { type: String, required: true },
    jobTitle: { type: String, required: true },
});

module.exports = mongoose.model('VCard', vCardSchema);
