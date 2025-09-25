import express from "express";
import upload from "../middleware/upload.js";
import fs from "fs";

const router = express.Router();

// Dynamic import function to load the Patient model
async function getPatientModel() {
  const patientModule = await import("../models/patients.js");
  return patientModule.default;
}

// Helper function to convert date from YYYY-MM-DD to DD-MM-YYYY
function convertDateFormat(dateString) {
  if (!dateString) return '';
  
  // Check if it's already in DD-MM-YYYY format
  if (/^\d{2}-\d{2}-\d{4}$/.test(dateString)) {
    return dateString;
  }
  
  // Convert from YYYY-MM-DD to DD-MM-YYYY
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  }
  
  return dateString;
}

// @desc    Test route
// @route   GET /api/patient-demographics
router.get('/', async (req, res) => {
  try {
    const Patient = await getPatientModel();
    const patients = await Patient.find();
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

    const Patient = await getPatientModel();

    const {
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
      panNumber,
      // Optional contact info
      mobile,
      mobileCode,
      email,
      preferredContactMethods,
      emergencyContactName,
      emergencyContactPhone,
      emergencyContactEmail,
      emergencyContactRelationship
    } = req.body;

    // Validation - check required demographics fields
    if (!firstName || !lastName || !dob || !gender) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields: firstName, lastName, dob, gender"
      });
    }

    // Clean and validate Aadhar number (optional)
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

    // Clean and validate PAN number (optional)
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

    // Convert date format
    const formattedDob = convertDateFormat(dob);

    // Create patient data with all required fields for validation
    const patientData = {
      // Required demographics fields
      name: {
        first: firstName,
        middle: middleName || '',
        last: lastName
      },
      date_of_birth: formattedDob,
      gender: gender,
      
      // Required by validation schema
      blood_group: bloodGroup || 'None', // Default to 'None' if not provided
      
      // Address - required by validation
      address: {
        street: `${address1 || ''} ${address2 || ''}`.trim() || '',
        city: city || '',
        district: district || '',
        state: state || '',
        postal_code: postalCode || '',
        country: country || ''
      },

      // Contact info - required by validation
      contact_info: {
        mobile: {
          code: mobileCode || '+91', // Default to +91 for India
          number: mobile || ''
        },
        email: email || '',
        preferred_contact_methods: preferredContactMethods ? 
          (Array.isArray(preferredContactMethods) ? preferredContactMethods : [preferredContactMethods]) : 
          ['Email'], // Default value
        emergency_contact: {
          name: {
            first: emergencyContactName || '',
            last: '' // You might want to split the name
          },
          relationship: emergencyContactRelationship || '',
          phone: {
            code: '+91', // Default
            number: emergencyContactPhone || ''
          },
          email: emergencyContactEmail || ''
        }
      },

      // Insurance - required by validation
      insurance: {
        primary: {
          company_name: '',
          policy_number: '',
          plan_type: 'Other' // Default value from enum
        },
        insurance_contact_number: ''
      },
      
      // Optional demographics fields
      occupation: occupation || '',
      aadhaar: cleanedAadhar || '',
      pan: cleanedPAN || ''
    };

    // Add photo path if uploaded
    if (req.file) {
      console.log('Photo uploaded but not stored in schema:', req.file.path);
      // You might want to add a photo field to your schema or handle this differently
    }

    console.log('Final patient data:', JSON.stringify(patientData, null, 2));

    const patient = new Patient(patientData);
    const savedPatient = await patient.save();

    res.status(201).json({
      success: true,
      message: "Patient demographics saved successfully",
      data: savedPatient
    });

  } catch (error) {
    console.error('Error saving patient demographics:', error);
    
    // Log more detailed validation error if available
    if (error.name === 'ValidationError') {
      console.error('Validation errors:', error.errors);
    }
    
    // Log MongoDB validation error details
    if (error.code === 121 && error.errInfo) {
      console.error('MongoDB validation details:', JSON.stringify(error.errInfo.details, null, 2));
    }

    // Delete uploaded file if there was an error
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }

    res.status(500).json({
      success: false,
      message: "Error saving patient demographics",
      error: error.message,
      // Include validation details in development
      ...(process.env.NODE_ENV === 'development' && {
        validationDetails: error.errInfo?.details
      })
    });
  }
});

// @desc    Get a patient by ID
// @route   GET /api/patient-demographics/:id
router.get('/:id', async (req, res) => {
  try {
    const Patient = await getPatientModel();
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ success: false, message: "Patient not found" });
    }
    res.json(patient);
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching patient", error: err.message });
  }
});

export default router;