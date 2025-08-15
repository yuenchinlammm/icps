const router = require('express').Router();
const { createClaimRules, idParamRule } = require('../validators/claim.validators');
const validate = require('../middlewares/validate');
const { ownsClaim } = require('../middlewares/ownership');
const { allowDraftPendingOnly } = require('../middlewares/statusGuard');
const Claim = require('../models/Claim');
const ctrl = require('../controllers/claim.controller');

const requireAuth = require('../middlewares/authMiddleware');

router.use(requireAuth);

// Create
router.post('/', createClaimRules, validate, ctrl.createClaim);

// List mine
router.get('/', ctrl.listMyClaims);

// Detail (owner)
router.get('/:id', idParamRule, validate, ownsClaim(Claim), ctrl.getMyClaim);

// Update (only Draft/Pending)
router.put('/:id', idParamRule, validate, ownsClaim(Claim), allowDraftPendingOnly, ctrl.updateMyClaim);

// Delete (only Draft/Pending)
router.delete('/:id', idParamRule, validate, ownsClaim(Claim), allowDraftPendingOnly, ctrl.deleteMyClaim);

module.exports = router;
