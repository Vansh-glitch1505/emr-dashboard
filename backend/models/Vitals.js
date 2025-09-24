import mongoose from 'mongoose';

const vitalsSchema = new mongoose.Schema({
  patient_id: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true,
    trim: true
  },
  systolic: {
    type: Number,
    min: 50,
    max: 250
  },
  diastolic: {
    type: Number,
    min: 30,
    max: 150
  },
  pulse: {
    type: Number,
    min: 30,
    max: 200
  },
  respiratory: {
    type: Number,
    min: 8,
    max: 60
  },
  temperature: {
    type: Number,
    min: 30,
    max: 45
  },
  temp_unit: {
    type: String,
    enum: ['Celsius', 'Fahrenheit'],
    default: 'Celsius'
  },
  height: {
    type: Number,
    min: 0
  },
  height_unit: {
    type: String,
    enum: ['feet', 'inches', 'cm'],
    default: 'feet'
  },
  weight: {
    type: Number,
    min: 0
  },
  bmi: {
    type: Number,
    min: 10,
    max: 60
  },
  spo2: {
    type: Number,
    min: 70,
    max: 100
  },
  comments: {
    type: String,
    trim: true
  }
}, {
  timestamps: true // This will add createdAt and updatedAt fields
});

// Add indexes for better query performance
vitalsSchema.index({ patient_id: 1, date: -1 });
vitalsSchema.index({ createdAt: -1 });
vitalsSchema.index({ date: -1 });

// Add a compound index for patient vitals by date
vitalsSchema.index({ patient_id: 1, date: -1, createdAt: -1 });

const Vitals = mongoose.model('Vitals', vitalsSchema);

export default Vitals;