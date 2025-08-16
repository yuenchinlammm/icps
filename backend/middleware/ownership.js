const Claim = require('../models/Claim');

module.exports.ownsClaim = (Claim) => async (req,res,next) => {
  const claim = await Claim.findById(req.params.id || req.params.claimId);
  if (!claim) return res.status(404).json({ message: 'Claim not found' });
  if (String(claim.userId) !== String(req.user.id)) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  req.claim = claim;
  next();
};

const Document = require('../models/Document');
module.exports.ownsDocument = (Document) => async (req,res,next) => {
  const doc = await Document.findById(req.params.docId);
  if (!doc) return res.status(404).json({ message: 'Document not found' });
  if (String(doc.userId) !== String(req.user.id)) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  req.document = doc;
  next();
};
