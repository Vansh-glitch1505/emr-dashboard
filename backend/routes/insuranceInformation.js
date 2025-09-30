import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Patient from '../models/patients.js';

const router = express.Router();

// Configure multer for insurance card image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/insurance-cards';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'insurance-card-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files (JPEG, JPG, PNG) and PDFs are allowed!'));
    }
  }
});

// Helper function to format date from YYYY-MM-DD to MM-DD-YYYY
const formatDateToSchema = (dateString) => {
  if (!dateString) return null;
  const [year, month, day] = dateString.split('-');
  return `${month}-${day}-${year}`;
};

// POST - Create or update insurance information for a patient
router.post('/', async (req, res) => {
  try {
    const {
      patient_id,
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

    // Validate required fields
    if (!patient_id) {
      return res.status(400).json({ error: 'Patient ID is required' });
    }

    if (!primaryCompanyName || !primaryPolicyNumber || !primaryPlanType || !contactNumber) {
      return res.status(400).json({ 
        error: 'Primary insurance company name, policy number, plan type, and contact number are required' 
      });
    }

    // Build insurance object according to schema
    const insuranceData = {
      primary: {
        company_name: primaryCompanyName,
        policy_number: primaryPolicyNumber,
        group_number: primaryGroupNumber || '',
        plan_type: primaryPlanType,
        effective_start: formatDateToSchema(primaryStartDate),
        effective_end: formatDateToSchema(primaryEndDate)
      },
      insurance_contact_number: contactNumber,
      insurance_card_img: {
        file_id: null // Will be updated when file is uploaded
      }
    };

    // Add secondary insurance if provided
    if (secondaryCompanyName || secondaryPolicyNumber) {
      insuranceData.secondary = {
        company_name: secondaryCompanyName || '',
        policy_number: secondaryPolicyNumber || '',
        group_number: secondaryGroupNumber || '',
        plan_type: secondaryPlanType || '',
        effective_start: formatDateToSchema(secondaryStartDate),
        effective_end: formatDateToSchema(secondaryEndDate)
      };
    }

    // Find patient and update insurance information
    const patient = await Patient.findByIdAndUpdate(
      patient_id,
      { insurance: insuranceData },
      { new: true, runValidators: true }
    );

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    res.status(200).json({
      message: 'Insurance information saved successfully',
      patient_id: patient._id,
      insurance: patient.insurance
    });

  } catch (error) {
    console.error('Error saving insurance information:', error);
    res.status(500).json({ 
      error: 'Failed to save insurance information',
      details: error.message 
    });
  }
});

// GET - Retrieve insurance information for a patient
router.get('/:patient_id', async (req, res) => {
  try {
    const { patient_id } = req.params;

    const patient = await Patient.findById(patient_id).select('insurance');

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    if (!patient.insurance) {
      return res.status(404).json({ error: 'No insurance information found for this patient' });
    }

    res.status(200).json({
      patient_id: patient._id,
      insurance: patient.insurance
    });

  } catch (error) {
    console.error('Error fetching insurance information:', error);
    res.status(500).json({ 
      error: 'Failed to fetch insurance information',
      details: error.message 
    });
  }
});

// PUT - Update insurance information for a patient
router.put('/:patient_id', async (req, res) => {
  try {
    const { patient_id } = req.params;
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

    const patient = await Patient.findById(patient_id);

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    // Build updated insurance object
    const insuranceData = {
      primary: {
        company_name: primaryCompanyName,
        policy_number: primaryPolicyNumber,
        group_number: primaryGroupNumber || '',
        plan_type: primaryPlanType,
        effective_start: formatDateToSchema(primaryStartDate),
        effective_end: formatDateToSchema(primaryEndDate)
      },
      insurance_contact_number: contactNumber,
      insurance_card_img: patient.insurance?.insurance_card_img || { file_id: null }
    };

    // Add secondary insurance if provided
    if (secondaryCompanyName || secondaryPolicyNumber) {
      insuranceData.secondary = {
        company_name: secondaryCompanyName || '',
        policy_number: secondaryPolicyNumber || '',
        group_number: secondaryGroupNumber || '',
        plan_type: secondaryPlanType || '',
        effective_start: formatDateToSchema(secondaryStartDate),
        effective_end: formatDateToSchema(secondaryEndDate)
      };
    }

    patient.insurance = insuranceData;
    await patient.save();

    res.status(200).json({
      message: 'Insurance information updated successfully',
      patient_id: patient._id,
      insurance: patient.insurance
    });

  } catch (error) {
    console.error('Error updating insurance information:', error);
    res.status(500).json({ 
      error: 'Failed to update insurance information',
      details: error.message 
    });
  }
});

// POST - Upload insurance card image(s)
router.post('/:patient_id/upload-card', upload.array('insuranceCards', 5), async (req, res) => {
  try {
    const { patient_id } = req.params;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const patient = await Patient.findById(patient_id);

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    // For simplicity, we'll store the first file's ID in the schema
    // You might want to create a separate File collection for better management
    const fileInfo = {
      file_id: null, // In a real implementation, you'd create a File document and store its ObjectId
      path: req.files[0].path,
      filename: req.files[0].filename,
      originalname: req.files[0].originalname,
      mimetype: req.files[0].mimetype,
      size: req.files[0].size
    };

    // Update patient with insurance card image info
    if (!patient.insurance) {
      patient.insurance = {
        primary: { company_name: '', policy_number: '', plan_type: '' },
        insurance_contact_number: '',
        insurance_card_img: { file_id: null }
      };
    }

    patient.insurance.insurance_card_img = { file_id: null }; // Store actual ObjectId in production

    await patient.save();

    res.status(200).json({
      message: 'Insurance card image(s) uploaded successfully',
      files: req.files.map(file => ({
        filename: file.filename,
        originalname: file.originalname,
        path: file.path,
        size: file.size
      }))
    });

  } catch (error) {
    console.error('Error uploading insurance card:', error);
    res.status(500).json({ 
      error: 'Failed to upload insurance card',
      details: error.message 
    });
  }
});

// DELETE - Remove insurance information for a patient
router.delete('/:patient_id', async (req, res) => {
  try {
    const { patient_id } = req.params;

    const patient = await Patient.findById(patient_id);

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    patient.insurance = undefined;
    await patient.save();

    res.status(200).json({
      message: 'Insurance information deleted successfully',
      patient_id: patient._id
    });

  } catch (error) {
    console.error('Error deleting insurance information:', error);
    res.status(500).json({ 
      error: 'Failed to delete insurance information',
      details: error.message 
    });
  }
});

export default router;