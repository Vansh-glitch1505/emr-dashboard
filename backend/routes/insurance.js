import express from 'express';
import Insurance from '../models/Insurance.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/insurance-cards';
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `insurance-card-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Check file type
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// POST /api/insurance - Create or update insurance information
router.post('/', async (req, res) => {
  try {
    const {
      user_id,
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

    // Validate required user_id
    if (!user_id) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Check if insurance information already exists for this user
    let insurance = await Insurance.findOne({ user_id });

    if (insurance) {
      // Update existing insurance information
      insurance.primaryCompanyName = primaryCompanyName || insurance.primaryCompanyName;
      insurance.primaryPolicyNumber = primaryPolicyNumber || insurance.primaryPolicyNumber;
      insurance.primaryGroupNumber = primaryGroupNumber || insurance.primaryGroupNumber;
      insurance.primaryPlanType = primaryPlanType || insurance.primaryPlanType;
      insurance.primaryStartDate = primaryStartDate || insurance.primaryStartDate;
      insurance.primaryEndDate = primaryEndDate || insurance.primaryEndDate;
      insurance.secondaryCompanyName = secondaryCompanyName || insurance.secondaryCompanyName;
      insurance.secondaryPolicyNumber = secondaryPolicyNumber || insurance.secondaryPolicyNumber;
      insurance.secondaryGroupNumber = secondaryGroupNumber || insurance.secondaryGroupNumber;
      insurance.secondaryPlanType = secondaryPlanType || insurance.secondaryPlanType;
      insurance.secondaryStartDate = secondaryStartDate || insurance.secondaryStartDate;
      insurance.secondaryEndDate = secondaryEndDate || insurance.secondaryEndDate;
      insurance.contactNumber = contactNumber || insurance.contactNumber;

      await insurance.save();
      
      res.status(200).json({
        message: 'Insurance information updated successfully',
        data: insurance
      });
    } else {
      // Create new insurance information
      insurance = new Insurance({
        user_id,
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
      });

      await insurance.save();
      
      res.status(201).json({
        message: 'Insurance information created successfully',
        data: insurance
      });
    }

  } catch (error) {
    console.error('Error saving insurance information:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
});

// GET /api/insurance/:user_id - Get insurance information for a specific user
router.get('/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;

    const insurance = await Insurance.findOne({ user_id });

    if (!insurance) {
      return res.status(404).json({ 
        error: 'Insurance information not found for this user' 
      });
    }

    res.status(200).json({
      message: 'Insurance information retrieved successfully',
      data: insurance
    });

  } catch (error) {
    console.error('Error retrieving insurance information:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
});

// POST /api/insurance/:user_id/upload-card - Upload insurance card images
router.post('/:user_id/upload-card', upload.array('insuranceCards', 5), async (req, res) => {
  try {
    const { user_id } = req.params;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const filePaths = req.files.map(file => file.path);

    // Update insurance record with uploaded file paths
    const insurance = await Insurance.findOne({ user_id });
    
    if (!insurance) {
      return res.status(404).json({ 
        error: 'Insurance information not found. Please save insurance details first.' 
      });
    }

    // Add new file paths to existing ones
    insurance.insuranceCardImages = insurance.insuranceCardImages.concat(filePaths);
    await insurance.save();

    res.status(200).json({
      message: 'Insurance card images uploaded successfully',
      files: req.files.map(file => ({
        filename: file.filename,
        path: file.path,
        size: file.size
      }))
    });

  } catch (error) {
    console.error('Error uploading insurance card images:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
});

// DELETE /api/insurance/:user_id - Delete insurance information
router.delete('/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;

    const insurance = await Insurance.findOneAndDelete({ user_id });

    if (!insurance) {
      return res.status(404).json({ 
        error: 'Insurance information not found for this user' 
      });
    }

    // Delete associated image files
    if (insurance.insuranceCardImages && insurance.insuranceCardImages.length > 0) {
      insurance.insuranceCardImages.forEach(imagePath => {
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      });
    }

    res.status(200).json({
      message: 'Insurance information deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting insurance information:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
});

export default router;