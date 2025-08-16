module.exports = function requireAuth(req, res, next) {
  if (process.env.NODE_ENV === 'test') {
    req.user = { id: '000000000000000000000001' }; // fake user id for tests
    return next();
  }

  const hdr = req.headers.authorization || '';
  const token = hdr.startsWith('Bearer ') ? hdr.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const jwt = require('jsonwebtoken');
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.id };
    next();
  } catch (e) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
