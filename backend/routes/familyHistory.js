import express from 'express';
import Patient from '../models/patients.js';

const router = express.Router();

// GET - Retrieve family history for a specific patient
router.get('/:patientId', async (req, res) => {
  try {
    const { patientId } = req.params;
    
    const patient = await Patient.findById(patientId).select('family_history');
    
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }

    res.status(200).json({
      success: true,
      data: patient.family_history
    });
  } catch (error) {
    console.error('Error retrieving family history:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// POST - Create or update family history for a specific patient
router.post('/:patientId', async (req, res) => {
  try {
    const { patientId } = req.params;
    const { familyMembers, geneticConditions } = req.body;

    // Transform frontend data to match schema structure
    const transformedFamilyMembers = familyMembers.map(member => ({
      name: {
        first: member.firstName,
        middle: member.middleName || '',
        last: member.lastName
      },
      relationship: member.relationship,
      gender: member.gender,
      date_of_birth: member.dob,
      deceased: member.deceased,
      date_of_death: member.dateOfDeath || null,
      reason_of_death: member.reasonOfDeath || null,
      medical_conditions: member.medicalConditions || [],
      genetic_conditions: []
    }));

    // Transform genetic conditions to match schema
    const transformedGeneticConditions = geneticConditions.map(condition => ({
      condition_name: condition.conditionName,
      genetic_testing_results: condition.testResults,
      affected_family_members: [condition.affectedMember]
    }));

    // Add genetic conditions to respective family members
    transformedGeneticConditions.forEach(genCondition => {
      const affectedMember = transformedFamilyMembers.find(
        member => member.relationship === genCondition.affected_family_members[0]
      );
      if (affectedMember) {
        affectedMember.genetic_conditions.push(genCondition);
      }
    });

    // Generate hereditary risks based on conditions
    const allConditions = [
      ...familyMembers.flatMap(member => member.medicalConditions || []),
      ...geneticConditions.map(condition => condition.conditionName)
    ];
    const uniqueHereditaryRisks = [...new Set(allConditions)];

    const familyHistoryData = {
      family_members: transformedFamilyMembers,
      hereditary_risks: uniqueHereditaryRisks
    };

    // Find and update patient
    const patient = await Patient.findByIdAndUpdate(
      patientId,
      { family_history: familyHistoryData },
      { new: true, runValidators: true }
    );

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Family history updated successfully',
      data: patient.family_history
    });
  } catch (error) {
    console.error('Error updating family history:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// PUT - Update specific family member
router.put('/:patientId/member/:memberIndex', async (req, res) => {
  try {
    const { patientId, memberIndex } = req.params;
    const memberData = req.body;

    const patient = await Patient.findById(patientId);
    
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }

    if (!patient.family_history.family_members[memberIndex]) {
      return res.status(404).json({
        success: false,
        message: 'Family member not found'
      });
    }

    // Transform and update the specific family member
    const transformedMember = {
      name: {
        first: memberData.firstName,
        middle: memberData.middleName || '',
        last: memberData.lastName
      },
      relationship: memberData.relationship,
      gender: memberData.gender,
      date_of_birth: memberData.dob,
      deceased: memberData.deceased,
      date_of_death: memberData.dateOfDeath || null,
      reason_of_death: memberData.reasonOfDeath || null,
      medical_conditions: memberData.medicalConditions || [],
      genetic_conditions: memberData.geneticConditions || []
    };

    patient.family_history.family_members[memberIndex] = transformedMember;
    await patient.save();

    res.status(200).json({
      success: true,
      message: 'Family member updated successfully',
      data: patient.family_history.family_members[memberIndex]
    });
  } catch (error) {
    console.error('Error updating family member:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// DELETE - Remove a family member
router.delete('/:patientId/member/:memberIndex', async (req, res) => {
  try {
    const { patientId, memberIndex } = req.params;

    const patient = await Patient.findById(patientId);
    
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }

    if (!patient.family_history.family_members[memberIndex]) {
      return res.status(404).json({
        success: false,
        message: 'Family member not found'
      });
    }

    patient.family_history.family_members.splice(memberIndex, 1);
    await patient.save();

    res.status(200).json({
      success: true,
      message: 'Family member removed successfully'
    });
  } catch (error) {
    console.error('Error removing family member:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// POST - Add single family member
router.post('/:patientId/member', async (req, res) => {
  try {
    const { patientId } = req.params;
    const memberData = req.body;

    const patient = await Patient.findById(patientId);
    
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }

    const transformedMember = {
      name: {
        first: memberData.firstName,
        middle: memberData.middleName || '',
        last: memberData.lastName
      },
      relationship: memberData.relationship,
      gender: memberData.gender,
      date_of_birth: memberData.dob,
      deceased: memberData.deceased,
      date_of_death: memberData.dateOfDeath || null,
      reason_of_death: memberData.reasonOfDeath || null,
      medical_conditions: memberData.medicalConditions || [],
      genetic_conditions: memberData.geneticConditions || []
    };

    // Initialize family_history if it doesn't exist
    if (!patient.family_history) {
      patient.family_history = {
        family_members: [],
        hereditary_risks: []
      };
    }

    patient.family_history.family_members.push(transformedMember);
    await patient.save();

    res.status(201).json({
      success: true,
      message: 'Family member added successfully',
      data: transformedMember
    });
  } catch (error) {
    console.error('Error adding family member:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

export default router;