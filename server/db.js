import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'portfolioData.json');
const DEFAULT_DATA_FILE = path.join(DATA_DIR, 'portfolioData.default.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export const getPortfolioData = () => {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(raw);
    }
    if (fs.existsSync(DEFAULT_DATA_FILE)) {
      const raw = fs.readFileSync(DEFAULT_DATA_FILE, 'utf-8');
      const data = JSON.parse(raw);
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
      return data;
    }
  } catch (err) {
    console.error('Error reading portfolio data:', err);
  }
  return {};
};

export const savePortfolioData = (data) => {
  try {
    const serialized = JSON.stringify(data, null, 2);
    // Write atomically
    const tempFile = `${DATA_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, serialized, 'utf-8');
    fs.renameSync(tempFile, DATA_FILE);
    return data;
  } catch (err) {
    console.error('Error saving portfolio data:', err);
    throw new Error('Failed to save portfolio data');
  }
};

export const updateSection = (section, sectionData) => {
  const current = getPortfolioData();
  current[section] = sectionData;
  savePortfolioData(current);
  return current[section];
};

export const resetPortfolioData = () => {
  try {
    if (fs.existsSync(DEFAULT_DATA_FILE)) {
      const raw = fs.readFileSync(DEFAULT_DATA_FILE, 'utf-8');
      const data = JSON.parse(raw);
      savePortfolioData(data);
      return data;
    }
  } catch (err) {
    console.error('Error resetting portfolio data:', err);
    throw new Error('Failed to reset portfolio data');
  }
  return getPortfolioData();
};
