import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./FamilyHistory.css";

const FamilyHistory = () => {
  const [familyMembers, setFamilyMembers] = useState([]);
  const [geneticConditions, setGeneticConditions] = useState([]);
  const navigate = useNavigate();
  const [hasAddedMembers, setHasAddedMembers] = useState(false);
  const [currentMember, setCurrentMember] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    gender: "Select",
    relationship: "Select",
    deceased: false,
    medicalConditions: [],
    newCondition: ""
  });
  const [currentGeneticCondition, setCurrentGeneticCondition] = useState({
    conditionName: "",
    affectedMember: "Select",
    testResults: ""
  });
  

  const handleMemberChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentMember(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleGeneticConditionChange = (e) => {
    const { name, value } = e.target;
    setCurrentGeneticCondition(prev => ({
      ...prev,
      [name]: value
    }));
  };

  

  const addMedicalCondition = () => {
    if (currentMember.newCondition.trim()) {
      setCurrentMember(prev => ({
        ...prev,
        medicalConditions: [...prev.medicalConditions, prev.newCondition],
        newCondition: ""
      }));
    }
  };

  const addFamilyMember = () => {
    if (
      currentMember.firstName.trim() &&
      currentMember.lastName.trim() &&
      currentMember.dob.trim() &&
      currentMember.gender !== "Select" &&
      currentMember.relationship !== "Select"
    ) {
      setFamilyMembers([...familyMembers, currentMember]);
      setHasAddedMembers(true); 
      setCurrentMember({
        firstName: "",
        middleName: "",
        lastName: "",
        dob: "",
        gender: "Select",
        relationship: "Select",
        deceased: false,
        medicalConditions: [],
        newCondition: ""
      });
    }
  };

  const addGeneticCondition = () => {
    if (
      currentGeneticCondition.conditionName.trim() &&
      currentGeneticCondition.affectedMember !== "Select" &&
      currentGeneticCondition.testResults.trim()
    ) {
      setGeneticConditions([...geneticConditions, currentGeneticCondition]);
      setCurrentGeneticCondition({
        conditionName: "",
        affectedMember: "Select",
        testResults: ""
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addFamilyMember();
    if (currentGeneticCondition.conditionName) {
      addGeneticCondition();
    }
  };

  
  const handleNext = () => {
    navigate('/dashboard/social-history');
  };

  return (
    <div className="family-history-container">
      <header className="fixed-header">
        <h1 className="header-title"></h1>
       </header>
      <h2>Family History</h2>

      <form onSubmit={handleSubmit}>
        <div className="section">
          <h3>Family Members Details:</h3>
          <div className="form-row">
            <label>Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={currentMember.firstName}
              onChange={handleMemberChange}
            />
            <input
              type="text"
              name="middleName"
              placeholder="Middle Name"
              value={currentMember.middleName}
              onChange={handleMemberChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={currentMember.lastName}
              onChange={handleMemberChange}
            />
          </div>

          <div className="form-row">
            <label>Date of Birth</label>
            <input
              type="text"
              name="dob"
              placeholder="DD/MM/YYYY"
              value={currentMember.dob}
              onChange={handleMemberChange}
            />
            <label>Gender</label>
            <select
              name="gender"
              value={currentMember.gender}
              onChange={handleMemberChange}
            >
              <option>Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div className="form-row">
            <label>Relationship</label>
            <select
              name="relationship"
              value={currentMember.relationship}
              onChange={handleMemberChange}
            >
              <option>Select</option>
              <option>Father</option>
              <option>Mother</option>
              <option>Sibling</option>
              <option>Grandparent</option>
              <option>Other</option>
            </select>

            <label>Deceased</label>
            <input
              type="checkbox"
              name="deceased"
              checked={currentMember.deceased}
              onChange={handleMemberChange}
            />
          </div>

          <div className="form-row">
            <label>Medical Conditions</label>
            <div className="condition-row">
              <input
                type="text"
                placeholder="Write Here"
                value={currentMember.newCondition}
                onChange={(e) => setCurrentMember(prev => ({
                  ...prev,
                  newCondition: e.target.value
                }))}
              />
              <button
                type="button"
                className="add-btn"
                onClick={addMedicalCondition}
              >
                +
              </button>
            </div>
            {currentMember.medicalConditions.length > 0 && (
              <div className="conditions-list">
                {currentMember.medicalConditions.join(", ")}
              </div>
            )}
          </div>
        </div>

        <div className="section">
          <h3>Genetic Conditions:</h3>
          <div className="form-row">
            <label>Condition Name</label>
            <input
              type="text"
              name="conditionName"
              value={currentGeneticCondition.conditionName}
              onChange={handleGeneticConditionChange}
            />
          </div>
          <div className="form-row">
            <label>Affected Family Members Name</label>
            <select
              name="affectedMember"
              value={currentGeneticCondition.affectedMember}
              onChange={handleGeneticConditionChange}
            >
              <option>Select</option>
              <option>Father</option>
              <option>Mother</option>
              <option>Sibling</option>
              <option>Grandparent</option>
              <option>None</option>
            </select>
          </div>
          <div className="form-row">
            <label>Genetic Testing Results</label>
            <input
              type="text"
              name="testResults"
              placeholder="Write Here"
              value={currentGeneticCondition.testResults}
              onChange={handleGeneticConditionChange}
            />
          </div>
        </div>

        <div className="button-row">
          <button type="button" className="add-btn" onClick={handleSubmit}>
            Add
          </button>
          <button
            type="button" 
            className="next-btn"
            disabled={!hasAddedMembers}
            onClick={handleNext} 
          >
            Next
          </button>
        </div>
      </form>

      {/* Display added family members */}
      {familyMembers.length > 0 && (
        <div className="display-section">
          <h3>Family Members:</h3>
          {familyMembers.map((member, index) => (
            <div key={index} className="member-card">
              <p><strong>Name:</strong> {`${member.firstName} ${member.middleName} ${member.lastName}`}</p>
              <p><strong>DOB:</strong> {member.dob}</p>
              <p><strong>Gender:</strong> {member.gender}</p>
              <p><strong>Relation:</strong> {member.relationship}</p>
              <p><strong>Deceased:</strong> {member.deceased ? "Yes" : "No"}</p>
              {member.medicalConditions.length > 0 && (
                <p><strong>Medical Conditions:</strong> {member.medicalConditions.join(", ")}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Display genetic conditions in a table */}
      {geneticConditions.length > 0 && (
        <div className="display-section">
          <h3>Genetic Conditions:</h3>
          <table className="genetic-table">
            <thead>
              <tr>
                <th>Condition Name</th>
                <th>Affected Member</th>
                <th>Test Results</th>
              </tr>
            </thead>
            <tbody>
              {geneticConditions.map((condition, index) => (
                <tr key={index}>
                  <td>{condition.conditionName}</td>
                  <td>{condition.affectedMember}</td>
                  <td>{condition.testResults}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FamilyHistory;