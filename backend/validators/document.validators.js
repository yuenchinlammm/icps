const { param } = require('express-validator');

exports.claimIdParamRule = [ param('id').isMongoId() ];
exports.docIdParamRule   = [ param('docId').isMongoId() ];
