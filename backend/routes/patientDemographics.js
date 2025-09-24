import express from "express";
import PatientDemographics from "../models/PatientDemographics.js";
import upload from "../middleware/upload.js";
import fs from "fs";

const router = express.Router();

// @desc    Test route
// @route   GET /api/patient-demographics
router.get('/', async (req, res) => {
  try {
    // fetch all patients for convenience
    const patients = await PatientDemographics.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching patients", error: err.message });
  }
});

// @desc    Create patient demographics
// @route   POST /api/patient-demographics
router.post('/', upload.single('photo'), async (req, res) => {
  try {
    console.log('=== DEBUG INFO ===');
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);
    console.log('==================');

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

    // Validation
    if (!firstName || !lastName || !dob || !gender) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields: firstName, lastName, dob, gender"
      });
    }

    // Clean and validate Aadhar number
    let cleanedAadhar = '';
    if (aadharNumber && aadharNumber.trim()) {
      cleanedAadhar = aadharNumber.replace(/\D/g, '');
      if (cleanedAadhar.length !== 12) {
        return res.status(400).json({
          success: false,
          message: "Aadhar number must be exactly 12 digits"
        });
      }
    }

    // Clean and validate PAN number
    let cleanedPAN = '';
    if (panNumber && panNumber.trim()) {
      cleanedPAN = panNumber.toUpperCase().trim();
      if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(cleanedPAN)) {
        return res.status(400).json({
          success: false,
          message: "PAN number format is invalid (format: ABCDE1234F)"
        });
      }
    }

    // Create patient demographics data
    const patientData = {
      user_id: user_id || 1, // Default to 1 if not provided
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
      aadharNumber: cleanedAadhar,
      panNumber: cleanedPAN
    };

    // Add photo path if uploaded
    if (req.file) {
      patientData.photo = req.file.path;
    }

    const patient = new PatientDemographics(patientData);
    const savedPatient = await patient.save();

    res.status(201).json({
      success: true,
      message: "Patient demographics saved successfully",
      data: savedPatient
    });

  } catch (error) {
    console.error('Error saving patient demographics:', error);

    // Delete uploaded file if there was an error
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }

    res.status(500).json({
      success: false,
      message: "Error saving patient demographics",
      error: error.message
    });
  }
});

// @desc    Get a patient by ID
// @route   GET /api/patient-demographics/:id
router.get('/:id', async (req, res) => {
  try {
    const patient = await PatientDemographics.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ success: false, message: "Patient not found" });
    }
    res.json(patient);
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching patient", error: err.message });
  }
});

export default router;
