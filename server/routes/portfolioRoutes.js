import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { requireAdmin } from '../auth.js';
import {
  getPortfolioData,
  savePortfolioData,
  updateSection,
  resetPortfolioData
} from '../db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const safeBase = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${safeBase}-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB limit
  fileFilter: (req, file, cb) => {
    const allowed = /pdf|doc|docx|png|jpg|jpeg|webp|svg/;
    const ext = path.extname(file.originalname).toLowerCase().replace('.', '');
    if (allowed.test(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file format. Only PDF, DOC, and standard images are allowed.'));
    }
  }
});

const router = express.Router();

// GET /api/portfolio - Public read-only portfolio data
router.get('/', (req, res) => {
  try {
    const data = getPortfolioData();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve portfolio data' });
  }
});

// PUT /api/portfolio - Admin only full update
router.put('/', requireAdmin, (req, res) => {
  try {
    const incomingData = req.body;
    if (!incomingData || typeof incomingData !== 'object') {
      return res.status(400).json({ error: 'Invalid portfolio data payload' });
    }
    const saved = savePortfolioData(incomingData);
    res.json({
      success: true,
      message: 'Portfolio data updated successfully.',
      data: saved
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save portfolio data' });
  }
});

// PATCH /api/portfolio/:section - Admin only section update
router.patch('/:section', requireAdmin, (req, res) => {
  try {
    const { section } = req.params;
    const sectionData = req.body;

    const validSections = [
      'hero',
      'about',
      'education',
      'skills',
      'projects',
      'certifications',
      'achievements',
      'exploring',
      'contact',
      'resume',
      'projectCategories'
    ];

    if (!validSections.includes(section)) {
      return res.status(400).json({ error: `Invalid section name: ${section}` });
    }

    const updated = updateSection(section, sectionData);
    res.json({
      success: true,
      message: `Section "${section}" updated successfully.`,
      section,
      data: updated
    });
  } catch (err) {
    res.status(500).json({ error: `Failed to update section: ${req.params.section}` });
  }
});

// POST /api/portfolio/reset - Admin only restore defaults
router.post('/reset', requireAdmin, (req, res) => {
  try {
    const restored = resetPortfolioData();
    res.json({
      success: true,
      message: 'Portfolio reset to default state successfully.',
      data: restored
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to reset portfolio data' });
  }
});

// POST /api/upload - Admin only file upload
router.post('/upload', requireAdmin, (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message || 'File upload failed' });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided in upload request' });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({
      success: true,
      message: 'File uploaded successfully.',
      fileUrl,
      fileName: req.file.originalname,
      size: req.file.size
    });
  });
});

export default router;
