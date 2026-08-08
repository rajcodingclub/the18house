const jwt = require('jsonwebtoken');

function signToken(admin) {
  return jwt.sign(
    { id: admin._id, email: admin.email, name: admin.name, role: admin.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
}

function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { signToken, verifyToken };
