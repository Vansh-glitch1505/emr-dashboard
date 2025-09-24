import mongoose from 'mongoose';

const testSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  result: {
    type: String,
    trim: true
  },
  comment: {
    type: String,
    trim: true
  },
  fileName: {
    type: String,
    trim: true
  }
  // Ignoring file upload fields for now as requested
}, { _id: false });

const assessmentSchema = new mongoose.Schema({
  chiefComplaints: {
    type: String,
    trim: true
  },
  historyOfPresentIllness: {
    type: String,
    trim: true
  },
  pastMedicalHistory: {
    type: String,
    trim: true
  },
  medicationHistory: {
    type: String,
    trim: true
  },
  tests: {
    type: [testSchema],
    default: []
  },
  remindersAlerts: {
    type: String,
    trim: true
  },
  planCare: {
    type: String,
    trim: true
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
assessmentSchema.index({ createdAt: -1 });
assessmentSchema.index({ 'chiefComplaints': 'text', 'historyOfPresentIllness': 'text' });

const Assessment = mongoose.model('Assessment', assessmentSchema);

export default Assessment;