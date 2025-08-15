const Claim = require('../models/Claim');

exports.createClaim = async (req,res) => {
  const payload = {
    userId: req.user.id,
    policyNumber: req.body.policyNumber,
    incidentDate: req.body.incidentDate,
    claimType: req.body.claimType,
    description: req.body.description,
    status: 'Draft'
  };
  const claim = await Claim.create(payload);
  res.status(201).json(claim);
};

exports.listMyClaims = async (req,res) => {
  const claims = await Claim.find({ userId: req.user.id }).sort({ updatedAt: -1 });
  res.json(claims);
};

exports.getMyClaim = async (req,res) => {
  // req.claim provided by ownership middleware
  res.json(req.claim);
};

exports.updateMyClaim = async (req,res) => {
  const updates = (({ policyNumber, incidentDate, claimType, description, status }) =>
    ({ policyNumber, incidentDate, claimType, description, status }))(req.body);
  // status guard already ran
  Object.assign(req.claim, updates);
  await req.claim.save();
  res.json(req.claim);
};

exports.deleteMyClaim = async (req,res) => {
  // status guard already ran
  await req.claim.deleteOne();
  res.status(204).end();
}; 
