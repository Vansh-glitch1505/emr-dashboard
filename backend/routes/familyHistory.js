import express from "express";
import Patient from "../models/patients.js";

const router = express.Router();

// POST - Create/Update patient family history
router.post("/:patientId", async (req, res) => {
  try {
    const { patientId } = req.params;
    const { familyMembers, geneticConditions } = req.body;

    // Validate required fields
    if (!patientId) {
      return res.status(400).json({
        success: false,
        message: "Patient ID is required"
      });
    }

    if (!familyMembers || !Array.isArray(familyMembers)) {
      return res.status(400).json({
        success: false,
        message: "Family members data must be an array"
      });
    }

    // Find the patient
    const patient = await Patient.findById(patientId);
    
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found"
      });
    }

    // Process family members data
    const processedFamilyMembers = familyMembers.map(member => {
      // Convert date format from YYYY-MM-DD to MM-DD-YYYY for the model
      let formattedDob = member.dob;
      if (member.dob) {
        const dobParts = member.dob.split("-");
        formattedDob = `${dobParts[1]}-${dobParts[2]}-${dobParts[0]}`;
      }

      // Create genetic conditions array for this member
      const memberGeneticConditions = geneticConditions
        ?.filter(gc => {
          const fullName = `${member.firstName} ${member.lastName}`.toLowerCase();
          return gc.affectedMember.toLowerCase().includes(member.relationship.toLowerCase()) ||
                 gc.affectedMember.toLowerCase() === fullName;
        })
        .map(gc => ({
          condition_name: gc.conditionName,
          affected_family_members: gc.affectedMember,
          affected_family_member: gc.affectedMember,
          genetic_testing_results: gc.testResults
        })) || [];

      return {
        name: {
          first: member.firstName,
          middle: member.middleName || "",
          last: member.lastName
        },
        date_of_birth: formattedDob,
        gender: member.gender,
        relationship: member.relationship,
        deceased: member.deceased,
        medical_conditions: member.medicalConditions || [],
        genetic_conditions: memberGeneticConditions
      };
    });

    // Update patient's family history
    if (!patient.family_history) {
      patient.family_history = {};
    }
    
    patient.family_history.family_members = processedFamilyMembers;
    
    await patient.save();

    res.status(200).json({
      success: true,
      message: "Family history saved successfully",
      data: patient.family_history
    });

  } catch (error) {
    console.error("Error saving family history:", error);
    res.status(500).json({
      success: false,
      message: "Failed to save family history",
      error: error.message
    });
  }
});

// GET - Retrieve patient family history by patient ID
router.get("/:patientId", async (req, res) => {
  try {
    const { patientId } = req.params;

    const patient = await Patient.findById(patientId).select("family_history");
    
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found"
      });
    }

    // Format family history for frontend
    const familyMembers = patient.family_history?.family_members?.map(member => {
      let formattedDob = member.date_of_birth;
      if (member.date_of_birth) {
        const dobParts = member.date_of_birth.split("-");
        formattedDob = `${dobParts[2]}-${dobParts[0]}-${dobParts[1]}`; // MM-DD-YYYY -> YYYY-MM-DD
      }

      return {
        firstName: member.name.first,
        middleName: member.name.middle || "",
        lastName: member.name.last,
        dob: formattedDob,
        gender: member.gender,
        relationship: member.relationship,
        deceased: member.deceased,
        medicalConditions: member.medical_conditions || [],
        newCondition: ""
      };
    }) || [];

    // Extract all genetic conditions from all family members
    const geneticConditions = [];
    patient.family_history?.family_members?.forEach(member => {
      if (member.genetic_conditions && member.genetic_conditions.length > 0) {
        member.genetic_conditions.forEach(gc => {
          geneticConditions.push({
            conditionName: gc.condition_name,
            affectedMember: gc.affected_family_member || gc.affected_family_members,
            testResults: gc.genetic_testing_results
          });
        });
      }
    });

    res.status(200).json({
      success: true,
      data: {
        familyMembers,
        geneticConditions
      }
    });

  } catch (error) {
    console.error("Error retrieving family history:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve family history",
      error: error.message
    });
  }
});

// PUT - Update specific family member
router.put("/:patientId/member/:memberIndex", async (req, res) => {
  try {
    const { patientId, memberIndex } = req.params;
    const memberUpdate = req.body;

    const patient = await Patient.findById(patientId);
    
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found"
      });
    }

    if (!patient.family_history?.family_members || !patient.family_history.family_members[memberIndex]) {
      return res.status(404).json({
        success: false,
        message: "Family member not found"
      });
    }

    // Convert date format if provided
    let formattedDob = patient.family_history.family_members[memberIndex].date_of_birth;
    if (memberUpdate.dob) {
      const dobParts = memberUpdate.dob.split("-");
      formattedDob = `${dobParts[1]}-${dobParts[2]}-${dobParts[0]}`;
    }

    // Update the specific family member
    patient.family_history.family_members[memberIndex] = {
      name: {
        first: memberUpdate.firstName || patient.family_history.family_members[memberIndex].name.first,
        middle: memberUpdate.middleName || patient.family_history.family_members[memberIndex].name.middle,
        last: memberUpdate.lastName || patient.family_history.family_members[memberIndex].name.last
      },
      date_of_birth: formattedDob,
      gender: memberUpdate.gender || patient.family_history.family_members[memberIndex].gender,
      relationship: memberUpdate.relationship || patient.family_history.family_members[memberIndex].relationship,
      deceased: memberUpdate.deceased !== undefined ? memberUpdate.deceased : patient.family_history.family_members[memberIndex].deceased,
      medical_conditions: memberUpdate.medicalConditions || patient.family_history.family_members[memberIndex].medical_conditions,
      genetic_conditions: patient.family_history.family_members[memberIndex].genetic_conditions || []
    };

    await patient.save();

    res.status(200).json({
      success: true,
      message: "Family member updated successfully",
      data: patient.family_history
    });

  } catch (error) {
    console.error("Error updating family member:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update family member",
      error: error.message
    });
  }
});

// DELETE - Remove specific family member
router.delete("/:patientId/member/:memberIndex", async (req, res) => {
  try {
    const { patientId, memberIndex } = req.params;

    const patient = await Patient.findById(patientId);
    
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found"
      });
    }

    if (!patient.family_history?.family_members || !patient.family_history.family_members[memberIndex]) {
      return res.status(404).json({
        success: false,
        message: "Family member not found"
      });
    }

    // Remove the family member at the specified index
    patient.family_history.family_members.splice(memberIndex, 1);
    await patient.save();

    res.status(200).json({
      success: true,
      message: "Family member removed successfully",
      data: patient.family_history
    });

  } catch (error) {
    console.error("Error removing family member:", error);
    res.status(500).json({
      success: false,
      message: "Failed to remove family member",
      error: error.message
    });
  }
});

// DELETE - Clear all family history for a patient
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

    patient.family_history = {
      family_members: []
    };
    await patient.save();

    res.status(200).json({
      success: true,
      message: "Family history cleared successfully"
    });

  } catch (error) {
    console.error("Error clearing family history:", error);
    res.status(500).json({
      success: false,
      message: "Failed to clear family history",
      error: error.message
    });
  }
});

export default router;
