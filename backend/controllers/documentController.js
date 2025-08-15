const path = require('path');
const fs = require('fs');
const Claim = require('../models/Claim');
const Document = require('../models/Document');

exports.uploadToClaim = async (req,res) => {
  const file = req.file; // from multer
  if (!file) return res.status(400).json({ message: 'No file' });

  const doc = await Document.create({
    claimId: req.claim._id,
    userId: req.user.id,
    fileName: file.originalname,
    mimeType: file.mimetype,
    size: file.size,
    storagePath: file.path
  });
  res.status(201).json(doc);
};

exports.listForClaim = async (req,res) => {
  const docs = await Document.find({ claimId: req.claim._id, userId: req.user.id }).sort({ uploadedAt: -1 });
  res.json(docs);
};

exports.preview = async (req,res) => {
  const doc = req.document;
  res.setHeader('Content-Type', doc.mimeType);
  fs.createReadStream(doc.storagePath).pipe(res);
};

exports.replace = async (req,res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ message: 'No file' });

  // remove old file
  try { fs.unlinkSync(req.document.storagePath); } catch(e) {}
  req.document.fileName = file.originalname;
  req.document.mimeType = file.mimetype;
  req.document.size = file.size;
  req.document.storagePath = file.path;
  await req.document.save();
  res.json(req.document);
};

exports.remove = async (req,res) => {
  try { fs.unlinkSync(req.document.storagePath); } catch(e) {}
  await req.document.deleteOne();
  res.status(204).end();
};
