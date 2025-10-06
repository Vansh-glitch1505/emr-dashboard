import express from "express";
import Patient from "../models/patients.js";

const router = express.Router();

// GET medication history by patient ID
router.get("/:patientId", async (req, res) => {
  try {
    const { patientId } = req.params;
    const patient = await Patient.findById(patientId).select("medication_history");
    if (!patient) return res.status(404).json({ error: "Patient not found" });

    res.json(patient.medication_history || []);
  } catch (error) {
    console.error("Error fetching medication history:", error);
    res.status(500).json({ error: "Failed to fetch medication history" });
  }
});

// POST or UPDATE medication history
router.post("/", async (req, res) => {
  try {
    const { patientId, medications } = req.body;

    if (!patientId)
      return res.status(400).json({ error: "patientId is required" });
    if (!Array.isArray(medications) || medications.length === 0)
      return res.status(400).json({ error: "medications must be a non-empty array" });

    // Valid enum values
    const validDoseTimes = ["Morning", "Afternoon", "Evening", "Night", "Before Meals", "After Meals", "With Meals"];
    const validFrequencies = ["Once daily (OD)", "Twice daily (BD)", "Thrice daily (TDS)", "Four times daily (QID)", "As needed (PRN)", "Weekly", "Monthly"];
    const validDurations = ["1 week", "2 weeks", "1 month", "3 months", "6 months", "1 year", "Ongoing"];

    // Transform and validate medications
    const transformedMedications = medications.map((m, index) => {
      // Validate problem
      if (!m.problem?.trim() || m.problem.trim().length < 1 || m.problem.trim().length > 100) {
        throw new Error(`Row ${index + 1}: Problem must be 1-100 characters`);
      }

      // Validate medicine
      if (!m.medicine?.trim() || m.medicine.trim().length < 1 || m.medicine.trim().length > 100) {
        throw new Error(`Row ${index + 1}: Medicine must be 1-100 characters`);
      }

      // Parse and validate dosage
      const dosageNum = Number(m.mg);
      if (isNaN(dosageNum) || dosageNum < 0) {
        throw new Error(`Row ${index + 1}: Dosage must be a positive number`);
      }

      // Validate dose_time
      if (!m.doseTime?.trim()) {
        throw new Error(`Row ${index + 1}: Dose time is required`);
      }
      if (!validDoseTimes.includes(m.doseTime)) {
        throw new Error(`Row ${index + 1}: Invalid dose time. Must be one of: ${validDoseTimes.join(', ')}`);
      }

      // Validate frequency
      if (!m.frequency?.trim()) {
        throw new Error(`Row ${index + 1}: Frequency is required`);
      }
      if (!validFrequencies.includes(m.frequency)) {
        throw new Error(`Row ${index + 1}: Invalid frequency. Must be one of: ${validFrequencies.join(', ')}`);
      }

      // Validate duration
      if (!m.timePeriod?.trim()) {
        throw new Error(`Row ${index + 1}: Duration is required`);
      }
      if (!validDurations.includes(m.timePeriod)) {
        throw new Error(`Row ${index + 1}: Invalid duration. Must be one of: ${validDurations.join(', ')}`);
      }

      return {
        problem: m.problem.trim(),
        medicine: m.medicine.trim(),
        dosage: dosageNum,
        dose_time: m.doseTime,
        frequency: m.frequency,
        duration: m.timePeriod,
        status: m.status ? "Active" : "Inactive",
      };
    });

    const patient = await Patient.findByIdAndUpdate(
      patientId,
      { medication_history: transformedMedications },
      { new: true, runValidators: true }
    );

    if (!patient) return res.status(404).json({ error: "Patient not found" });

    res.json({
      message: "Medication history saved successfully",
      medication_history: patient.medication_history,
    });
  } catch (error) {
    console.error("Error saving medication history:", error);
    
    // Log the full error for debugging
    if (error.errInfo) {
      console.error("Validation Error Details:", JSON.stringify(error.errInfo, null, 2));
    }
    
    // Handle validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({
        error: "Validation failed",
        details: Object.values(error.errors).map((e) => e.message),
      });
    }
    
    // Handle custom validation errors
    if (error.message.includes("Row")) {
      return res.status(400).json({
        error: "Validation failed",
        details: [error.message],
      });
    }
    
    // Handle MongoDB schema validation errors
    if (error.code === 121) {
      return res.status(400).json({
        error: "Document validation failed",
        details: ["Please ensure all fields meet the required format and constraints"],
      });
    }
    
    res.status(500).json({ error: "Failed to save medication history" });
  }
});

// DELETE a specific medication entry
router.delete("/:patientId/:medicationId", async (req, res) => {
  try {
    const { patientId, medicationId } = req.params;

    const patient = await Patient.findById(patientId);
    if (!patient) return res.status(404).json({ error: "Patient not found" });

    patient.medication_history = patient.medication_history.filter(
      (m) => m._id.toString() !== medicationId
    );

    await patient.save();

    res.json({
      message: "Medication deleted successfully",
      medication_history: patient.medication_history,
    });
  } catch (error) {
    console.error("Error deleting medication:", error);
    res.status(500).json({ error: "Failed to delete medication" });
  }
});

export default router;