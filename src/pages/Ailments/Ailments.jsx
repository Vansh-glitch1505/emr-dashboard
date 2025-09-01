import React, { useState } from "react";
import { useNavigate, useOutletContext } from 'react-router-dom';
import "./Ailments.css";

const Ailments = () => {
  const navigate = useNavigate();
  const { updatePreviewData } = useOutletContext();
  
  const [ailment, setAilment] = useState({
    problemName: '',
    icdCode: '',
    description: '',
    status: 'Select',
    severity: 'Select',
    dateOfOnset: '',
    riskFactor: '',
    comorbidities: '',
    sideEffects: '',
    treatmentPlan: '',
    testResults: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAilment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    if (!ailment.problemName) {
      alert('Please enter at least a problem name');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/ailments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ailment)
      });

      const data = await res.json();

      if (data.success) {
        updatePreviewData(ailment, 'ailments');
        alert('Ailment saved successfully!');
        setAilment({
          problemName: '',
          icdCode: '',
          description: '',
          status: 'Select',
          severity: 'Select',
          dateOfOnset: '',
          riskFactor: '',
          comorbidities: '',
          sideEffects: '',
          treatmentPlan: '',
          testResults: ''
        });
      } else {
        alert(data.message || 'Failed to save ailment');
      }
    } catch (err) {
      console.error('Error saving ailment:', err);
      alert('Error saving ailment');
    }
  };

  const handleNext = async () => {
    if (ailment.problemName) {
      await handleSave();
    }
    navigate('/dashboard/assessment');
  };

  return (
    <div className="ailments-container">
      <header className="fixed-header">
        <h1 className="header-title"></h1>
      </header>
      <h2 className="ailments-title">Ailments</h2>

      <fieldset className="ailments-section">
        <legend className="section-title">Problem Information</legend>
        
        <div className="form-row">
          <div className="input-group">
            <label htmlFor="problemName">Problem Name</label>
            <input 
              id="problemName"
              type="text" 
              name="problemName"
              value={ailment.problemName}
              onChange={handleChange}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="icdCode">ICD Code</label>
            <input 
              id="icdCode"
              type="text" 
              name="icdCode"
              value={ailment.icdCode}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="input-group full-width">
            <label htmlFor="description">Description</label>
            <textarea 
              id="description"
              rows="3" 
              name="description"
              value={ailment.description}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label htmlFor="status">Status</label>
            <select 
              id="status"
              name="status"
              value={ailment.status}
              onChange={handleChange}
            >
              <option value="Select">Select</option>
              <option value="Active">Active</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
          
          <div className="input-group">
            <label htmlFor="severity">Severity</label>
            <select 
              id="severity"
              name="severity"
              value={ailment.severity}
              onChange={handleChange}
            >
              <option value="Select">Select</option>
              <option value="Mild">Mild</option>
              <option value="Moderate">Moderate</option>
              <option value="Severe">Severe</option>
            </select>
          </div>
          
          <div className="input-group">
            <label htmlFor="dateOfOnset">Date of Onset</label>
            <input 
              id="dateOfOnset"
              type="date" 
              name="dateOfOnset"
              value={ailment.dateOfOnset}
              onChange={handleChange}
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="ailments-section">
        <legend className="section-title">Associated Factors</legend>
        
        <div className="form-row">
          <div className="input-group">
            <label htmlFor="riskFactor">Risk Factor</label>
            <input 
              id="riskFactor"
              type="text" 
              name="riskFactor"
              value={ailment.riskFactor}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="input-group full-width">
            <label htmlFor="comorbidities">Comorbidities</label>
            <textarea 
              id="comorbidities"
              rows="2" 
              name="comorbidities"
              value={ailment.comorbidities}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="input-group full-width">
            <label htmlFor="sideEffects">Medication Side Effects</label>
            <textarea 
              id="sideEffects"
              rows="2" 
              name="sideEffects"
              value={ailment.sideEffects}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="input-group full-width">
            <label htmlFor="treatmentPlan">Treatment Plan</label>
            <textarea 
              id="treatmentPlan"
              rows="3" 
              name="treatmentPlan"
              value={ailment.treatmentPlan}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="input-group full-width">
            <label htmlFor="testResults">Test Results</label>
            <textarea 
              id="testResults"
              rows="3" 
              name="testResults"
              value={ailment.testResults}
              onChange={handleChange}
            />
          </div>
        </div>
      </fieldset>

      <div className="form-actions">
        <button className="save-btn" onClick={handleSave}>Save</button>
        <button className="next-btn" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default Ailments;