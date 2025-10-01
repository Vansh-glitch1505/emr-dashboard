import express from "express";
import Patient from "../models/patients.js";

const router = express.Router();

// POST - Create/Update patient allergies
router.post("/", async (req, res) => {
  try {
    const { patient_id, allergies } = req.body;

    // Validate required fields
    if (!patient_id) {
      return res.status(400).json({
        success: false,
        message: "Patient ID is required"
      });
    }

    if (!allergies || !Array.isArray(allergies)) {
      return res.status(400).json({
        success: false,
        message: "Allergies data must be an array"
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

    // Process allergies data - extract code value from "A100: Medications" format
    const processedAllergies = allergies
      .filter(allergy => allergy.allergen) // Only include rows with allergen selected
      .map(allergy => ({
        allergen: allergy.allergen,
        reaction: allergy.reaction || undefined,
        severity: allergy.severity || undefined,
        category: allergy.category || undefined,
        code: allergy.code ? allergy.code.split(':')[0] : undefined, // Extract "A100" from "A100: Medications"
        status: allergy.status || undefined
      }));

    // Update patient's allergies
    patient.allergies = processedAllergies;
    await patient.save();

    res.status(200).json({
      success: true,
      message: "Allergies saved successfully",
      data: patient.allergies
    });

  } catch (error) {
    console.error("Error saving allergies:", error);
    res.status(500).json({
      success: false,
      message: "Failed to save allergies",
      error: error.message
    });
  }
});

// GET - Retrieve patient allergies by patient ID
router.get("/:patientId", async (req, res) => {
  try {
    const { patientId } = req.params;

    const patient = await Patient.findById(patientId).select('allergies');
    
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found"
      });
    }

    // Format allergies for frontend (add back the description to code)
    const formattedAllergies = patient.allergies?.map(allergy => {
      const obj = allergy.toObject ? allergy.toObject() : allergy;
      return {
        ...obj,
        code: obj.code ? `${obj.code}: ${getCategoryFromCode(obj.code)}` : ""
      };
    }) || [];

    res.status(200).json({
      success: true,
      data: formattedAllergies
    });

  } catch (error) {
    console.error("Error retrieving allergies:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve allergies",
      error: error.message
    });
  }
});

// PUT - Update specific allergy entry
router.put("/:patientId/:allergyIndex", async (req, res) => {
  try {
    const { patientId, allergyIndex } = req.params;
    const allergyUpdate = req.body;

    const patient = await Patient.findById(patientId);
    
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found"
      });
    }

    if (!patient.allergies || !patient.allergies[allergyIndex]) {
      return res.status(404).json({
        success: false,
        message: "Allergy entry not found"
      });
    }

    // Update the specific allergy
    patient.allergies[allergyIndex] = {
      allergen: allergyUpdate.allergen || patient.allergies[allergyIndex].allergen,
      reaction: allergyUpdate.reaction || patient.allergies[allergyIndex].reaction,
      severity: allergyUpdate.severity || patient.allergies[allergyIndex].severity,
      category: allergyUpdate.category || patient.allergies[allergyIndex].category,
      code: allergyUpdate.code ? allergyUpdate.code.split(':')[0] : patient.allergies[allergyIndex].code,
      status: allergyUpdate.status || patient.allergies[allergyIndex].status
    };

    await patient.save();

    res.status(200).json({
      success: true,
      message: "Allergy updated successfully",
      data: patient.allergies
    });

  } catch (error) {
    console.error("Error updating allergy:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update allergy",
      error: error.message
    });
  }
});

// DELETE - Remove specific allergy entry
router.delete("/:patientId/:allergyIndex", async (req, res) => {
  try {
    const { patientId, allergyIndex } = req.params;

    const patient = await Patient.findById(patientId);
    
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found"
      });
    }

    if (!patient.allergies || !patient.allergies[allergyIndex]) {
      return res.status(404).json({
        success: false,
        message: "Allergy entry not found"
      });
    }

    // Remove the allergy at the specified index
    patient.allergies.splice(allergyIndex, 1);
    await patient.save();

    res.status(200).json({
      success: true,
      message: "Allergy removed successfully",
      data: patient.allergies
    });

  } catch (error) {
    console.error("Error removing allergy:", error);
    res.status(500).json({
      success: false,
      message: "Failed to remove allergy",
      error: error.message
    });
  }
});

// DELETE - Clear all allergies for a patient
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

    patient.allergies = [];
    await patient.save();

    res.status(200).json({
      success: true,
      message: "All allergies cleared successfully"
    });

  } catch (error) {
    console.error("Error clearing allergies:", error);
    res.status(500).json({
      success: false,
      message: "Failed to clear allergies",
      error: error.message
    });
  }
});

// Helper function to get category description from code
function getCategoryFromCode(code) {
  const codeMap = {
    'A100': 'Medications',
    'A200': 'Foods',
    'A300': 'Environmental',
    'A400': 'Insects',
    'A500': 'Latex',
    'A600': 'Other'
  };
  return codeMap[code] || '';
}

export default router;
