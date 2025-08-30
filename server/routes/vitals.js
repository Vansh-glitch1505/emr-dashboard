import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Save vitals
router.post('/vitals', async (req, res) => {
  try {
    const {
      patient_id,
      date,
      time,
      systolic,
      diastolic,
      pulse,
      respiratory,
      temperature,
      tempUnit,
      height,
      heightUnit,
      weight,
      bmi,
      pain,
      spo2,
      comments
    } = req.body;

    const result = await pool.query(
      `INSERT INTO vitals (
        patient_id, date, time, systolic, diastolic, pulse, respiratory,
        temperature, temp_unit, height, height_unit, weight, bmi, pain, spo2, comments
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
      RETURNING *`,
      [
        patient_id, date, time, systolic, diastolic, pulse, respiratory,
        temperature, tempUnit, height, heightUnit, weight, bmi, pain, spo2, comments
      ]
    );

    res.json({ message: 'Vitals saved successfully', vitals: result.rows[0] });
  } catch (err) {
    console.error('Error saving vitals:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
