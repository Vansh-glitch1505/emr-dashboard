import express from "express";
import Patient from "../models/patients.js";

const router = express.Router();

// GET medication history for a specific patient
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    
    const patient = await Patient.findById(userId).select("medication_history");
    
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    
    // Return the medication history array
    res.json(patient.medication_history || []);
  } catch (error) {
    console.error("Error fetching medication history:", error);
    res.status(500).json({ error: "Failed to fetch medication history" });
  }
});

// POST/UPDATE medication history for a patient
router.post("/", async (req, res) => {
  try {
    const { userId, medications } = req.body;
    
    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }
    
    if (!Array.isArray(medications)) {
      return res.status(400).json({ error: "medications must be an array" });
    }
    
    // Transform frontend data to match schema
    const transformedMedications = medications.map(med => ({
      problem: med.problem || "",
      medicine: med.medicine || "",
      dosage: parseFloat(med.mg) || 0,
      dose_time: med.doseTime || "",
      frequency: med.doseTime || "", // You might want to separate this
      time_period: med.timePeriod || "",
      status: med.status ? "Active" : "Inactive"
    }));
    
    // Find and update the patient
    const patient = await Patient.findByIdAndUpdate(
      userId,
      { medication_history: transformedMedications },
      { new: true, runValidators: true }
    );
    
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    
    res.json({ 
      message: "Medication history saved successfully",
      medication_history: patient.medication_history
    });
  } catch (error) {
    console.error("Error saving medication history:", error);
    
    // Handle validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ error: "Validation failed", details: errors });
    }
    
    res.status(500).json({ error: "Failed to save medication history" });
  }
});

// DELETE a specific medication entry
router.delete("/:userId/:medicationId", async (req, res) => {
  try {
    const { userId, medicationId } = req.params;
    
    const patient = await Patient.findById(userId);
    
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    
    // Remove the medication from the array
    patient.medication_history = patient.medication_history.filter(
      med => med._id.toString() !== medicationId
    );
    
    await patient.save();
    
    res.json({ 
      message: "Medication deleted successfully",
      medication_history: patient.medication_history
    });
  } catch (error) {
    console.error("Error deleting medication:", error);
    res.status(500).json({ error: "Failed to delete medication" });
  }
});

export default router;