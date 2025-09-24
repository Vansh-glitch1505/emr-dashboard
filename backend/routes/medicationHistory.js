import express from 'express';
import MedicationHistory from '../models/MedicationHistory.js';

const router = express.Router();

// GET all medication histories
router.get('/', async (req, res) => {
  try {
    const medicationHistories = await MedicationHistory.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: medicationHistories.length,
      data: medicationHistories
    });
  } catch (error) {
    console.error('Error fetching medication histories:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching medication histories',
      error: error.message
    });
  }
});

// GET active medications by userId (must be before :userId)
router.get('/:userId/active', async (req, res) => {
  try {
    const { userId } = req.params;
    const userIdNumber = parseInt(userId, 10);
    
    if (isNaN(userIdNumber)) {
      return res.status(400).json({ success: false, message: 'Invalid userId format' });
    }

    const medicationHistory = await MedicationHistory.findOne({ userId: userIdNumber });
    if (!medicationHistory) {
      return res.status(200).json({ success: true, data: [] });
    }

    const activeMedications = medicationHistory.medications.filter(med => med.status === true);

    res.status(200).json({
      success: true,
      count: activeMedications.length,
      data: activeMedications
    });
  } catch (error) {
    console.error('Error fetching active medications:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching active medications',
      error: error.message
    });
  }
});

// GET inactive medications by userId (must be before :userId)
router.get('/:userId/inactive', async (req, res) => {
  try {
    const { userId } = req.params;
    const userIdNumber = parseInt(userId, 10);
    
    if (isNaN(userIdNumber)) {
      return res.status(400).json({ success: false, message: 'Invalid userId format' });
    }

    const medicationHistory = await MedicationHistory.findOne({ userId: userIdNumber });
    if (!medicationHistory) {
      return res.status(200).json({ success: true, data: [] });
    }

    const inactiveMedications = medicationHistory.medications.filter(med => med.status === false);

    res.status(200).json({
      success: true,
      count: inactiveMedications.length,
      data: inactiveMedications
    });
  } catch (error) {
    console.error('Error fetching inactive medications:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching inactive medications',
      error: error.message
    });
  }
});

// GET medication history by userId
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const userIdNumber = parseInt(userId, 10);
    
    if (isNaN(userIdNumber)) {
      return res.status(400).json({ success: false, message: 'Invalid userId format' });
    }

    const medicationHistory = await MedicationHistory.findOne({ userId: userIdNumber });
    if (!medicationHistory) {
      return res.status(200).json([]); // empty array if not found
    }

    res.status(200).json(medicationHistory.medications);
  } catch (error) {
    console.error('Error fetching medication history:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching medication history',
      error: error.message
    });
  }
});

// POST create or update medication history
router.post('/', async (req, res) => {
  try {
    const { userId, medications } = req.body;

    if (!userId) return res.status(400).json({ success: false, message: 'userId is required' });
    if (!Array.isArray(medications)) return res.status(400).json({ success: false, message: 'medications must be an array' });

    const userIdNumber = parseInt(userId, 10);
    if (isNaN(userIdNumber)) return res.status(400).json({ success: false, message: 'Invalid userId format' });

    const processedMedications = medications.map(med => ({
      problem: med.problem?.trim() || '',
      medicine: med.medicine?.trim() || '',
      mg: med.mg?.trim() || '',
      doseTime: med.doseTime || '',
      timePeriod: med.timePeriod || '',
      status: Boolean(med.status)
    }));

    let medicationHistory = await MedicationHistory.findOne({ userId: userIdNumber });

    if (medicationHistory) {
      medicationHistory.medications = processedMedications;
      await medicationHistory.save();
      res.status(200).json({ success: true, message: 'Medication history updated successfully', data: medicationHistory });
    } else {
      const newMedicationHistory = new MedicationHistory({ userId: userIdNumber, medications: processedMedications });
      const saved = await newMedicationHistory.save();
      res.status(201).json({ success: true, message: 'Medication history created successfully', data: saved });
    }
  } catch (error) {
    console.error('Error saving medication history:', error);
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ success: false, message: 'Validation error', errors: validationErrors });
    }
    res.status(500).json({ success: false, message: 'Error saving medication history', error: error.message });
  }
});

// PUT update medication history by userId
router.put('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { medications } = req.body;

    const userIdNumber = parseInt(userId, 10);
    if (isNaN(userIdNumber)) return res.status(400).json({ success: false, message: 'Invalid userId format' });
    if (!Array.isArray(medications)) return res.status(400).json({ success: false, message: 'medications must be an array' });

    const processedMedications = medications.map(med => ({
      problem: med.problem?.trim() || '',
      medicine: med.medicine?.trim() || '',
      mg: med.mg?.trim() || '',
      doseTime: med.doseTime || '',
      timePeriod: med.timePeriod || '',
      status: Boolean(med.status)
    }));

    const updated = await MedicationHistory.findOneAndUpdate(
      { userId: userIdNumber },
      { medications: processedMedications },
      { new: true, runValidators: true, upsert: true }
    );

    res.status(200).json({ success: true, message: 'Medication history updated successfully', data: updated });
  } catch (error) {
    console.error('Error updating medication history:', error);
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ success: false, message: 'Validation error', errors: validationErrors });
    }
    res.status(500).json({ success: false, message: 'Error updating medication history', error: error.message });
  }
});

// DELETE medication history by userId
router.delete('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const userIdNumber = parseInt(userId, 10);
    if (isNaN(userIdNumber)) return res.status(400).json({ success: false, message: 'Invalid userId format' });

    const deleted = await MedicationHistory.findOneAndDelete({ userId: userIdNumber });
    if (!deleted) return res.status(404).json({ success: false, message: 'Medication history not found' });

    res.status(200).json({ success: true, message: 'Medication history deleted successfully', data: deleted });
  } catch (error) {
    console.error('Error deleting medication history:', error);
    res.status(500).json({ success: false, message: 'Error deleting medication history', error: error.message });
  }
});

export default router;
