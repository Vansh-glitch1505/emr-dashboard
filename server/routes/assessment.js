// routes/assessment.js
import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Save assessment info
router.post('/assessment', async (req, res) => {
  try {
    const {
      chiefComplaints,
      historyOfPresentIllness,
      pastMedicalHistory,
      medicationHistory,
      testResults,
      remindersAlerts,
      planCare
    } = req.body;

    const result = await pool.query(
      `INSERT INTO assessment (
        user_id, chief_complaints, history_of_present_illness,
        past_medical_history, medication_history, test_results,
        reminders_alerts, plan_care
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *`,
      [
        1, // Replace with logged-in user's ID later
        chiefComplaints,
        historyOfPresentIllness,
        pastMedicalHistory,
        medicationHistory,
        testResults,
        remindersAlerts,
        planCare
      ]
    );

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error saving assessment:', error);
    res.status(500).json({ success: false, message: 'Failed to save assessment' });
  }
});

export default router;
