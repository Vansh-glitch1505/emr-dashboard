import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from 'react-router-dom';
import "./Assessment.css";

const Assessment = () => {
  const navigate = useNavigate();
  const { updatePreviewData } = useOutletContext();
  
  const [assessment, setAssessment] = useState({
    chiefComplaints: '',
    historyOfPresentIllness: '',
    pastMedicalHistory: '',
    medicationHistory: '',
    testResults: '',
    remindersAlerts: '',
    planCare: ''
  });

  // Load previous saved data from backend
  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/assessment/latest?userId=1');
        if (res.ok) {
          const data = await res.json();
          if (data && data.data) {
            setAssessment({
              chiefComplaints: data.data.chief_complaints || '',
              historyOfPresentIllness: data.data.history_of_present_illness || '',
              pastMedicalHistory: data.data.past_medical_history || '',
              medicationHistory: data.data.medication_history || '',
              testResults: data.data.test_results || '',
              remindersAlerts: data.data.reminders_alerts || '',
              planCare: data.data.plan_care || ''
            });
          }
        }
      } catch (err) {
        console.error('Error loading assessment:', err);
      }
    };

    fetchAssessment();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssessment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(assessment)
      });

      const data = await res.json();
      if (data.success) {
        updatePreviewData(assessment, 'assessment');
        alert('Assessment saved successfully!');
      } else {
        alert(data.message || 'Failed to save assessment');
      }
    } catch (err) {
      console.error('Error saving assessment:', err);
      alert('Error saving assessment');
    }
  };

  const handleNext = async () => {
    navigate('/dashboard/medical-history');
  };

  return (
    <div className="assessment-container">
      <header className="fixed-header">
        <h1 className="header-title"></h1>
      </header>
      <h2 className="assessment-title">Assessment</h2>

      <fieldset className="assessment-section">
        <legend className="section-title">Patient Assessment</legend>
        
        <div className="form-row">
          <div className="input-group full-width">
            <label htmlFor="chiefComplaints">Chief Complaints</label>
            <textarea 
              id="chiefComplaints"
              name="chiefComplaints"
              value={assessment.chiefComplaints}
              onChange={handleChange}
              rows="3" 
            />
          </div>
        </div>

        <div className="form-row">
          <div className="input-group full-width">
            <label htmlFor="historyOfPresentIllness">History of Present Illness</label>
            <textarea 
              id="historyOfPresentIllness"
              name="historyOfPresentIllness"
              value={assessment.historyOfPresentIllness}
              onChange={handleChange}
              rows="3" 
            />
          </div>
        </div>

        <div className="form-row">
          <div className="input-group full-width">
            <label htmlFor="pastMedicalHistory">Past Medical History</label>
            <textarea 
              id="pastMedicalHistory"
              name="pastMedicalHistory"
              value={assessment.pastMedicalHistory}
              onChange={handleChange}
              rows="3" 
            />
          </div>
        </div>

        <div className="form-row">
          <div className="input-group full-width">
            <label htmlFor="medicationHistory">Medication History</label>
            <textarea 
              id="medicationHistory"
              name="medicationHistory"
              value={assessment.medicationHistory}
              onChange={handleChange}
              rows="3" 
            />
          </div>
        </div>

        <div className="form-row">
          <div className="input-group full-width">
            <label htmlFor="testResults">Test Results</label>
            <input 
              id="testResults"
              type="text" 
              name="testResults"
              value={assessment.testResults}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="input-group full-width">
            <label htmlFor="remindersAlerts">Reminder/Alerts</label>
            <input 
              id="remindersAlerts"
              type="text" 
              name="remindersAlerts"
              value={assessment.remindersAlerts}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="input-group full-width">
            <label htmlFor="planCare">Plan Care</label>
            <input 
              id="planCare"
              type="text" 
              name="planCare"
              value={assessment.planCare}
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

export default Assessment;