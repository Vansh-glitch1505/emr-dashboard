import express from "express";
import PatientDemographics from "../models/PatientDemographics.js";
import upload from "../middleware/upload.js";
import fs from "fs";
import path from "path";

const router = express.Router();

// @desc    Create patient demographics
// @route   POST /api/patient-demographics
// @access  Public
router.post('/', upload.single('photo'), async (req, res) => {
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
            cleanedAadhar = aadharNumber.replace(/\D/g, ''); // Remove non-digits
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

// @desc    Get patient demographics by user_id
// @route   GET /api/patient-demographics/:userId
// @access  Public
router.get('/:userId', async (req, res) => {
    try {
        const patient = await PatientDemographics.findOne({ user_id: req.params.userId });
        
        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient demographics not found"
            });
        }

        res.status(200).json({
            success: true,
            data: patient
        });

    } catch (error) {
        console.error('Error fetching patient demographics:', error);
        res.status(500).json({
            success: false,
            message: "Error fetching patient demographics",
            error: error.message
        });
    }
});

// @desc    Update patient demographics
// @route   PUT /api/patient-demographics/:userId
// @access  Public
router.put('/:userId', upload.single('photo'), async (req, res) => {
    try {
        const patient = await PatientDemographics.findOne({ user_id: req.params.userId });
        
        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient demographics not found"
            });
        }

        // Update fields
        Object.keys(req.body).forEach(key => {
            if (req.body[key] !== undefined) {
                patient[key] = req.body[key];
            }
        });

        // Update photo if uploaded
        if (req.file) {
            // Delete old photo if exists
            if (patient.photo && fs.existsSync(patient.photo)) {
                fs.unlink(patient.photo, (err) => {
                    if (err) console.error('Error deleting old photo:', err);
                });
            }
            patient.photo = req.file.path;
        }

        const updatedPatient = await patient.save();

        res.status(200).json({
            success: true,
            message: "Patient demographics updated successfully",
            data: updatedPatient
        });

    } catch (error) {
        console.error('Error updating patient demographics:', error);
        
        // Delete uploaded file if there was an error
        if (req.file) {
            fs.unlink(req.file.path, (err) => {
                if (err) console.error('Error deleting file:', err);
            });
        }

        res.status(500).json({
            success: false,
            message: "Error updating patient demographics",
            error: error.message
        });
    }
});

// @desc    Delete patient demographics
// @route   DELETE /api/patient-demographics/:userId
// @access  Public
router.delete('/:userId', async (req, res) => {
    try {
        const patient = await PatientDemographics.findOne({ user_id: req.params.userId });
        
        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient demographics not found"
            });
        }

        // Delete photo file if exists
        if (patient.photo && fs.existsSync(patient.photo)) {
            fs.unlink(patient.photo, (err) => {
                if (err) console.error('Error deleting photo:', err);
            });
        }

        await PatientDemographics.deleteOne({ user_id: req.params.userId });

        res.status(200).json({
            success: true,
            message: "Patient demographics deleted successfully"
        });

    } catch (error) {
        console.error('Error deleting patient demographics:', error);
        res.status(500).json({
            success: false,
            message: "Error deleting patient demographics",
            error: error.message
        });
    }
});

export default router;