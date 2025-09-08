import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Assessment.css";

export default function Assessment() {
  const navigate = useNavigate();

  const [assessment, setAssessment] = useState({
    chiefComplaints: '',
    historyOfPresentIllness: '',
    pastMedicalHistory: '',
    medicationHistory: '',
    testResults: '',
    remindersAlerts: '',
    planCare: ''
  });

  const [tests, setTests] = useState([]);

  const handleInputChange = (field, value) => {
    setAssessment(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTestChange = (index, field, value) => {
    const updatedTests = [...tests];
    updatedTests[index] = {
      ...updatedTests[index],
      [field]: value
    };
    setTests(updatedTests);
  };

  const handleFileChange = (index, file) => {
    const updatedTests = [...tests];
    updatedTests[index] = {
      ...updatedTests[index],
      file: file,
      fileName: file.name
    };
    setTests(updatedTests);
  };

  const addTest = () => {
    setTests([...tests, {
      id: Date.now().toString(),
      file: null,
      fileName: '',
      comment: '',
      result: ''
    }]);
  };

  const removeTest = (index) => {
    const updatedTests = [...tests];
    updatedTests.splice(index, 1);
    setTests(updatedTests);
  };

  const handleSave = () => {
    alert('Assessment saved successfully!');
  };

  const handleNext = () => {
    navigate('/preview');
  };

  return (
    <div className="assessment-container">
      {/* Fixed Header */}
      <header className="assessment-header">
        <h1></h1>
      </header>

      {/* Main Content */}
      <div className="assessment-content">
        <div className="assessment-section">
          <h2 className="section-title centered-title">Patient Information</h2>

          <div className="form-row">
            <div className="input-group">
              <label>Chief Complaints</label>
              <textarea 
                value={assessment.chiefComplaints}
                onChange={(e) => handleInputChange('chiefComplaints', e.target.value)}
                rows="3"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>History of Present Illness</label>
              <textarea 
                value={assessment.historyOfPresentIllness}
                onChange={(e) => handleInputChange('historyOfPresentIllness', e.target.value)}
                rows="4"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Past Medical History</label>
              <textarea 
                value={assessment.pastMedicalHistory}
                onChange={(e) => handleInputChange('pastMedicalHistory', e.target.value)}
                rows="3"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Medication History</label>
              <textarea 
                value={assessment.medicationHistory}
                onChange={(e) => handleInputChange('medicationHistory', e.target.value)}
                rows="3"
              />
            </div>
          </div>
        </div>

        {/* Tests Section */}
        <div className="assessment-section tests-section">
          <h2 className="section-title centered-title">Test Results</h2>
          <span className="section-subtitle">Upload test files, add results, and comments</span>

          {tests.map((test, index) => (
            <div key={test.id} className="test-card">
              <div className="test-input-group">
                <label>Results</label>
                <textarea
                  placeholder="Enter test results"
                  value={test.result}
                  onChange={(e) => handleTestChange(index, 'result', e.target.value)}
                  rows="3"
                />
              </div>

              <div className="test-input-group">
                <label>Test File</label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(index, e.target.files[0])}
                />
                {test.url && (
                  <div className="file-preview">
                    <span>Existing file: </span>
                    <a href={test.url} target="_blank" rel="noopener noreferrer">
                      {test.fileName}
                    </a>
                  </div>
                )}
              </div>

              <div className="test-input-group">
                <label>Comments</label>
                <textarea
                  placeholder="Add comment about this test"
                  value={test.comment}
                  onChange={(e) => handleTestChange(index, 'comment', e.target.value)}
                  rows="3"
                />
              </div>

              <div className="test-actions">
                <button 
                  className="remove-test"
                  onClick={() => removeTest(index)}
                >
                  Remove Test
                </button>
              </div>
            </div>
          ))}

          <div className="tests-controls">
            <button className="add-test" onClick={addTest}>
              + Add Test
            </button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="assessment-section">
          <h2 className="section-title centered-title">Additional Information</h2>

          <div className="form-row">
            <div className="input-group">
              <label>Reminders & Alerts</label>
              <textarea 
                value={assessment.remindersAlerts}
                onChange={(e) => handleInputChange('remindersAlerts', e.target.value)}
                rows="2"
              />
              <span className="hint">Important notifications for the care team</span>
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Plan of Care</label>
              <textarea 
                value={assessment.planCare}
                onChange={(e) => handleInputChange('planCare', e.target.value)}
                rows="4"
              />
              <span className="hint">Treatment plan and follow-up instructions</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="form-actions">
          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
          <button className="next-btn" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
