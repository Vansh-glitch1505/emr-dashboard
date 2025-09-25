import mongoose from "mongoose";

// Sub-schemas for better organization
const NameSchema = new mongoose.Schema({
  first: { type: String, required: true },
  middle: { type: String, required: true },
  last: { type: String, required: true }
}, { _id: false });

const PhoneSchema = new mongoose.Schema({
  code: { type: String, required: true },
  number: { type: String, required: true }
}, { _id: false });

const AddressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, required: true },
  postal_code: { type: String, required: true },
  country: { type: String, required: true }
}, { _id: false });

const EmergencyContactSchema = new mongoose.Schema({
  name: { type: NameSchema, required: true },
  relationship: { type: String, required: true },
  phone: { type: PhoneSchema, required: true },
  email: { type: String, required: true }
}, { _id: false });

const ContactInfoSchema = new mongoose.Schema({
  mobile: { type: PhoneSchema, required: true },
  home_phone: { type: PhoneSchema, required: true },
  work_phone: { type: PhoneSchema, required: true },
  email: { type: String, required: true },
  preferred_contact_methods: [{ type: String, required: true }],
  emergency_contact: { type: EmergencyContactSchema, required: true }
}, { _id: false });

const InsuranceSchema = new mongoose.Schema({
  primary: {
    company_name: { type: String, required: true },
    policy_number: { type: String, required: true },
    group_number: { type: String, required: true },
    plan_type: { type: String, required: true },
    effective_start: { type: String, required: true },
    effective_end: { type: String, required: true }
  },
  insurance_contact_number: { type: String, required: true }
}, { _id: false });

const AllergySchema = new mongoose.Schema({
  allergen: { type: String, required: true },
  category: { type: String, required: true },
  reaction: { type: String, required: true },
  severity: { type: String, required: true },
  status: { type: String, required: true },
  code: { type: String, required: true },
  notes: { type: String, default: '' }
}, { _id: false });

const AilmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  icd_code: { type: String, required: true },
  description: { type: String, required: true },
  date_of_onset: { type: String, required: true },
  severity: { type: String, required: true },
  status: { type: String, required: true },
  treatment_plan: { type: String, required: true },
  medication_side_effects: { type: String, required: true },
  associated_factors: {
    risk_factor: { type: String, required: true },
    comorbidities: [{ type: String, required: true }]
  }
}, { _id: false });

const MedicationHistorySchema = new mongoose.Schema({
  medicine: { type: String, required: true },
  dosage: { type: String, required: true },
  dose_time: { type: String, required: true },
  problem: { type: String, required: true },
  time_period: { type: String, required: true },
  status: { type: String, required: true }
}, { _id: false });

const GeneticConditionSchema = new mongoose.Schema({
  condition_name: { type: String, required: true },
  genetic_testing_results: { type: String, required: true },
  affected_family_members: [{ type: String, required: true }]
}, { _id: false });

const FamilyMemberSchema = new mongoose.Schema({
  name: { type: NameSchema, required: true },
  relationship: { type: String, required: true },
  gender: { type: String, required: true },
  date_of_birth: { type: String, required: true },
  deceased: { type: Boolean, required: true },
  date_of_death: { type: String, default: null },
  reason_of_death: { type: String, default: null },
  medical_conditions: [{ type: String, required: true }],
  genetic_conditions: [{ type: GeneticConditionSchema, required: true }]
}, { _id: false });

const FamilyHistorySchema = new mongoose.Schema({
  family_members: [{ type: FamilyMemberSchema, required: true }],
  hereditary_risks: [{ type: String, required: true }]
}, { _id: false });

const VitalSignsSchema = new mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  temperature: {
    value: { type: Number, required: true },
    unit: { type: String, required: true }
  },
  blood_pressure: {
    systolic: { type: Number, required: true },
    diastolic: { type: Number, required: true }
  },
  pulse_rate: {
    value: { type: Number, required: true }
  },
  respiratory_rate: {
    value: { type: Number, required: true }
  },
  height: {
    value: { type: Number, required: true },
    unit: { type: String, required: true }
  },
  weight: {
    value: { type: Number, required: true }
  },
  bmi: {
    value: { type: Number, required: true }
  },
  spo2: {
    value: { type: Number, required: true }
  },
  pain_level: {
    value: { type: Number, required: true }
  },
  additional_comments: { type: String, default: '' }
}, { _id: false });

// Medical History Sub-schemas
const MedicalAllergySchema = new mongoose.Schema({
  allergic_substance: { type: String, required: true },
  allergy_type: { type: String, required: true },
  severity: { type: String, required: true }
}, { _id: false });

const MedicalConditionSchema = new mongoose.Schema({
  condition: { type: String, required: true },
  diagnosis_date: { type: String, required: true },
  current_status: { type: String, required: true },
  treating_physician: { type: String, required: true }
}, { _id: false });

const SurgerySchema = new mongoose.Schema({
  surgery_type: { type: String, required: true },
  date: { type: String, required: true },
  surgeon_name: { type: String, required: true },
  post_operative_notes: { type: String, required: true }
}, { _id: false });

const ImmunizationSchema = new mongoose.Schema({
  vaccine_name: { type: String, required: true },
  date_administered: { type: String, required: true },
  adverse_reaction: { type: String, required: true }
}, { _id: false });

const FileReferenceSchema = new mongoose.Schema({
  file_id: { type: String, default: null }
}, { _id: false });

const MedicalHistorySchema = new mongoose.Schema({
  conditions: [{ type: MedicalConditionSchema, required: true }],
  allergies: [{ type: MedicalAllergySchema, required: true }],
  surgeries: [{ type: SurgerySchema, required: true }],
  immunizations: [{ type: ImmunizationSchema, required: true }],
  lab_reports: [{ type: FileReferenceSchema, required: true }],
  diagnostic_reports: [{ type: FileReferenceSchema, required: true }]
}, { _id: false });

const AssessmentSchema = new mongoose.Schema({
  chief_complaints: { type: String, required: true },
  history_of_present_illness: { type: String, required: true },
  past_medical_history: { type: String, required: true },
  medication_history: { type: String, required: true },
  test_results: { type: String, required: true },
  plan_of_care: { type: String, required: true },
  reminders_alerts: { type: String, required: true }
}, { _id: false });

// Social History Sub-schemas
const TobaccoUseSchema = new mongoose.Schema({
  current_status: { type: String, required: true },
  average_daily_consumption: { type: String, required: true },
  duration_of_use: { type: String, required: true },
  duration_unit: { type: String, required: true },
  quit_date: { type: String, required: true },
  notes: { type: String, default: '' }
}, { _id: false });

const AlcoholUseSchema = new mongoose.Schema({
  current_status: { type: String, required: true },
  type_of_alcohol: { type: String, required: true },
  average_weekly_consumption: { type: String, required: true },
  period_of_use: { type: String, required: true },
  notes: { type: String, default: '' }
}, { _id: false });

const PhysicalActivitySchema = new mongoose.Schema({
  type_of_exercise: { type: String, required: true },
  frequency: { type: String, required: true },
  duration: { type: String, required: true },
  duration_unit: { type: String, required: true },
  consistency: { type: String, required: true },
  notes: { type: String, default: '' }
}, { _id: false });

const NutrientsHistorySchema = new mongoose.Schema({
  dietary_preferences: { type: String, default: '' },
  supplement_usage: { type: String, required: true },
  notes: { type: String, default: '' }
}, { _id: false });

const FinancialResourcesSchema = new mongoose.Schema({
  employment_status: { type: String, required: true },
  income_level: { type: String, required: true },
  financial_support: { type: String, required: true },
  notes: { type: String, default: '' }
}, { _id: false });

const EducationSchema = new mongoose.Schema({
  highest_level_of_education: { type: String, required: true }
}, { _id: false });

const SocialIsolationConnectionSchema = new mongoose.Schema({
  isolation_status: { type: String, required: true },
  social_support: { type: String, required: true },
  frequency_of_social_interactions: { type: String, required: true },
  notes: { type: String, default: '' }
}, { _id: false });

const StressSchema = new mongoose.Schema({
  perceived_stress_level: { type: String, required: true },
  major_stressors: { type: String, required: true },
  coping_mechanisms: { type: String, required: true },
  notes: { type: String, default: '' }
}, { _id: false });

const ExposureToViolenceSchema = new mongoose.Schema({
  type_of_violence: { type: String, default: '' },
  date_of_last_exposure: { type: String, default: '' },
  support_or_intervention_received: { type: String, default: '' },
  notes: { type: String, default: '' }
}, { _id: false });

const GenderIdentitySchema = new mongoose.Schema({
  gender_identity: { type: String, required: true },
  notes: { type: String, default: '' }
}, { _id: false });

const SexualOrientationSchema = new mongoose.Schema({
  sexual_orientation: { type: String, required: true },
  notes: { type: String, default: '' }
}, { _id: false });

const SocialHistoryFreeTextSchema = new mongoose.Schema({
  notes: { type: String, default: '' }
}, { _id: false });

const SocialHistorySchema = new mongoose.Schema({
  tobacco_use: { type: TobaccoUseSchema, required: true },
  alcohol_use: { type: AlcoholUseSchema, required: true },
  physical_activity: { type: PhysicalActivitySchema, required: true },
  nutrients_history: { type: NutrientsHistorySchema, required: true },
  financial_resources: { type: FinancialResourcesSchema, required: true },
  education: { type: EducationSchema, required: true },
  social_isolation_connection: { type: SocialIsolationConnectionSchema, required: true },
  stress: { type: StressSchema, required: true },
  exposure_to_violence: { type: ExposureToViolenceSchema, required: true },
  gender_identity: { type: GenderIdentitySchema, required: true },
  sexual_orientation: { type: SexualOrientationSchema, required: true },
  social_history_free_text: { type: SocialHistoryFreeTextSchema, required: true }
}, { _id: false });

// Main Patient Schema
const PatientSchema = new mongoose.Schema({
  // Basic Information
  name: { type: NameSchema, required: true },
  date_of_birth: { type: String, required: true },
  gender: { type: String, required: true },
  blood_group: { type: String, required: true },
  occupation: { type: String, required: true },
  
  // Identification
  aadhaar: { type: String, required: true, unique: true },
  pan: { type: String, required: true, unique: true },
  
  // Contact & Address Information
  address: { type: AddressSchema, required: true },
  contact_info: { type: ContactInfoSchema, required: true },
  
  // Insurance
  insurance: { type: InsuranceSchema, required: true },
  
  // Medical Information
  ailments: [{ type: AilmentSchema, required: true }],
  allergies: [{ type: AllergySchema, required: true }],
  medication_history: [{ type: MedicationHistorySchema, required: true }],
  medical_history: { type: MedicalHistorySchema, required: true },
  vitals: [{ type: VitalSignsSchema, required: true }],
  assessments: [{ type: AssessmentSchema, required: true }],
  
  // Family & Social History
  family_history: { type: FamilyHistorySchema, required: true },
  social_history: { type: SocialHistorySchema, required: true }
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
  collection: 'patients' // Explicit collection name
});

// Indexes for better query performance
PatientSchema.index({ aadhaar: 1 });
PatientSchema.index({ pan: 1 });
PatientSchema.index({ 'name.first': 1, 'name.last': 1 });
PatientSchema.index({ 'contact_info.email': 1 });
PatientSchema.index({ 'contact_info.mobile.number': 1 });

// Virtual for full name
PatientSchema.virtual('fullName').get(function() {
  return `${this.name.first} ${this.name.middle} ${this.name.last}`;
});

// Method to get current age
PatientSchema.methods.getAge = function() {
  const birthDate = new Date(this.date_of_birth);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

// Static method to find by Aadhaar
PatientSchema.statics.findByAadhaar = function(aadhaar) {
  return this.findOne({ aadhaar: aadhaar });
};

// Static method to find by PAN
PatientSchema.statics.findByPAN = function(pan) {
  return this.findOne({ pan: pan });
};

// Pre-save middleware for validation
PatientSchema.pre('save', function(next) {
  // Add any custom validation logic here
  next();
});

export default mongoose.model('Patient', PatientSchema);