const Document = require('../models/Document');
const getDocument = async(req,res) => {
    try{
        const documents = await Document.find({userId: req.user.id});
        res.json(documents);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const addDocument = async (req,res) => {
    const { policyNumber, documentSize, documentType} = req.body;
    try {
        const document = await document.create({userId: req.user.id, policyNumber, documentSize, documentType});
        res.status(201).json(document);
    } catch(error){
        res.status(500).json({ message: error.message});
    }
};

const updateDocument = async (req, res) => {
    const { policyNumber, documentSize, documentType } =req.body;
    try {
        const document = await document.findById(req.params.id);
        if(!document) return res.status(404).json({ message: 'Document not found'});

        document.policyNumber = policyNumber || document.policyNumber;
        document.documentSize = documentSize || document.documentSize;
        document.documentType = documentType || document.documentType;

        const updatedDocument = await document.save();
        res.json(updatedDocument);
    } catch (error){
        res.status(500).json({ message: error.message});
    }
};

const deleteDocument = async (req,res) => {
    try {
        const document = await Document.findById(req.params.id);
        if(!document) return res.status(404).json({ message: 'Document not found'});

        await document.remove();
        res.json({ message: 'Document deleted'});
    } catch (error){
        res.status(500).json({ message: error.message});
    }
};

module.exports = { getDocument, addDocument, updateDocument, deleteDocument};
