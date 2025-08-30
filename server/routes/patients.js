import express from 'express';
import pool from '../db.js';

const router = express.Router();

// ✅ Get all patients (alphabetical)
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, first_name, last_name 
      FROM patients 
      ORDER BY last_name ASC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching patients:', err);
    res.status(500).json({ error: 'Failed to fetch patients' });
  }
});

// ✅ Get 10 most recent patients (based on created_at)
router.get('/recent', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, first_name, last_name, created_at
      FROM patients
      ORDER BY created_at DESC
      LIMIT 10
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching recent patients:', err);
    res.status(500).json({ error: 'Failed to fetch recent patients' });
  }
});

export default router;
