const router = require('express').Router();
const { claimIdParamRule, docIdParamRule } = require('../validators/document.validators');
const validate = require('../middleware/validate');
const { ownsClaim, ownsDocument } = require('../middleware/ownership');
const { upload } = require('../libs/upload');
const Claim = require('../models/Claim');
const Document = require('../models/Document');
const ctrl = require('../controllers/documentController');
const requireAuth = require('../middleware/auth');

router.use(requireAuth);

// Upload to claim
router.post('/claims/:id/documents',
  claimIdParamRule, validate,
  ownsClaim(Claim),
  upload.single('file'),
  ctrl.uploadToClaim
);

// List claim documents
router.get('/claims/:id/documents',
  claimIdParamRule, validate,
  ownsClaim(Claim),
  ctrl.listForClaim
);

// Preview
router.get('/documents/:docId/preview',
  docIdParamRule, validate,
  ownsDocument(Document),
  ctrl.preview
);

// Replace
router.put('/documents/:docId',
  docIdParamRule, validate,
  ownsDocument(Document),
  upload.single('file'),
  ctrl.replace
);

// Delete
router.delete('/documents/:docId',
  docIdParamRule, validate,
  ownsDocument(Document),
  ctrl.remove
);

module.exports = router;
