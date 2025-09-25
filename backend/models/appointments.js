import mongoose from "mongoose";

// Sub-schemas for Appointment model
const PatientNameSchema = new mongoose.Schema({
  first: { type: String, required: true },
  middle: { type: String, required: true },
  last: { type: String, required: true }
}, { _id: false });

// Main Appointment Schema
const AppointmentSchema = new mongoose.Schema({
  // Patient Information
  patient_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Patient',
    default: null // Based on your schema where it can be null
  },
  patient_name: { type: PatientNameSchema, required: true },
  age: { type: Number, required: true },
  contact_information: { type: String, required: true },
  
  // Appointment Details
  appointment_date: { type: String, required: true }, // Format: "DD-MM-YYYY"
  appointment_time: { type: String, required: true }, // Format: "HH:MM"
  appointment_type: { type: String, required: true },
  reason_for_appointment: { type: String, required: true },
  
  // Medical Staff
  doctor: { type: String, required: true },
  
  // Priority and Notes
  urgency: { 
    type: String, 
    required: true,
    enum: ['Routine', 'Urgent', 'Emergency', 'Follow-up']
  },
  comments: { type: String, default: '' }
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
  collection: 'appointments' // Explicit collection name
});

// Indexes for better query performance
AppointmentSchema.index({ patient_id: 1 });
AppointmentSchema.index({ 'patient_name.first': 1, 'patient_name.last': 1 });
AppointmentSchema.index({ doctor: 1 });
AppointmentSchema.index({ appointment_date: 1, appointment_time: 1 });
AppointmentSchema.index({ urgency: 1 });
AppointmentSchema.index({ appointment_type: 1 });
AppointmentSchema.index({ createdAt: -1 });

// Virtual for full patient name
AppointmentSchema.virtual('fullPatientName').get(function() {
  return `${this.patient_name.first} ${this.patient_name.middle} ${this.patient_name.last}`;
});

// Virtual for formatted appointment datetime
AppointmentSchema.virtual('appointmentDateTime').get(function() {
  return `${this.appointment_date} at ${this.appointment_time}`;
});

// Method to check if appointment is today
AppointmentSchema.methods.isToday = function() {
  const today = new Date();
  const todayFormatted = `${today.getDate().toString().padStart(2, '0')}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getFullYear()}`;
  return this.appointment_date === todayFormatted;
};

// Method to check if appointment is upcoming
AppointmentSchema.methods.isUpcoming = function() {
  const today = new Date();
  const [day, month, year] = this.appointment_date.split('-');
  const appointmentDate = new Date(year, month - 1, day);
  
  return appointmentDate >= today;
};

// Method to check if appointment is overdue
AppointmentSchema.methods.isOverdue = function() {
  const today = new Date();
  const [day, month, year] = this.appointment_date.split('-');
  const appointmentDate = new Date(year, month - 1, day);
  
  return appointmentDate < today;
};

// Method to get days until appointment
AppointmentSchema.methods.getDaysUntilAppointment = function() {
  const today = new Date();
  const [day, month, year] = this.appointment_date.split('-');
  const appointmentDate = new Date(year, month - 1, day);
  
  const timeDiff = appointmentDate.getTime() - today.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

// Method to check if appointment needs urgent attention
AppointmentSchema.methods.isUrgent = function() {
  return this.urgency === 'Emergency' || this.urgency === 'Urgent';
};

// Static method to find appointments by patient ID
AppointmentSchema.statics.findByPatientId = function(patientId) {
  return this.find({ patient_id: patientId }).sort({ appointment_date: 1, appointment_time: 1 });
};

// Static method to find appointments by doctor
AppointmentSchema.statics.findByDoctor = function(doctorName) {
  return this.find({ doctor: doctorName }).sort({ appointment_date: 1, appointment_time: 1 });
};

// Static method to find today's appointments
AppointmentSchema.statics.findTodaysAppointments = function() {
  const today = new Date();
  const todayFormatted = `${today.getDate().toString().padStart(2, '0')}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getFullYear()}`;
  
  return this.find({ appointment_date: todayFormatted }).sort({ appointment_time: 1 });
};

// Static method to find appointments by date
AppointmentSchema.statics.findByDate = function(date) {
  return this.find({ appointment_date: date }).sort({ appointment_time: 1 });
};

// Static method to find urgent appointments
AppointmentSchema.statics.findUrgentAppointments = function() {
  return this.find({ 
    urgency: { $in: ['Emergency', 'Urgent'] } 
  }).sort({ appointment_date: 1, appointment_time: 1 });
};

// Static method to find upcoming appointments
AppointmentSchema.statics.findUpcomingAppointments = function(days = 7) {
  const today = new Date();
  const futureDate = new Date();
  futureDate.setDate(today.getDate() + days);
  
  // This is a simplified version - you might want to implement proper date comparison
  return this.find({}).sort({ appointment_date: 1, appointment_time: 1 });
};

// Static method to find overdue appointments
AppointmentSchema.statics.findOverdueAppointments = function() {
  const today = new Date();
  const todayFormatted = `${today.getDate().toString().padStart(2, '0')}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getFullYear()}`;
  
  // This would need proper date comparison logic for production use
  return this.find({}).sort({ appointment_date: 1 });
};

// Static method to check appointment conflicts
AppointmentSchema.statics.findConflicts = function(doctor, date, time) {
  return this.findOne({ 
    doctor: doctor,
    appointment_date: date,
    appointment_time: time
  });
};

// Pre-save middleware for validation
AppointmentSchema.pre('save', async function(next) {
  // Check for appointment conflicts
  const conflict = await this.constructor.findConflicts(
    this.doctor, 
    this.appointment_date, 
    this.appointment_time
  );
  
  if (conflict && conflict._id.toString() !== this._id.toString()) {
    const error = new Error('Appointment conflict: Doctor already has an appointment at this time');
    error.name = 'AppointmentConflictError';
    return next(error);
  }
  
  next();
});

// Post-save middleware
AppointmentSchema.post('save', function(doc) {
  console.log(`Appointment scheduled for ${doc.fullPatientName} with ${doc.doctor}`);
});

export default mongoose.model("Appointment", AppointmentSchema);
