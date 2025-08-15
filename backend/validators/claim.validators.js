const { body, param } = require('express-validator');

exports.createClaimRules = [
  body('policyNumber').isString().trim().notEmpty(),
  body('incidentDate').isISO8601(),
  body('claimType').isIn(['Motor','Home','Health','Other']),
  body('description').isString().trim().notEmpty(),
];

exports.idParamRule = [ param('id').isMongoId() ];
