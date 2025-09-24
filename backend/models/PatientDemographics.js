// models/PatientDemographics.js
import mongoose from "mongoose";

// Sub-schemas for nested objects
const nameSchema = new mongoose.Schema({
    first: { type: String, required: true, trim: true },
    middle: { type: String, trim: true, default: '' },
    last: { type: String, required: true, trim: true }
}, { _id: false });

const addressSchema = new mongoose.Schema({
    street: { type: String, trim: true, default: '' },
    city: { type: String, trim: true, default: '' },
    district: { type: String, trim: true, default: '' },
    state: { type: String, trim: true, default: '' },
    country: { type: String, trim: true, default: 'India' },
    postal_code: { type: String, trim: true, default: '' }
}, { _id: false });

const phoneSchema = new mongoose.Schema({
    code: { type: String, trim: true, default: '+91' },
    number: { type: String, trim: true, default: '' }
}, { _id: false });

const emergencyContactSchema = new mongoose.Schema({
    name: nameSchema,
    relationship: { type: String, trim: true, default: '' },
    phone: phoneSchema,
    email: { type: String, trim: true, default: '' }
}, { _id: false });

const contactInfoSchema = new mongoose.Schema({
    mobile: phoneSchema,
    home_phone: phoneSchema,
    work_phone: phoneSchema,
    email: { type: String, trim: true, default: '' },
    preferred_contact_methods: [{ type: String, trim: true }],
    emergency_contact: emergencyContactSchema
}, { _id: false });

const insuranceSchema = new mongoose.Schema({
    primary: {
        company_name: { type: String, trim: true, default: '' },
        policy_number: { type: String, trim: true, default: '' },
        group_number: { type: String, trim: true, default: '' },
        plan_type: { type: String, trim: true, default: '' },
        effective_start: { type: String, default: '' },
        effective_end: { type: String, default: '' }
    },
    insurance_contact_number: { type: String, trim: true, default: '' }
}, { _id: false });

const allergySchema = new mongoose.Schema({
    allergen: { type: String, trim: true, default: '' },
    category: { type: String, trim: true, default: '' },
    reaction: { type: String, trim: true, default: '' },
    severity: { type: String, trim: true, default: '' },
    status: { type: String, trim: true, default: '' },
    code: { type: String, trim: true, default: '' },
    notes: { type: String, trim: true, default: '' }
}, { _id: false });

const medicationHistorySchema = new mongoose.Schema({
    medicine: { type: String, trim: true, default: '' },
    dosage: { type: String, trim: true, default: '' },
    dose_time: { type: String, trim: true, default: '' },
    time_period: { type: String, trim: true, default: '' },
    problem: { type: String, trim: true, default: '' },
    status: { type: String, trim: true, default: '' }
}, { _id: false });

const medicalConditionSchema = new mongoose.Schema({
    condition: { type: String, trim: true, default: '' },
    diagnosis_date: { type: String, default: '' },
    current_status: { type: String, trim: true, default: '' },
    treating_physician: { type: String, trim: true, default: '' }
}, { _id: false });

const surgerySchema = new mongoose.Schema({
    surgery_type: { type: String, trim: true, default: '' },
    date: { type: String, default: '' },
    surgeon_name: { type: String, trim: true, default: '' },
    post_operative_notes: { type: String, trim: true, default: '' }
}, { _id: false });

const immunizationSchema = new mongoose.Schema({
    vaccine_name: { type: String, trim: true, default: '' },
    date_administered: { type: String, default: '' },
    adverse_reaction: { type: String, trim: true, default: '' }
}, { _id: false });

const medicalHistorySchema = new mongoose.Schema({
    conditions: [medicalConditionSchema],
    allergies: [{
        allergic_substance: { type: String, trim: true, default: '' },
        allergy_type: { type: String, trim: true, default: '' },
        severity: { type: String, trim: true, default: '' }
    }],
    surgeries: [surgerySchema],
    immunizations: [immunizationSchema],
    lab_reports: [{ file_id: { type: String, default: null } }],
    diagnostic_reports: [{ file_id: { type: String, default: null } }]
}, { _id: false });

const vitalSchema = new mongoose.Schema({
    date: { type: String, default: '' },
    time: { type: String, default: '' },
    height: {
        value: { type: Number, default: 0 },
        unit: { type: String, default: 'cm' }
    },
    weight: {
        value: { type: Number, default: 0 }
    },
    bmi: {
        value: { type: Number, default: 0 }
    },
    blood_pressure: {
        systolic: { type: Number, default: 0 },
        diastolic: { type: Number, default: 0 }
    },
    pulse_rate: {
        value: { type: Number, default: 0 }
    },
    temperature: {
        value: { type: Number, default: 0 },
        unit: { type: String, default: 'C' }
    },
    respiratory_rate: {
        value: { type: Number, default: 0 }
    },
    spo2: {
        value: { type: Number, default: 0 }
    },
    pain_level: {
        value: { type: Number, default: 0 }
    },
    additional_comments: { type: String, trim: true, default: '' }
}, { _id: false });

const socialHistorySchema = new mongoose.Schema({
    tobacco_use: {
        current_status: { type: String, trim: true, default: '' },
        average_daily_consumption: { type: String, trim: true, default: '' },
        duration_of_use: { type: String, trim: true, default: '' },
        duration_unit: { type: String, trim: true, default: '' },
        quit_date: { type: String, default: '' },
        notes: { type: String, trim: true, default: '' }
    },
    alcohol_use: {
        current_status: { type: String, trim: true, default: '' },
        type_of_alcohol: { type: String, trim: true, default: '' },
        average_weekly_consumption: { type: String, trim: true, default: '' },
        period_of_use: { type: String, trim: true, default: '' },
        notes: { type: String, trim: true, default: '' }
    },
    physical_activity: {
        type_of_exercise: { type: String, trim: true, default: '' },
        frequency: { type: String, trim: true, default: '' },
        duration: { type: String, trim: true, default: '' },
        duration_unit: { type: String, trim: true, default: '' },
        consistency: { type: String, trim: true, default: '' },
        notes: { type: String, trim: true, default: '' }
    },
    nutrients_history: {
        dietary_preferences: { type: String, trim: true, default: '' },
        supplement_usage: { type: String, trim: true, default: '' },
        notes: { type: String, trim: true, default: '' }
    },
    education: {
        highest_level_of_education: { type: String, trim: true, default: '' }
    },
    financial_resources: {
        employment_status: { type: String, trim: true, default: '' },
        income_level: { type: String, trim: true, default: '' },
        financial_support: { type: String, trim: true, default: '' },
        notes: { type: String, trim: true, default: '' }
    },
    social_isolation_connection: {
        isolation_status: { type: String, trim: true, default: '' },
        social_support: { type: String, trim: true, default: '' },
        frequency_of_social_interactions: { type: String, trim: true, default: '' },
        notes: { type: String, trim: true, default: '' }
    },
    stress: {
        perceived_stress_level: { type: String, trim: true, default: '' },
        major_stressors: { type: String, trim: true, default: '' },
        coping_mechanisms: { type: String, trim: true, default: '' },
        notes: { type: String, trim: true, default: '' }
    },
    gender_identity: {
        gender_identity: { type: String, trim: true, default: '' },
        notes: { type: String, trim: true, default: '' }
    },
    sexual_orientation: {
        sexual_orientation: { type: String, trim: true, default: '' },
        notes: { type: String, trim: true, default: '' }
    },
    exposure_to_violence: {
        type_of_violence: { type: String, trim: true, default: '' },
        date_of_last_exposure: { type: String, default: '' },
        support_or_intervention_received: { type: String, trim: true, default: '' },
        notes: { type: String, trim: true, default: '' }
    },
    social_history_free_text: {
        notes: { type: String, trim: true, default: '' }
    }
}, { _id: false });

const familyMemberSchema = new mongoose.Schema({
    name: nameSchema,
    relationship: { type: String, trim: true, default: '' },
    gender: { type: String, trim: true, default: '' },
    date_of_birth: { type: String, default: '' },
    deceased: { type: Boolean, default: false },
    date_of_death: { type: String, default: null },
    reason_of_death: { type: String, default: null },
    medical_conditions: [{ type: String, trim: true }],
    genetic_conditions: [{
        condition_name: { type: String, trim: true, default: '' },
        genetic_testing_results: { type: String, trim: true, default: '' },
        affected_family_members: [{ type: String, trim: true }]
    }]
}, { _id: false });

const familyHistorySchema = new mongoose.Schema({
    family_members: [familyMemberSchema],
    hereditary_risks: [{ type: String, trim: true }]
}, { _id: false });

const ailmentSchema = new mongoose.Schema({
    name: { type: String, trim: true, default: '' },
    description: { type: String, trim: true, default: '' },
    icd_code: { type: String, trim: true, default: '' },
    date_of_onset: { type: String, default: '' },
    severity: { type: String, trim: true, default: '' },
    status: { type: String, trim: true, default: '' },
    treatment_plan: { type: String, trim: true, default: '' },
    medication_side_effects: { type: String, trim: true, default: '' },
    associated_factors: {
        risk_factor: { type: String, trim: true, default: '' },
        comorbidities: [{ type: String, trim: true }]
    }
}, { _id: false });

const assessmentSchema = new mongoose.Schema({
    chief_complaints: { type: String, trim: true, default: '' },
    history_of_present_illness: { type: String, trim: true, default: '' },
    past_medical_history: { type: String, trim: true, default: '' },
    medication_history: { type: String, trim: true, default: '' },
    test_results: { type: String, trim: true, default: '' },
    plan_of_care: { type: String, trim: true, default: '' },
    reminders_alerts: { type: String, trim: true, default: '' }
}, { _id: false });

// Main PatientDemographics Schema
const patientDemographicsSchema = new mongoose.Schema({
    // Basic Information
    name: {
        type: nameSchema,
        required: true
    },
    date_of_birth: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other']
    },
    blood_group: {
        type: String,
        trim: true,
        default: ''
    },
    occupation: {
        type: String,
        trim: true,
        default: ''
    },
    
    // Identification
    aadhaar: {
        type: String,
        trim: true,
        validate: {
            validator: function(v) {
                return !v || v === '' || /^\d{12}$/.test(v);
            },
            message: 'Aadhaar number must be exactly 12 digits'
        },
        default: ''
    },
    pan: {
        type: String,
        trim: true,
        uppercase: true,
        validate: {
            validator: function(v) {
                return !v || v === '' || /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(v.toUpperCase());
            },
            message: 'PAN number format is invalid (format: ABCDE1234F)'
        },
        default: ''
    },
    
    // Contact Information
    address: {
        type: addressSchema,
        default: () => ({})
    },
    contact_info: {
        type: contactInfoSchema,
        default: () => ({})
    },
    
    // Medical Information
    medical_history: {
        type: medicalHistorySchema,
        default: () => ({})
    },
    medication_history: {
        type: [medicationHistorySchema],
        default: []
    },
    allergies: {
        type: [allergySchema],
        default: []
    },
    vitals: {
        type: [vitalSchema],
        default: []
    },
    
    // Social and Family History
    social_history: {
        type: socialHistorySchema,
        default: () => ({})
    },
    family_history: {
        type: familyHistorySchema,
        default: () => ({})
    },
    
    // Clinical Information
    ailments: {
        type: [ailmentSchema],
        default: []
    },
    assessments: {
        type: [assessmentSchema],
        default: []
    },
    
    // Insurance
    insurance: {
        type: insuranceSchema,
        default: () => ({})
    },
    
    // File attachments
    photo: {
        type: String,
        default: null
    },
    
    // Legacy fields for backward compatibility with your current form
    user_id: {
        type: Number,
        default: 1
    },
    // These are mapped to the nested structure above
    firstName: {
        type: String,
        set: function(value) {
            if (!this.name) this.name = {};
            this.name.first = value;
            return value;
        },
        get: function() {
            return this.name?.first || '';
        }
    },
    middleName: {
        type: String,
        set: function(value) {
            if (!this.name) this.name = {};
            this.name.middle = value || '';
            return value;
        },
        get: function() {
            return this.name?.middle || '';
        }
    },
    lastName: {
        type: String,
        set: function(value) {
            if (!this.name) this.name = {};
            this.name.last = value;
            return value;
        },
        get: function() {
            return this.name?.last || '';
        }
    },
    dob: {
        type: String,
        set: function(value) {
            this.date_of_birth = value;
            return value;
        },
        get: function() {
            return this.date_of_birth;
        }
    },
    bloodGroup: {
        type: String,
        set: function(value) {
            this.blood_group = value;
            return value;
        },
        get: function() {
            return this.blood_group;
        }
    },
    aadharNumber: {
        type: String,
        set: function(value) {
            this.aadhaar = value;
            return value;
        },
        get: function() {
            return this.aadhaar;
        }
    },
    panNumber: {
        type: String,
        set: function(value) {
            this.pan = value;
            return value;
        },
        get: function() {
            return this.pan;
        }
    },
    // Address fields mapping
    address1: {
        type: String,
        set: function(value) {
            if (!this.address) this.address = {};
            this.address.street = value;
            return value;
        },
        get: function() {
            return this.address?.street || '';
        }
    },
    address2: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        set: function(value) {
            if (!this.address) this.address = {};
            this.address.city = value;
            return value;
        },
        get: function() {
            return this.address?.city || '';
        }
    },
    postalCode: {
        type: String,
        set: function(value) {
            if (!this.address) this.address = {};
            this.address.postal_code = value;
            return value;
        },
        get: function() {
            return this.address?.postal_code || '';
        }
    },
    district: {
        type: String,
        set: function(value) {
            if (!this.address) this.address = {};
            this.address.district = value;
            return value;
        },
        get: function() {
            return this.address?.district || '';
        }
    },
    state: {
        type: String,
        set: function(value) {
            if (!this.address) this.address = {};
            this.address.state = value;
            return value;
        },
        get: function() {
            return this.address?.state || '';
        }
    },
    country: {
        type: String,
        set: function(value) {
            if (!this.address) this.address = {};
            this.address.country = value;
            return value;
        },
        get: function() {
            return this.address?.country || 'India';
        }
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true }
});

// Pre-save middleware to ensure nested objects are created and synced
patientDemographicsSchema.pre('save', function(next) {
    // Ensure name object exists and is synced
    if (this.firstName || this.middleName || this.lastName) {
        if (!this.name) this.name = {};
        if (this.firstName) this.name.first = this.firstName;
        if (this.middleName !== undefined) this.name.middle = this.middleName || '';
        if (this.lastName) this.name.last = this.lastName;
    }
    
    // Ensure address object exists and is synced
    if (this.address1 || this.city || this.postalCode || this.district || this.state || this.country) {
        if (!this.address) this.address = {};
        if (this.address1) this.address.street = this.address1;
        if (this.city) this.address.city = this.city;
        if (this.postalCode) this.address.postal_code = this.postalCode;
        if (this.district) this.address.district = this.district;
        if (this.state) this.address.state = this.state;
        if (this.country) this.address.country = this.country;
    }
    
    // Sync other fields
    if (this.dob) this.date_of_birth = this.dob;
    if (this.bloodGroup) this.blood_group = this.bloodGroup;
    if (this.aadharNumber) this.aadhaar = this.aadharNumber;
    if (this.panNumber) this.pan = this.panNumber;
    
    next();
});

export default mongoose.model('PatientDemographics', patientDemographicsSchema);