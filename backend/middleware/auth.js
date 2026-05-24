// In-memory store of active admin session tokens
const activeTokens = new Set();

/**
 * Middleware: verifies admin via Bearer token or x-api-key header.
 */
const authenticate = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey && apiKey === process.env.API_KEY) {
    return next();
  }

  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.slice(7);
    if (activeTokens.has(token)) {
      return next();
    }
  }

  return res.status(401).json({ error: 'Unauthorized. Please log in.' });
};

module.exports = { authenticate, activeTokens };
