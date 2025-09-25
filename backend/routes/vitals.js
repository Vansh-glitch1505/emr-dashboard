/*import express from 'express';
import Vitals from '../models/Vitals.js';

const router = express.Router();

// GET all vitals
router.get('/', async (req, res) => {
  try {
    const vitals = await Vitals.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: vitals.length,
      data: vitals
    });
  } catch (error) {
    console.error('Error fetching vitals:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching vitals',
      error: error.message
    });
  }
});

// GET vitals by patient ID
router.get('/patient/:patientId', async (req, res) => {
  try {
    const { patientId } = req.params;
    const vitals = await Vitals.find({ patient_id: patientId }).sort({ date: -1, createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: vitals.length,
      data: vitals
    });
  } catch (error) {
    console.error('Error fetching patient vitals:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching patient vitals',
      error: error.message
    });
  }
});

// GET single vital record by ID
router.get('/:id', async (req, res) => {
  try {
    const vital = await Vitals.findById(req.params.id);
    
    if (!vital) {
      return res.status(404).json({
        success: false,
        message: 'Vital record not found'
      });
    }

    res.status(200).json({
      success: true,
      data: vital
    });
  } catch (error) {
    console.error('Error fetching vital record:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching vital record',
      error: error.message
    });
  }
});

// POST create new vital record
router.post('/', async (req, res) => {
  try {
    const {
      patient_id,
      date,
      time,
      systolic,
      diastolic,
      pulse,
      respiratory,
      temperature,
      temp_unit,
      height,
      height_unit,
      weight,
      bmi,
      spo2,
      comments
    } = req.body;

    // Validation
    if (!patient_id) {
      return res.status(400).json({
        success: false,
        message: 'Patient ID is required'
      });
    }

    if (!date) {
      return res.status(400).json({
        success: false,
        message: 'Date is required'
      });
    }

    if (!time) {
      return res.status(400).json({
        success: false,
        message: 'Time is required'
      });
    }

    // Additional validation for vital ranges
    const validationErrors = [];

    if (systolic && (systolic < 50 || systolic > 250)) {
      validationErrors.push('Systolic BP must be between 50-250 mmHg');
    }

    if (diastolic && (diastolic < 30 || diastolic > 150)) {
      validationErrors.push('Diastolic BP must be between 30-150 mmHg');
    }

    if (pulse && (pulse < 30 || pulse > 200)) {
      validationErrors.push('Pulse rate must be between 30-200 BPM');
    }

    if (spo2 && (spo2 < 70 || spo2 > 100)) {
      validationErrors.push('SpO2 must be between 70-100%');
    }

    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: validationErrors
      });
    }

    // Create new vital record
    const newVital = new Vitals({
      patient_id: patient_id.trim(),
      date: new Date(date),
      time: time.trim(),
      systolic: systolic || null,
      diastolic: diastolic || null,
      pulse: pulse || null,
      respiratory: respiratory || null,
      temperature: temperature || null,
      temp_unit: temp_unit || 'Celsius',
      height: height || null,
      height_unit: height_unit || 'feet',
      weight: weight || null,
      bmi: bmi || null,
      spo2: spo2 || null,
      comments: comments?.trim() || null
    });

    const savedVital = await newVital.save();

    res.status(201).json({
      success: true,
      message: 'Vital record created successfully',
      data: savedVital
    });
  } catch (error) {
    console.error('Error creating vital record:', error);
    
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
      message: 'Error creating vital record',
      error: error.message
    });
  }
});

// PUT update vital record by ID
router.put('/:id', async (req, res) => {
  try {
    const {
      patient_id,
      date,
      time,
      systolic,
      diastolic,
      pulse,
      respiratory,
      temperature,
      temp_unit,
      height,
      height_unit,
      weight,
      bmi,
      spo2,
      comments
    } = req.body;

    // Validation
    if (!patient_id) {
      return res.status(400).json({
        success: false,
        message: 'Patient ID is required'
      });
    }

    if (!date) {
      return res.status(400).json({
        success: false,
        message: 'Date is required'
      });
    }

    if (!time) {
      return res.status(400).json({
        success: false,
        message: 'Time is required'
      });
    }

    const updatedVital = await Vitals.findByIdAndUpdate(
      req.params.id,
      {
        patient_id: patient_id.trim(),
        date: new Date(date),
        time: time.trim(),
        systolic: systolic || null,
        diastolic: diastolic || null,
        pulse: pulse || null,
        respiratory: respiratory || null,
        temperature: temperature || null,
        temp_unit: temp_unit || 'Celsius',
        height: height || null,
        height_unit: height_unit || 'feet',
        weight: weight || null,
        bmi: bmi || null,
        spo2: spo2 || null,
        comments: comments?.trim() || null
      },
      { 
        new: true, // Return updated document
        runValidators: true // Run schema validators
      }
    );

    if (!updatedVital) {
      return res.status(404).json({
        success: false,
        message: 'Vital record not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Vital record updated successfully',
      data: updatedVital
    });
  } catch (error) {
    console.error('Error updating vital record:', error);
    
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
      message: 'Error updating vital record',
      error: error.message
    });
  }
});

// DELETE vital record by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedVital = await Vitals.findByIdAndDelete(req.params.id);

    if (!deletedVital) {
      return res.status(404).json({
        success: false,
        message: 'Vital record not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Vital record deleted successfully',
      data: deletedVital
    });
  } catch (error) {
    console.error('Error deleting vital record:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting vital record',
      error: error.message
    });
  }
});

// GET latest vitals for a patient
router.get('/patient/:patientId/latest', async (req, res) => {
  try {
    const { patientId } = req.params;
    const latestVital = await Vitals.findOne({ patient_id: patientId })
      .sort({ date: -1, createdAt: -1 });
    
    if (!latestVital) {
      return res.status(404).json({
        success: false,
        message: 'No vital records found for this patient'
      });
    }

    res.status(200).json({
      success: true,
      data: latestVital
    });
  } catch (error) {
    console.error('Error fetching latest vitals:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching latest vitals',
      error: error.message
    });
  }
});

// GET vitals by date range
router.get('/patient/:patientId/range', async (req, res) => {
  try {
    const { patientId } = req.params;
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Start date and end date are required'
      });
    }

    const vitals = await Vitals.find({
      patient_id: patientId,
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    }).sort({ date: -1, createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: vitals.length,
      data: vitals
    });
  } catch (error) {
    console.error('Error fetching vitals by date range:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching vitals by date range',
      error: error.message
    });
  }
});

export default router; */