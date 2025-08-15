module.exports.ownsClaim = (ClaimModel) => async (req,res,next) => {
  const claim = await ClaimModel.findById(req.params.id || req.params.claimId);
  if (!claim) return res.status(404).json({ message: 'Claim not found' });
  if (String(claim.userId) !== String(req.user.id)) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  req.claim = claim;
  next();
};

module.exports.ownsDocument = (DocumentModel) => async (req,res,next) => {
  const doc = await DocumentModel.findById(req.params.docId);
  if (!doc) return res.status(404).json({ message: 'Document not found' });
  if (String(doc.userId) !== String(req.user.id)) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  req.document = doc;
  next();
};
