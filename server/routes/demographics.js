import express from 'express';
import pool from '../db.js'; // your db connection

const router = express.Router();

router.post('/patient-demographics', async (req, res) => {
  try {
    const {
      user_id,
      firstName,
      middleName,
      lastName,
      dob,
      gender,
      address1,
      address2,
      city,
      postalCode,
      district,
      state,
      country,
      bloodGroup,
      occupation,
      aadharNumber,
      panNumber
    } = req.body;

    // ✅ 1. Insert into patients table for Nurse Dashboard
    const patientInsert = await pool.query(
      `INSERT INTO patients (first_name, last_name)
       VALUES ($1, $2)
       RETURNING id`,
      [firstName, lastName]
    );

    const patientId = patientInsert.rows[0].id;

    // ✅ 2. Insert into patient_demographics with the new patient_id
    const demoInsert = await pool.query(
      `
        INSERT INTO patient_demographics (
          user_id, patient_id, first_name, middle_name, last_name, dob, gender,
          address1, address2, city, postal_code, district, state, country,
          blood_group, occupation, aadhar_number, pan_number
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)
        RETURNING *;
      `,
      [
        user_id, patientId, firstName, middleName, lastName, dob, gender,
        address1, address2, city, postalCode, district, state, country,
        bloodGroup, occupation, aadharNumber, panNumber
      ]
    );

    res.status(201).json({
      message: 'Patient added successfully',
      patient: demoInsert.rows[0]
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save patient demographics' });
  }
});

export default router;
