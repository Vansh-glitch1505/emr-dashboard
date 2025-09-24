// models/PatientDemographicsSimple.js - Create this as a test
import mongoose from "mongoose";

const patientDemographicsSimpleSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        default: 1
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    middleName: {
        type: String,
        trim: true,
        default: ''
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    dob: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other']
    },
    address1: {
        type: String,
        trim: true,
        default: ''
    },
    address2: {
        type: String,
        trim: true,
        default: ''
    },
    city: {
        type: String,
        trim: true,
        default: ''
    },
    postalCode: {
        type: String,
        trim: true,
        default: ''
    },
    district: {
        type: String,
        trim: true,
        default: ''
    },
    state: {
        type: String,
        trim: true,
        default: ''
    },
    country: {
        type: String,
        trim: true,
        default: 'India'
    },
    bloodGroup: {
        type: String,
        trim: true,
        default: ''
    },
    occupation: {
        type: String,
        trim: true,
        default: ''
    },
    aadharNumber: {
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
    panNumber: {
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
    photo: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});

export default mongoose.model('PatientDemographicsSimple', patientDemographicsSimpleSchema);