const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Int32 } = require('mongodb');

const documentSchema = new mongoose.Schema({
    policyNumber: { type: String, required: true },
    documentType: { type: String, required: true },
});

documentSchema.pre('save', async function (next) {
    if (!this.isModified('documentType')) return next();
    const salt = await bcrypt.genSalt(10);
    this.documentType = await bcrypt.hash(this.documentType, salt);
});

module.exports = mongoose.model('Document', documentSchema);
