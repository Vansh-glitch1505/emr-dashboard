/*import express from 'express';
import Assessment from '../models/Assessment.js';

const router = express.Router();

// GET all assessments
router.get('/', async (req, res) => {
  try {
    const assessments = await Assessment.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: assessments.length,
      data: assessments
    });
  } catch (error) {
    console.error('Error fetching assessments:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching assessments',
      error: error.message
    });
  }
});

// GET single assessment by ID
router.get('/:id', async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.id);
    
    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: 'Assessment not found'
      });
    }

    res.status(200).json({
      success: true,
      data: assessment
    });
  } catch (error) {
    console.error('Error fetching assessment:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching assessment',
      error: error.message
    });
  }
});

// POST create new assessment
router.post('/', async (req, res) => {
  try {
    const {
      chiefComplaints,
      historyOfPresentIllness,
      pastMedicalHistory,
      medicationHistory,
      tests,
      remindersAlerts,
      planCare
    } = req.body;

    // Process tests data - remove file-related fields for now
    const processedTests = tests?.map(test => ({
      id: test.id || Date.now().toString(),
      result: test.result?.trim() || '',
      comment: test.comment?.trim() || '',
      fileName: test.fileName?.trim() || ''
    })) || [];

    // Create new assessment
    const newAssessment = new Assessment({
      chiefComplaints: chiefComplaints?.trim() || '',
      historyOfPresentIllness: historyOfPresentIllness?.trim() || '',
      pastMedicalHistory: pastMedicalHistory?.trim() || '',
      medicationHistory: medicationHistory?.trim() || '',
      tests: processedTests,
      remindersAlerts: remindersAlerts?.trim() || '',
      planCare: planCare?.trim() || ''
    });

    const savedAssessment = await newAssessment.save();

    res.status(201).json({
      success: true,
      message: 'Assessment created successfully',
      data: savedAssessment
    });
  } catch (error) {
    console.error('Error creating assessment:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: validationErrors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error creating assessment',
      error: error.message
    });
  }
});

// PUT update assessment by ID
router.put('/:id', async (req, res) => {
  try {
    const {
      chiefComplaints,
      historyOfPresentIllness,
      pastMedicalHistory,
      medicationHistory,
      tests,
      remindersAlerts,
      planCare
    } = req.body;

    // Process tests data - remove file-related fields for now
    const processedTests = tests?.map(test => ({
      id: test.id || Date.now().toString(),
      result: test.result?.trim() || '',
      comment: test.comment?.trim() || '',
      fileName: test.fileName?.trim() || ''
    })) || [];

    const updatedAssessment = await Assessment.findByIdAndUpdate(
      req.params.id,
      {
        chiefComplaints: chiefComplaints?.trim() || '',
        historyOfPresentIllness: historyOfPresentIllness?.trim() || '',
        pastMedicalHistory: pastMedicalHistory?.trim() || '',
        medicationHistory: medicationHistory?.trim() || '',
        tests: processedTests,
        remindersAlerts: remindersAlerts?.trim() || '',
        planCare: planCare?.trim() || ''
      },
      { 
        new: true, // Return updated document
        runValidators: true // Run schema validators
      }
    );

    if (!updatedAssessment) {
      return res.status(404).json({
        success: false,
        message: 'Assessment not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Assessment updated successfully',
      data: updatedAssessment
    });
  } catch (error) {
    console.error('Error updating assessment:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: validationErrors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error updating assessment',
      error: error.message
    });
  }
});

// DELETE assessment by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedAssessment = await Assessment.findByIdAndDelete(req.params.id);

    if (!deletedAssessment) {
      return res.status(404).json({
        success: false,
        message: 'Assessment not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Assessment deleted successfully',
      data: deletedAssessment
    });
  } catch (error) {
    console.error('Error deleting assessment:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting assessment',
      error: error.message
    });
  }
});

// GET assessments with search functionality
router.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    
    // Use text search on indexed fields
    const assessments = await Assessment.find({
      $text: { $search: query }
    }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: assessments.length,
      data: assessments
    });
  } catch (error) {
    console.error('Error searching assessments:', error);
    res.status(500).json({
      success: false,
      message: 'Error searching assessments',
      error: error.message
    });
  }
});

export default router; */