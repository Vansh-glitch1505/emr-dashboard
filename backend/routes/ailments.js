import express from 'express';
import Patient from '../models/patients.js';

const router = express.Router();

// Helper function to format date from YYYY-MM-DD to MM-DD-YYYY
const formatDateToSchema = (dateString) => {
  if (!dateString) return null;
  const [year, month, day] = dateString.split('-');
  return `${month}-${day}-${year}`;
};

// Helper function to format date from MM-DD-YYYY to YYYY-MM-DD for frontend
const formatDateFromSchema = (dateString) => {
  if (!dateString) return null;
  const [month, day, year] = dateString.split('-');
  return `${year}-${month}-${day}`;
};

// Helper function to map pain level number to text
const getPainLevelText = (painLevel) => {
  const levels = [
    'No pain', 'Very mild', 'Mild', 'Moderate', 'Moderately severe',
    'Severe', 'Very severe', 'Intense', 'Very intense', 'Excruciating', 'Unimaginable'
  ];
  const index = parseInt(painLevel, 10);
  return levels[index] || 'No pain';
};

// POST - Add a new ailment to patient's ailments array
router.post('/:patient_id', async (req, res) => {
  try {
    const { patient_id } = req.params;
    const {
      problemName,
      icdCode,
      description,
      status,
      severity,
      dateOfOnset,
      pain,
      riskFactor,
      comorbidities,
      sideEffects,
      treatmentPlan,
      testResults
    } = req.body;

    // Validate required fields
    if (!patient_id) {
      return res.status(400).json({ error: 'Patient ID is required' });
    }

    if (!problemName) {
      return res.status(400).json({ error: 'Problem name is required' });
    }

    if (!status || status === 'Select') {
      return res.status(400).json({ error: 'Status is required' });
    }

    // Validate severity - must be provided and not "Select"
    if (!severity || severity === 'Select') {
      return res.status(400).json({ error: 'Severity is required' });
    }

    // Find the patient
    const patient = await Patient.findById(patient_id);

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    // Build ailment object according to schema
    const ailmentData = {
      name: problemName,
      icd_code: icdCode || '',
      description: description || '',
      status: status,
      severity: severity, // Must be a valid enum value
      pain: getPainLevelText(pain),
      date_of_onset: formatDateToSchema(dateOfOnset),
      risk_factor: riskFactor || '',
      Comorbidities: comorbidities || '',
      Medication_side_effects: sideEffects || '',
      Treatment_plan: treatmentPlan || '',
      Test_results: testResults || ''
    };

    // Initialize ailments array if it doesn't exist
    if (!patient.ailments) {
      patient.ailments = [];
    }

    // Add the ailment to the array
    patient.ailments.push(ailmentData);

    // Save the patient
    await patient.save();

    res.status(201).json({
      message: 'Ailment added successfully',
      patient_id: patient._id,
      ailment: ailmentData,
      totalAilments: patient.ailments.length
    });

  } catch (error) {
    console.error('Error adding ailment:', error);
    res.status(500).json({ 
      error: 'Failed to add ailment',
      details: error.message 
    });
  }
});

// POST - Add multiple ailments at once
// POST - Add multiple ailments at once
router.post('/:patient_id/bulk', async (req, res) => {
  try {
    const { patient_id } = req.params;
    const { ailments } = req.body;

    if (!patient_id) {
      return res.status(400).json({ error: 'Patient ID is required' });
    }

    if (!ailments || !Array.isArray(ailments) || ailments.length === 0) {
      return res.status(400).json({ error: 'Ailments array is required' });
    }

    const patient = await Patient.findById(patient_id);

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    // Validate each ailment before processing
    for (let i = 0; i < ailments.length; i++) {
      const ailment = ailments[i];
      
      if (!ailment.problemName) {
        return res.status(400).json({ 
          error: `Ailment at index ${i}: Problem name is required` 
        });
      }
      
      if (!ailment.status || ailment.status === 'Select') {
        return res.status(400).json({ 
          error: `Ailment at index ${i}: Status is required` 
        });
      }
      
      if (!ailment.severity || ailment.severity === 'Select') {
        return res.status(400).json({ 
          error: `Ailment at index ${i}: Severity is required` 
        });
      }
    }

    // Initialize ailments array if it doesn't exist
    if (!patient.ailments) {
      patient.ailments = [];
    }

    // Map and add all ailments
    const ailmentsToAdd = ailments.map(ailment => ({
      name: ailment.problemName,
      icd_code: ailment.icdCode || '',
      description: ailment.description || '',
      status: ailment.status,
      severity: ailment.severity,
      pain: getPainLevelText(ailment.pain || '0'),
      date_of_onset: formatDateToSchema(ailment.dateOfOnset),
      risk_factor: ailment.riskFactor || '',
      Comorbidities: ailment.comorbidities || '',
      Medication_side_effects: ailment.sideEffects || '',
      Treatment_plan: ailment.treatmentPlan || '',
      Test_results: ailment.testResults || ''
    }));

    // Log the data being added for debugging
    console.log('Ailments to add:', JSON.stringify(ailmentsToAdd, null, 2));

    patient.ailments.push(...ailmentsToAdd);
    await patient.save();

    res.status(201).json({
      message: `${ailmentsToAdd.length} ailments added successfully`,
      patient_id: patient._id,
      totalAilments: patient.ailments.length
    });

  } catch (error) {
    console.error('Error adding bulk ailments:', error);
    
    // Log detailed validation error
    if (error.name === 'ValidationError') {
      console.error('Validation errors:', JSON.stringify(error.errors, null, 2));
    }
    if (error.errInfo) {
      console.error('MongoDB validation details:', JSON.stringify(error.errInfo.details, null, 2));
    }
    
    res.status(500).json({ 
      error: 'Failed to add ailments',
      details: error.message,
      validationDetails: error.errInfo?.details
    });
  }
});

// GET - Retrieve all ailments for a patient
router.get('/:patient_id', async (req, res) => {
  try {
    const { patient_id } = req.params;

    const patient = await Patient.findById(patient_id).select('ailments');

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    // Format dates for frontend
    const formattedAilments = (patient.ailments || []).map(ailment => ({
      problemName: ailment.name,
      icdCode: ailment.icd_code,
      description: ailment.description,
      status: ailment.status,
      severity: ailment.severity,
      dateOfOnset: formatDateFromSchema(ailment.date_of_onset),
      pain: ailment.pain,
      riskFactor: ailment.risk_factor,
      comorbidities: ailment.Comorbidities,
      sideEffects: ailment.Medication_side_effects,
      treatmentPlan: ailment.Treatment_plan,
      testResults: ailment.Test_results
    }));

    res.status(200).json({
      patient_id: patient._id,
      ailments: formattedAilments,
      totalAilments: formattedAilments.length
    });

  } catch (error) {
    console.error('Error fetching ailments:', error);
    res.status(500).json({ 
      error: 'Failed to fetch ailments',
      details: error.message 
    });
  }
});

// GET - Retrieve a specific ailment by index
router.get('/:patient_id/:ailment_index', async (req, res) => {
  try {
    const { patient_id, ailment_index } = req.params;
    const index = parseInt(ailment_index, 10);

    const patient = await Patient.findById(patient_id).select('ailments');

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    if (!patient.ailments || index < 0 || index >= patient.ailments.length) {
      return res.status(404).json({ error: 'Ailment not found' });
    }

    const ailment = patient.ailments[index];

    const formattedAilment = {
      problemName: ailment.name,
      icdCode: ailment.icd_code,
      description: ailment.description,
      status: ailment.status,
      severity: ailment.severity,
      dateOfOnset: formatDateFromSchema(ailment.date_of_onset),
      pain: ailment.pain,
      riskFactor: ailment.risk_factor,
      comorbidities: ailment.Comorbidities,
      sideEffects: ailment.Medication_side_effects,
      treatmentPlan: ailment.Treatment_plan,
      testResults: ailment.Test_results
    };

    res.status(200).json({
      patient_id: patient._id,
      ailmentIndex: index,
      ailment: formattedAilment
    });

  } catch (error) {
    console.error('Error fetching ailment:', error);
    res.status(500).json({ 
      error: 'Failed to fetch ailment',
      details: error.message 
    });
  }
});

// PUT - Update a specific ailment by index
router.put('/:patient_id/:ailment_index', async (req, res) => {
  try {
    const { patient_id, ailment_index } = req.params;
    const index = parseInt(ailment_index, 10);
    const {
      problemName,
      icdCode,
      description,
      status,
      severity,
      dateOfOnset,
      pain,
      riskFactor,
      comorbidities,
      sideEffects,
      treatmentPlan,
      testResults
    } = req.body;

    // Validate severity
    if (!severity || severity === 'Select') {
      return res.status(400).json({ error: 'Severity is required' });
    }

    const patient = await Patient.findById(patient_id);

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    if (!patient.ailments || index < 0 || index >= patient.ailments.length) {
      return res.status(404).json({ error: 'Ailment not found' });
    }

    // Update the ailment at the specified index
    patient.ailments[index] = {
      name: problemName,
      icd_code: icdCode || '',
      description: description || '',
      status: status,
      severity: severity, // Must be a valid enum value
      pain: getPainLevelText(pain || '0'),
      date_of_onset: formatDateToSchema(dateOfOnset),
      risk_factor: riskFactor || '',
      Comorbidities: comorbidities || '',
      Medication_side_effects: sideEffects || '',
      Treatment_plan: treatmentPlan || '',
      Test_results: testResults || ''
    };

    await patient.save();

    res.status(200).json({
      message: 'Ailment updated successfully',
      patient_id: patient._id,
      ailmentIndex: index,
      ailment: patient.ailments[index]
    });

  } catch (error) {
    console.error('Error updating ailment:', error);
    res.status(500).json({ 
      error: 'Failed to update ailment',
      details: error.message 
    });
  }
});

// DELETE - Remove a specific ailment by index
router.delete('/:patient_id/:ailment_index', async (req, res) => {
  try {
    const { patient_id, ailment_index } = req.params;
    const index = parseInt(ailment_index, 10);

    const patient = await Patient.findById(patient_id);

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    if (!patient.ailments || index < 0 || index >= patient.ailments.length) {
      return res.status(404).json({ error: 'Ailment not found' });
    }

    // Remove the ailment at the specified index
    patient.ailments.splice(index, 1);

    await patient.save();

    res.status(200).json({
      message: 'Ailment deleted successfully',
      patient_id: patient._id,
      remainingAilments: patient.ailments.length
    });

  } catch (error) {
    console.error('Error deleting ailment:', error);
    res.status(500).json({ 
      error: 'Failed to delete ailment',
      details: error.message 
    });
  }
});

// DELETE - Remove all ailments for a patient
router.delete('/:patient_id', async (req, res) => {
  try {
    const { patient_id } = req.params;

    const patient = await Patient.findById(patient_id);

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    patient.ailments = [];
    await patient.save();

    res.status(200).json({
      message: 'All ailments deleted successfully',
      patient_id: patient._id
    });

  } catch (error) {
    console.error('Error deleting all ailments:', error);
    res.status(500).json({ 
      error: 'Failed to delete ailments',
      details: error.message 
    });
  }
});

export default router;
