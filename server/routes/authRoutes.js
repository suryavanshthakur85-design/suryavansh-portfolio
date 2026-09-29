import express from 'express';
import {
  checkRateLimit,
  recordFailedAttempt,
  recordSuccessfulLogin,
  verifyCredentials,
  generateAdminToken,
  requireAdmin
} from '../auth.js';

const router = express.Router();

// Helper to get client IP reliably
const getClientIp = (req) => {
  return (
    req.headers['x-forwarded-for']?.split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    '127.0.0.1'
  );
};

// Login Route
router.post('/login', (req, res) => {
  const ip = getClientIp(req);
  const { username, password } = req.body || {};

  // Check rate limit / brute-force protection
  const rateLimitStatus = checkRateLimit(ip);
  if (!rateLimitStatus.allowed) {
    return res.status(429).json({
      error: rateLimitStatus.error
    });
  }

  if (!password) {
    return res.status(400).json({
      error: 'Password is required.'
    });
  }

  const effectiveUsername = (username && username.trim()) || process.env.ADMIN_USERNAME || 'admin';
  const isValid = verifyCredentials(effectiveUsername, password);

  if (!isValid) {
    const attempt = recordFailedAttempt(ip);
    if (attempt.locked) {
      return res.status(429).json({
        error: 'Too many failed login attempts. Account temporarily locked for 15 minutes.'
      });
    }
    return res.status(401).json({
      error: 'Incorrect password. Please try again.',
      remainingAttempts: attempt.remaining
    });
  }

  // Clear rate limits on success
  recordSuccessfulLogin(ip);

  // Generate Admin JWT
  const token = generateAdminToken(effectiveUsername);

  return res.json({
    success: true,
    message: 'Authentication successful.',
    token,
    user: {
      username: effectiveUsername,
      role: 'admin'
    }
  });
});

// Verify Current Session Route
router.get('/me', requireAdmin, (req, res) => {
  return res.json({
    authenticated: true,
    user: req.admin
  });
});

// Logout Route
router.post('/logout', (req, res) => {
  return res.json({
    success: true,
    message: 'Logged out successfully.'
  });
});

export default router;
