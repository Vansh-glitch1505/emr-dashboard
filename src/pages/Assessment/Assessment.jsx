import React from "react";
import { useNavigate } from 'react-router-dom';
import "./Assessment.css";

const Assessment = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/dashboard/medical-history');  // or the next section path
  };
  return (
    <div className="assessment-container">
      <h2>Assessment</h2>

      <div className="form-group">
        <label>Chief Complaints</label>
        <textarea rows="2" placeholder="Enter chief complaints" />
      </div>

      <div className="form-group">
        <label>History of Present Illness</label>
        <textarea rows="2" placeholder="Enter illness history" />
      </div>

      <div className="form-group">
        <label>Past Medical History</label>
        <textarea rows="2" placeholder="Enter past medical history" />
      </div>

      <div className="form-group">
        <label>Medication History</label>
        <textarea rows="2" placeholder="Enter medication history" />
      </div>

      <div className="form-group">
        <label>Tests Results</label>
        <input type="text" placeholder="Enter test results" />
      </div>

      <div className="form-group">
        <label>Reminder/ Alerts</label>
        <input type="text" placeholder="Enter reminders or alerts" />
      </div>

      <div className="form-group">
        <label>Plan Care</label>
        <input type="text" placeholder="Enter care plan" />
      </div>

      <div className="form-actions">
        <button className="save-btn">Save</button>
        <button className="next-btn" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default Assessment;
