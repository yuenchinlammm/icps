const Claim = require('../models/Claim');
const getClaims = async(req,res) => {
    try{
        const claims = await Claim.find({userId: req.user.id});
        res.json(tasks);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const addClaim = async (req,res) => {
    const { policyNumber, incidentDate, description, claimType} = req.body;
    try {
        const claim = await Claim.create({userId: req.user.id, policyNumber, incidentDate, description,claimType});
        res.status(201).json(task);
    } catch(error){
        res.status(500).json({ message: error.message});
    }
};

const updateClaim = async (req, res) => {
    const { policyNumber, incidentDate, description,claimType } =req.body;
    try {
        const claim = await Claim.findById(req.params.id);
        if(!claim) return res.status(404).json({ message: 'Claim not found'});

        claim.policyNumber = policyNumber || claim.policyNumber;
        claim.incidentDate = incidentDate || claim.incidentDate;
        claim.description = description || claim.description;
        claim.claimType = claimType || claim.claimType;

        const updatedClaim = await claim.save();
        res.json(updatedClaim);
    } catch (error){
        res.status(500).json({ message: error.message});
    }
};

const deleteClaim = async (req,res) => {
    try {
        const claim = await Claim.findById(req.params.id);
        if(!claim) return res.status(404).json({ message: 'Claim not found'});

        await claim.remove();
        res.json({ message: 'Claim deleted'});
    } catch (error){
        res.status(500).json({ message: error.message});
    }
};

module.exports = { getClaims, addClaim, updateClaim, deleteClaim};
