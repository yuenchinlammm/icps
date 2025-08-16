const router = require('express-validator').Router();
const { createClaimRules, idParamRule } = require('../validators/claim.validators');
const validate = require('../middleware/validate');
const { ownsClaim } = require('../middleware/ownership');
const { allowDraftPendingOnly } = require('../middleware/statusGuard');
const Claim = require('../models/Claim');
const ctrl = require('../controllers/claimController');
const requireAuth = require('../middleware/auth');

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
