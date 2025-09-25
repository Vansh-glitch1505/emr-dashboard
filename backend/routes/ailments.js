// backend/routes/ailments.js
import express from 'express';
import Patient from '../models/patients.js'; // Changed from Ailments to Patient

const router = express.Router();

// 🔹 Debug ping - PLACE BEFORE :id so it won't be treated as an id
router.get('/ping', (req, res) => {
  return res.json({ ok: true, msg: 'Ailments route is mounted ✅' });
});

// 🔹 Get ailments by status (must come before :id)
router.get('/status/:status', async (req, res) => {
  try {
    const { status } = req.params;
    const ailments = await Patient.find({ status }).sort({ createdAt: -1 }); // Changed from Ailments to Patient
    return res.status(200).json({ success: true, count: ailments.length, data: ailments });
  } catch (error) {
    console.error('Error fetching ailments by status:', error);
    return res.status(500).json({ success: false, message: 'Error fetching ailments by status', error: error.message });
  }
});

// 🔹 Get all ailments
router.get('/', async (req, res) => {
  try {
    const ailments = await Patient.find().sort({ createdAt: -1 }); // Changed from Ailments to Patient
    return res.status(200).json({ success: true, count: ailments.length, data: ailments });
  } catch (error) {
    console.error('Error fetching ailments:', error);
    return res.status(500).json({ success: false, message: 'Error fetching ailments', error: error.message });
  }
});

// 🔹 Get single ailment by ID (keep after the specific routes)
router.get('/:id', async (req, res) => {
  try {
    const ailment = await Patient.findById(req.params.id); // Changed from Ailments to Patient
    if (!ailment) {
      return res.status(404).json({ success: false, message: 'Ailment not found' });
    }
    return res.status(200).json({ success: true, data: ailment });
  } catch (error) {
    console.error('Error fetching ailment:', error);
    // Distinguish invalid ObjectId vs other errors
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return res.status(400).json({ success: false, message: 'Invalid ID' });
    }
    return res.status(500).json({ success: false, message: 'Error fetching ailment', error: error.message });
  }
});

// 🔹 Create new ailment
router.post('/', async (req, res) => {
  try {
    console.log('POST /api/ailments body:', req.body); // debug
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

    if (!problemName || problemName.trim() === '') {
      return res.status(400).json({ success: false, message: 'Problem name is required' });
    }

    const newAilment = new Patient({ // Changed from Ailments to Patient
      problemName: problemName.trim(),
      icdCode: icdCode?.trim() || '',
      description: description?.trim() || '',
      status: status || 'Select',
      severity: severity || 'Select',
      dateOfOnset: dateOfOnset || null,
      pain: parseInt(pain) || 0,
      riskFactor: riskFactor?.trim() || '',
      comorbidities: comorbidities?.trim() || '',
      sideEffects: sideEffects?.trim() || '',
      treatmentPlan: treatmentPlan?.trim() || '',
      testResults: testResults?.trim() || ''
    });

    const savedAilment = await newAilment.save();
    console.log('Saved ailment id:', savedAilment._id); // debug
    return res.status(201).json({ success: true, message: 'Ailment created successfully', data: savedAilment });
  } catch (error) {
    console.error('Error creating ailment:', error);
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: 'Validation error', errors: validationErrors });
    }
    return res.status(500).json({ success: false, message: 'Error creating ailment', error: error.message });
  }
});

// 🔹 Update ailment
router.put('/:id', async (req, res) => {
  try {
    const updatedAilment = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); // Changed from Ailments to Patient
    if (!updatedAilment) return res.status(404).json({ success: false, message: 'Ailment not found' });
    return res.status(200).json({ success: true, message: 'Ailment updated successfully', data: updatedAilment });
  } catch (error) {
    console.error('Error updating ailment:', error);
    return res.status(500).json({ success: false, message: 'Error updating ailment', error: error.message });
  }
});

// 🔹 Delete ailment
router.delete('/:id', async (req, res) => {
  try {
    const deletedAilment = await Patient.findByIdAndDelete(req.params.id); // Changed from Ailments to Patient
    if (!deletedAilment) return res.status(404).json({ success: false, message: 'Ailment not found' });
    return res.status(200).json({ success: true, message: 'Ailment deleted successfully', data: deletedAilment });
  } catch (error) {
    console.error('Error deleting ailment:', error);
    return res.status(500).json({ success: false, message: 'Error deleting ailment', error: error.message });
  }
});

export default router;