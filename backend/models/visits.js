import mongoose from "mongoose";

// Sub-schemas for Visit model
const BillingSchema = new mongoose.Schema({
  total_cost: { type: Number, required: true },
  amount_paid: { type: Number, required: true },
  balance_amount: { type: Number, required: true }
}, { _id: false });

const DiagnosisSchema = new mongoose.Schema({
  icd10_quickest: { type: String, required: true },
  full_icd10_list: { type: String, required: true }
}, { _id: false });

const FollowUpSchema = new mongoose.Schema({
  appointment_date: { type: String, required: true },
  send_follow_up: [{ type: String, required: true }]
}, { _id: false });

const VitalsSchema = new mongoose.Schema({
  temperature: { type: Number, default: null },
  blood_pressure: { type: String, default: null }, // Could be "120/80" format
  pulse: { type: Number, default: null },
  respiratory_rate: { type: Number, default: null },
  height: { type: Number, default: null },
  weight: { type: Number, default: null },
  oxygen_saturation: { type: Number, default: null }
}, { _id: false });

// Main Visit Schema
const VisitSchema = new mongoose.Schema({
  // Patient Reference
  patient_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Patient',
    required: true 
  },
  patient_name: { type: String, required: true },
  
  // Visit Information
  visit_type: { type: String, required: true },
  seen_by: { type: String, required: true },
  
  // Medical Information
  chief_complaints: { type: String, required: true },
  diagnosis: { type: DiagnosisSchema, required: true },
  treatment: { type: String, required: true },
  investigation_request: { type: String, required: true },
  investigation_result: { type: String, required: true },
  vitals: { type: VitalsSchema, required: true },
  notes: { type: String, default: '' },
  
  // Follow-up Information
  follow_up: { type: FollowUpSchema, required: true },
  
  // Billing Information
  billing: { type: BillingSchema, required: true }
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
  collection: 'visits' // Explicit collection name
});

// Indexes for better query performance
VisitSchema.index({ patient_id: 1 });
VisitSchema.index({ patient_name: 1 });
VisitSchema.index({ seen_by: 1 });
VisitSchema.index({ visit_type: 1 });
VisitSchema.index({ createdAt: -1 });
VisitSchema.index({ 'follow_up.appointment_date': 1 });

// Virtual for formatted billing summary
VisitSchema.virtual('billingStatus').get(function() {
  if (this.billing.balance_amount === 0) {
    return 'Fully Paid';
  } else if (this.billing.amount_paid > 0) {
    return 'Partially Paid';
  } else {
    return 'Unpaid';
  }
});

// Method to check if visit needs follow-up
VisitSchema.methods.needsFollowUp = function() {
  const appointmentDate = new Date(this.follow_up.appointment_date);
  const today = new Date();
  return appointmentDate >= today;
};

// Method to get outstanding balance
VisitSchema.methods.getOutstandingBalance = function() {
  return this.billing.balance_amount;
};

// Method to calculate payment percentage
VisitSchema.methods.getPaymentPercentage = function() {
  if (this.billing.total_cost === 0) return 100;
  return Math.round((this.billing.amount_paid / this.billing.total_cost) * 100);
};

// Static method to find visits by patient ID
VisitSchema.statics.findByPatientId = function(patientId) {
  return this.find({ patient_id: patientId }).sort({ createdAt: -1 });
};

// Static method to find visits by doctor
VisitSchema.statics.findByDoctor = function(doctorName) {
  return this.find({ seen_by: doctorName }).sort({ createdAt: -1 });
};

// Static method to find unpaid visits
VisitSchema.statics.findUnpaidVisits = function() {
  return this.find({ 'billing.balance_amount': { $gt: 0 } }).sort({ createdAt: -1 });
};

// Static method to find visits requiring follow-up
VisitSchema.statics.findVisitsNeedingFollowUp = function() {
  const today = new Date().toISOString().split('T')[0];
  return this.find({ 
    'follow_up.appointment_date': { $gte: today } 
  }).sort({ 'follow_up.appointment_date': 1 });
};

// Pre-save middleware
VisitSchema.pre('save', function(next) {
  // Ensure balance amount is calculated correctly
  this.billing.balance_amount = this.billing.total_cost - this.billing.amount_paid;
  next();
});

// Post-save middleware to update patient's last visit
VisitSchema.post('save', async function(doc) {
  try {
    // You can add logic here to update patient's last visit date if needed
    // const Patient = mongoose.model('Patient');
    // await Patient.findByIdAndUpdate(doc.patient_id, { last_visit: new Date() });
  } catch (error) {
    console.error('Error updating patient last visit:', error);
  }
});

export default mongoose.model("Visit", VisitSchema);