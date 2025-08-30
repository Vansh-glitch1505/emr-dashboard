// server/routes/insurance.js
import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Save Insurance Information
router.post('/insurance', async (req, res) => {
  try {
    const {
      primaryCompanyName,
      primaryPolicyNumber,
      primaryGroupNumber,
      primaryPlanType,
      primaryStartDate,
      primaryEndDate,
      secondaryCompanyName,
      secondaryPolicyNumber,
      secondaryGroupNumber,
      secondaryPlanType,
      secondaryStartDate,
      secondaryEndDate,
      contactNumber
    } = req.body;

    const result = await pool.query(
      `INSERT INTO insurance_information 
       (
        user_id,
        primary_company_name, primary_policy_number, primary_group_number, primary_plan_type, primary_start_date, primary_end_date,
        secondary_company_name, secondary_policy_number, secondary_group_number, secondary_plan_type, secondary_start_date, secondary_end_date,
        contact_number
       )
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
       RETURNING *`,
      [
        1, // Replace with logged-in user_id when auth is ready
        primaryCompanyName,
        primaryPolicyNumber,
        primaryGroupNumber,
        primaryPlanType,
        primaryStartDate,
        primaryEndDate,
        secondaryCompanyName,
        secondaryPolicyNumber,
        secondaryGroupNumber,
        secondaryPlanType,
        secondaryStartDate,
        secondaryEndDate,
        contactNumber
      ]
    );

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error saving insurance information:', error);
    res.status(500).json({ success: false, message: 'Failed to save insurance information' });
  }
});

export default router;
