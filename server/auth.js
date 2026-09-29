import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_suryavansh_dev_secret_only';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;

// Rate limiting state for brute-force protection
// Map: ip -> { count: number, firstAttempt: number, lockedUntil: number }
const loginAttempts = new Map();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes lockout

// Clean up stale attempt records periodically
const cleanupInterval = setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of loginAttempts.entries()) {
    if (now > record.firstAttempt + WINDOW_MS && now > (record.lockedUntil || 0)) {
      loginAttempts.delete(ip);
    }
  }
}, 60 * 1000);
cleanupInterval.unref();


export const checkRateLimit = (ip) => {
  const now = Date.now();
  const record = loginAttempts.get(ip);

  if (!record) {
    return { allowed: true, remaining: MAX_ATTEMPTS };
  }

  // Check if locked out
  if (record.lockedUntil && now < record.lockedUntil) {
    const minutesRemaining = Math.ceil((record.lockedUntil - now) / 60000);
    return {
      allowed: false,
      error: `Too many failed attempts. Account locked. Please try again in ${minutesRemaining} minute(s).`,
      remaining: 0
    };
  }

  // Check window expiry
  if (now > record.firstAttempt + WINDOW_MS) {
    loginAttempts.delete(ip);
    return { allowed: true, remaining: MAX_ATTEMPTS };
  }

  const remaining = Math.max(0, MAX_ATTEMPTS - record.count);
  return { allowed: true, remaining };
};

export const recordFailedAttempt = (ip) => {
  const now = Date.now();
  const record = loginAttempts.get(ip) || { count: 0, firstAttempt: now, lockedUntil: 0 };
  record.count += 1;

  if (record.count >= MAX_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_MS;
  }
  loginAttempts.set(ip, record);

  const remaining = Math.max(0, MAX_ATTEMPTS - record.count);
  return {
    locked: record.count >= MAX_ATTEMPTS,
    remaining
  };
};

export const recordSuccessfulLogin = (ip) => {
  loginAttempts.delete(ip);
};

export const verifyCredentials = (username, password) => {
  if (!password) return false;
  const user = (username || ADMIN_USERNAME).trim();
  if (user.toLowerCase() !== ADMIN_USERNAME.toLowerCase()) return false;

  // Check bcrypt hash if provided
  if (ADMIN_PASSWORD_HASH) {
    try {
      if (bcrypt.compareSync(password, ADMIN_PASSWORD_HASH)) {
        return true;
      }
    } catch (e) {
      console.error('Bcrypt comparison error:', e);
    }
  }

  // Check plain or hashed environment password
  if (ADMIN_PASSWORD) {
    if (ADMIN_PASSWORD.startsWith('$2a$') || ADMIN_PASSWORD.startsWith('$2b$')) {
      return bcrypt.compareSync(password, ADMIN_PASSWORD);
    }
    return password === ADMIN_PASSWORD;
  }

  return false;
};

export const generateAdminToken = (username) => {
  return jwt.sign(
    {
      username,
      role: 'admin',
      iat: Math.floor(Date.now() / 1000)
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
};

// Middleware to enforce Admin authorization on protected endpoints
export const requireAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'Unauthorized: Authentication required. No admin token provided.'
    });
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({
      error: 'Unauthorized: Invalid or expired session token. Please log in again.'
    });
  }

  if (decoded.role !== 'admin') {
    return res.status(403).json({
      error: 'Forbidden: Admin privileges required for this operation.'
    });
  }

  req.admin = decoded;
  next();
};
