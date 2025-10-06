import express from "express";
import Patient from "../models/patients.js";

const router = express.Router();

// Helper function to convert YYYY-MM-DD to DD-MM-YYYY
const convertDateFormat = (dateStr) => {
  if (!dateStr) return dateStr;
  
  // Check if already in DD-MM-YYYY format
  if (/^\d{2}-\d{2}-\d{4}$/.test(dateStr)) {
    return dateStr;
  }
  
      // Convert from YYYY-MM-DD to DD-MM-YYYY
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const [year, month, day] = dateStr.split('-');
    return `${day}-${month}-${year}`;
  }
  
  return dateStr;
};

// POST - Create/Update patient vitals
router.post("/", async (req, res) => {
  try {
    const {
      patient_id,
      date,
      time,
      systolic,
      diastolic,
      pulse,
      respiratory,
      temperature,
      temp_unit,
      height,
      height_unit,
      weight,
      bmi,
      spo2,
      comments
    } = req.body;

    // Validate required fields
    if (!patient_id) {
      return res.status(400).json({
        success: false,
        message: "Patient ID is required"
      });
    }

    if (!date || !time) {
      return res.status(400).json({
        success: false,
        message: "Date and time are required"
      });
    }

    // Find the patient
    const patient = await Patient.findById(patient_id);
    
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found"
      });
    }

    // Prepare vitals data object - only include fields if they have values
    const vitalsData = {
      date: convertDateFormat(date),
      time: time
    };

    // Add blood pressure only if at least one value exists
    if (systolic || diastolic) {
      vitalsData.blood_pressure = {};
      if (systolic) vitalsData.blood_pressure.systolic = parseFloat(systolic) + 0.0;
      if (diastolic) vitalsData.blood_pressure.diastolic = parseFloat(diastolic) + 0.0;
    }

    // Add pulse rate if provided
    if (pulse) {
      vitalsData.pulse_rate = { value: parseFloat(pulse) + 0.0 };
    }

    // Add respiratory rate if provided
    if (respiratory) {
      vitalsData.respiratory_rate = { value: parseFloat(respiratory) + 0.0 };
    }

    // Add temperature if provided
    if (temperature) {
      vitalsData.temperature = {
        value: parseFloat(temperature) + 0.0,
        unit: temp_unit || "Celsius"
      };
    }

    // Add SpO2 if provided
    if (spo2) {
      vitalsData.spo2 = { value: parseFloat(spo2) + 0.0 };
    }

    // Add height if provided
    if (height) {
      vitalsData.height = {
        value: parseFloat(height) + 0.0,
        unit: height_unit || "feet"
      };
    }

    // Add weight if provided
    if (weight) {
      vitalsData.weight = { value: parseFloat(weight) + 0.0 };
    }

    // Add BMI if provided
    if (bmi) {
      vitalsData.bmi = { value: parseFloat(bmi) + 0.0 };
    }

    // Add comments if provided
    if (comments) {
      vitalsData.additional_comments = comments;
    }

    // Update patient's vitals
    patient.vitals = vitalsData;
    await patient.save();

    res.status(200).json({
      success: true,
      message: "Vitals saved successfully",
      data: patient.vitals
    });

  } catch (error) {
    console.error("Error saving vitals:", error);
    
    // Log validation error details if available
    if (error.name === 'ValidationError') {
      console.error("Validation errors:", JSON.stringify(error.errors, null, 2));
    }
    
    // Log MongoDB validation error details
    if (error.errInfo?.details) {
      console.error("MongoDB validation details:", JSON.stringify(error.errInfo.details, null, 2));
    }
    
    res.status(500).json({
      success: false,
      message: "Failed to save vitals",
      error: error.message,
      details: error.errInfo?.details || error.errors
    });
  }
});

// GET - Retrieve patient vitals by patient ID
router.get("/:patientId", async (req, res) => {
  try {
    const { patientId } = req.params;

    const patient = await Patient.findById(patientId).select('vitals');
    
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found"
      });
    }

    res.status(200).json({
      success: true,
      data: patient.vitals || null
    });

  } catch (error) {
    console.error("Error retrieving vitals:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve vitals",
      error: error.message
    });
  }
});

// PUT - Update patient vitals
router.put("/:patientId", async (req, res) => {
  try {
    const { patientId } = req.params;
    const {
      date,
      time,
      systolic,
      diastolic,
      pulse,
      respiratory,
      temperature,
      temp_unit,
      height,
      height_unit,
      weight,
      bmi,
      spo2,
      comments
    } = req.body;

    const patient = await Patient.findById(patientId);
    
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found"
      });
    }

    // Start with existing vitals or create new object
    const vitalsData = patient.vitals || {};
    
    // Update date and time if provided
    if (date) vitalsData.date = convertDateFormat(date);
    if (time) vitalsData.time = time;

    // Update blood pressure
    if (systolic !== undefined || diastolic !== undefined) {
      vitalsData.blood_pressure = vitalsData.blood_pressure || {};
      if (systolic !== undefined) vitalsData.blood_pressure.systolic = parseFloat(systolic);
      if (diastolic !== undefined) vitalsData.blood_pressure.diastolic = parseFloat(diastolic);
    }

    // Update other vitals if provided
    if (pulse !== undefined) {
      vitalsData.pulse_rate = { value: parseFloat(pulse) };
    }

    if (respiratory !== undefined) {
      vitalsData.respiratory_rate = { value: parseFloat(respiratory) };
    }

    if (temperature !== undefined) {
      vitalsData.temperature = {
        value: parseFloat(temperature),
        unit: temp_unit || vitalsData.temperature?.unit || "Celsius"
      };
    }

    if (spo2 !== undefined) {
      vitalsData.spo2 = { value: parseFloat(spo2) };
    }

    if (height !== undefined) {
      vitalsData.height = {
        value: parseFloat(height),
        unit: height_unit || vitalsData.height?.unit || "feet"
      };
    }

    if (weight !== undefined) {
      vitalsData.weight = { value: parseFloat(weight) };
    }

    if (bmi !== undefined) {
      vitalsData.bmi = { value: parseFloat(bmi) };
    }

    if (comments !== undefined) {
      vitalsData.additional_comments = comments;
    }

    patient.vitals = vitalsData;
    await patient.save();

    res.status(200).json({
      success: true,
      message: "Vitals updated successfully",
      data: patient.vitals
    });

  } catch (error) {
    console.error("Error updating vitals:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update vitals",
      error: error.message
    });
  }
});

// DELETE - Clear patient vitals
router.delete("/:patientId", async (req, res) => {
  try {
    const { patientId } = req.params;

    const patient = await Patient.findById(patientId);
    
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found"
      });
    }

    patient.vitals = undefined;
    await patient.save();

    res.status(200).json({
      success: true,
      message: "Vitals cleared successfully"
    });

  } catch (error) {
    console.error("Error clearing vitals:", error);
    res.status(500).json({
      success: false,
      message: "Failed to clear vitals",
      error: error.message
    });
  }
});

export default router;