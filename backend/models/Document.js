const DocumentSchema = new mongoose.Schema({
  claimId: { type: mongoose.Schema.Types.ObjectId, ref: 'Claim', index: true, required: true },
  userId:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true, required: true },
  fileName: String,
  mimeType: String,
  size: Number,
  storagePath: String,
}, { timestamps: { createdAt: 'uploadedAt', updatedAt: false } });

module.exports = mongoose.model('Document', DocumentSchema);
