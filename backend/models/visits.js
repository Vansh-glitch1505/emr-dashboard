import mongoose from "mongoose";

const visitSchema = new mongoose.Schema({
  visit_type: {
    type: String,
    required: true,
    enum: [
      'Regular Checkup',
      'Emergency Visit',
      'Follow-up',
      'Consultation',
      'Physical Exam',
      'Vaccination',
      'Lab Results Review',
      'Urgent Care',
      'Specialist Referral',
      'Other'
    ]
  },
  patient_name: {
    type: String,
    required: true
  },
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    default: null
  },
  chief_complaints: {
    type: String,
    required: true
  },
  vitals: {
    height: {
      type: Number,
      default: null
    },
    weight: {
      type: Number,
      default: null
    },
    blood_pressure: {
      type: String,
      default: null
    },
    pulse: {
      type: Number,
      default: null
    },
    respiratory_rate: {
      type: Number,
      default: null
    },
    oxygen_saturation: {
      type: Number,
      default: null
    },
    temperature: {
      type: Number,
      default: null
    }
  },
  investigation_request: {
    type: String,
    default: null
  },
  investigation_result: {
    type: String,
    default: null
  },
  diagnosis: {
    icd10_quickest: {
      type: String,
      default: null
    },
    full_icd10_list: {
      type: String,
      default: null
    }
  },
  treatment: {
    type: String,
    default: null
  },
  seen_by: {
    type: String,
    default: null
  },
  appointment_date: {
    type: String,
    default: null,
    validate: {
      validator: function(v) {
        if (!v) return true;
        return /^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-\d{4}$/.test(v);
      },
      message: props => `${props.value} is not a valid date format! Use MM-DD-YYYY`
    }
  },
  billing: {
    total_cost: {
      type: mongoose.Schema.Types.Mixed,
      default: null
    },
    amount_paid: {
      type: mongoose.Schema.Types.Mixed,
      default: null
    },
    balance_amount: {
      type: mongoose.Schema.Types.Mixed,
      default: null
    }
  },
  notes: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

const Visit = mongoose.model('Visit', visitSchema);

export default Visit;