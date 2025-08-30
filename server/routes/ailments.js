// routes/ailments.js
import express from 'express';
import pool from '../db.js';

const router = express.Router();

router.post('/ailments', async (req, res) => {
  try {
    const {
      problemName,
      icdCode,
      description,
      status,
      severity,
      dateOfOnset,
      riskFactor,
      comorbidities,
      sideEffects,
      treatmentPlan,
      testResults
    } = req.body;

    const result = await pool.query(
      `INSERT INTO ailments (
        user_id, problem_name, icd_code, description, status, severity,
        date_of_onset, risk_factor, comorbidities, side_effects,
        treatment_plan, test_results
      ) VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12
      ) RETURNING *`,
      [
        1, // Replace with actual logged-in user_id later
        problemName,
        icdCode,
        description,
        status,
        severity,
        dateOfOnset || null,
        riskFactor,
        comorbidities,
        sideEffects,
        treatmentPlan,
        testResults
      ]
    );

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error saving ailment:', error);
    res.status(500).json({ success: false, message: 'Failed to save ailment' });
  }
});

export default router;
