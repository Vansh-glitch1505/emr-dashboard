import mongoose from 'mongoose';

const insuranceSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    required: true
  },
  primaryCompanyName: {
    type: String,
    required: false,
    trim: true
  },
  primaryPolicyNumber: {
    type: String,
    required: false,
    trim: true
  },
  primaryGroupNumber: {
    type: String,
    required: false,
    trim: true
  },
  primaryPlanType: {
    type: String,
    enum: ['Family Insurance', 'Individual', 'Employer'],
    default: 'Family Insurance'
  },
  primaryStartDate: {
    type: Date,
    required: false
  },
  primaryEndDate: {
    type: Date,
    required: false
  },
  secondaryCompanyName: {
    type: String,
    required: false,
    trim: true
  },
  secondaryPolicyNumber: {
    type: String,
    required: false,
    trim: true
  },
  secondaryGroupNumber: {
    type: String,
    required: false,
    trim: true
  },
  secondaryPlanType: {
    type: String,
    enum: ['Family', 'Individual', 'Employer'],
    default: 'Family'
  },
  secondaryStartDate: {
    type: Date,
    required: false
  },
  secondaryEndDate: {
    type: Date,
    required: false
  },
  contactNumber: {
    type: String,
    required: false,
    trim: true
  },
  insuranceCardImages: [{
    type: String // Store file paths
  }]
}, {
  timestamps: true
});

// Index for faster queries
insuranceSchema.index({ user_id: 1 });

const Insurance = mongoose.model('Insurance', insuranceSchema);

export default Insurance;