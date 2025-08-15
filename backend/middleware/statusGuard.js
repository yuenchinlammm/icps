module.exports.allowDraftPendingOnly = (req,res,next)=>{
  const claim = req.claim; // set by ownsClaim
  if (!claim) return res.status(500).json({ message: 'Guard requires claim on req' });
  if (!['Draft','Pending'].includes(claim.status)) {
    return res.status(409).json({ message: `Blocked for status=${claim.status}` });
  }
  next();
};
