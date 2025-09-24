import mongoose from 'mongoose';

const ailmentsSchema = new mongoose.Schema({
  problemName: {
    type: String,
    required: true,
    trim: true
  },
  icdCode: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['Select', 'Active', 'Resolved'],
    default: 'Select'
  },
  severity: {
    type: String,
    enum: ['Select', 'Mild', 'Moderate', 'Severe'],
    default: 'Select'
  },
  dateOfOnset: {
    type: Date
  },
  pain: {
    type: Number,
    min: 0,
    max: 10,
    default: 0
  },
  riskFactor: {
    type: String,
    trim: true
  },
  comorbidities: {
    type: String,
    trim: true
  },
  sideEffects: {
    type: String,
    trim: true
  },
  treatmentPlan: {
    type: String,
    trim: true
  },
  testResults: {
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

// Add index for better query performance
ailmentsSchema.index({ problemName: 1 });
ailmentsSchema.index({ status: 1 });
ailmentsSchema.index({ createdAt: -1 });

const Ailments = mongoose.model('Ailments', ailmentsSchema);

export default Ailments;