import mongoose from 'mongoose';

const medicationSchema = new mongoose.Schema({
  problem: {
    type: String,
    trim: true
  },
  medicine: {
    type: String,
    trim: true
  },
  mg: {
    type: String,
    trim: true
  },
  doseTime: {
    type: String,
    enum: ['', 'OD', 'BD', 'TDS', 'QID', 'PRN'],
    default: ''
  },
  timePeriod: {
    type: String,
    enum: ['', '1 week', '2 weeks', '1 month', '3 months', '6 months', 'Ongoing'],
    default: ''
  },
  status: {
    type: Boolean,
    default: false
  }
}, { _id: false });

const medicationHistorySchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true
  },
  medications: {
    type: [medicationSchema],
    default: []
  },
  // Optional: Add patient reference if you have a patient system
  // patientId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Patient'
  // }
}, {
  timestamps: true // This will add createdAt and updatedAt fields
});

// Add indexes for better query performance
medicationHistorySchema.index({ userId: 1 });
medicationHistorySchema.index({ createdAt: -1 });
medicationHistorySchema.index({ 'medications.status': 1 });
medicationHistorySchema.index({ 'medications.medicine': 'text', 'medications.problem': 'text' });

const MedicationHistory = mongoose.model('MedicationHistory', medicationHistorySchema);

export default MedicationHistory;