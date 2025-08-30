import express from 'express';
import pool from '../db.js';

const router = express.Router();

router.post('/contact-information', async (req, res) => {
  try {
    const {
      user_id,
      mobilePhone,
      homePhone,
      workPhone,
      email,
      emergencyFirstName,
      emergencyMiddleName,
      emergencyLastName,
      emergencyRelationship,
      emergencyPhone,
      emergencyEmail
    } = req.body;

    const query = `
      INSERT INTO contact_information (
        user_id, mobile_phone, home_phone, work_phone, email,
        emergency_first_name, emergency_middle_name, emergency_last_name,
        emergency_relationship, emergency_phone, emergency_email
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      RETURNING *;
    `;

    const values = [
      user_id, mobilePhone, homePhone, workPhone, email,
      emergencyFirstName, emergencyMiddleName, emergencyLastName,
      emergencyRelationship, emergencyPhone, emergencyEmail
    ];

    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error saving contact information:', error);
    res.status(500).json({ message: 'Failed to save contact information' });
  }
});

export default router;
