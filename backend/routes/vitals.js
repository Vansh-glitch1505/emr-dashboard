import express from "express";
import Patient from "../models/patients.js";

const router = express.Router();

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

    // Prepare vitals data object
    const vitalsData = {
      date: date,
      time: time,
      blood_pressure: {
        systolic: systolic ? Number(systolic) : undefined,
        diastolic: diastolic ? Number(diastolic) : undefined
      },
      pulse_rate: {
        value: pulse ? Number(pulse) : undefined
      },
      respiratory_rate: {
        value: respiratory ? Number(respiratory) : undefined
      },
      temperature: {
        value: temperature ? Number(temperature) : undefined,
        unit: temp_unit || "Celsius"
      },
      spo2: {
        value: spo2 ? Number(spo2) : undefined
      },
      height: {
        value: height ? Number(height) : undefined,
        unit: height_unit || "feet"
      },
      weight: {
        value: weight ? Number(weight) : undefined
      },
      bmi: {
        value: bmi ? Number(bmi) : undefined
      },
      additional_comments: comments || ""
    };

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
    res.status(500).json({
      success: false,
      message: "Failed to save vitals",
      error: error.message
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

    // Update vitals data
    const vitalsData = {
      date: date || patient.vitals?.date,
      time: time || patient.vitals?.time,
      blood_pressure: {
        systolic: systolic !== undefined ? Number(systolic) : patient.vitals?.blood_pressure?.systolic,
        diastolic: diastolic !== undefined ? Number(diastolic) : patient.vitals?.blood_pressure?.diastolic
      },
      pulse_rate: {
        value: pulse !== undefined ? Number(pulse) : patient.vitals?.pulse_rate?.value
      },
      respiratory_rate: {
        value: respiratory !== undefined ? Number(respiratory) : patient.vitals?.respiratory_rate?.value
      },
      temperature: {
        value: temperature !== undefined ? Number(temperature) : patient.vitals?.temperature?.value,
        unit: temp_unit || patient.vitals?.temperature?.unit || "Celsius"
      },
      spo2: {
        value: spo2 !== undefined ? Number(spo2) : patient.vitals?.spo2?.value
      },
      height: {
        value: height !== undefined ? Number(height) : patient.vitals?.height?.value,
        unit: height_unit || patient.vitals?.height?.unit || "feet"
      },
      weight: {
        value: weight !== undefined ? Number(weight) : patient.vitals?.weight?.value
      },
      bmi: {
        value: bmi !== undefined ? Number(bmi) : patient.vitals?.bmi?.value
      },
      additional_comments: comments !== undefined ? comments : patient.vitals?.additional_comments
    };

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