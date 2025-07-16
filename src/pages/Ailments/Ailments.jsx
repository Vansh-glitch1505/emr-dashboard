import React from "react";
import { useNavigate } from 'react-router-dom';
import "./Ailments.css";

const Ailments = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/dashboard/assessment');  // or the next section path
  };
  return (
    <div className="ailments-container">
      <h2 className="section-title">Ailments</h2>

      <div className="form-section">
        <div className="form-row">
          <div className="form-group">
            <label>Problem Name</label>
            <input type="text" placeholder="Enter problem name" />
          </div>
          <div className="form-group">
            <label>ICD Code</label>
            <input type="text" placeholder="Enter ICD code" />
          </div>
        </div>

        <div className="form-group full-width">
          <label>Description</label>
          <textarea rows="3" placeholder="Describe the problem" />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Status</label>
            <select>
              <option>Select</option>
              <option>Active</option>
              <option>Resolved</option>
            </select>
          </div>
          <div className="form-group">
            <label>Severity</label>
            <select>
              <option>Select</option>
              <option>Mild</option>
              <option>Moderate</option>
              <option>Severe</option>
            </select>
          </div>
          <div className="form-group">
            <label>Date of Onset</label>
            <input type="date" />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="subsection-title">Associated Factors</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Risk Factor</label>
            <input type="text" placeholder="Enter risk factor" />
          </div>
        </div>
        <div className="form-group full-width">
          <label>Comorbidities</label>
          <textarea rows="2" placeholder="List comorbidities" />
        </div>
        <div className="form-group full-width">
          <label>Medication Side Effects</label>
          <textarea rows="2" placeholder="Mention side effects" />
        </div>
        <div className="form-group full-width">
          <label>Treatment Plan</label>
          <textarea rows="3" placeholder="Mention treatment plan" />
        </div>
      </div>

      <div className="form-actions">
        <button className="save-btn">Save</button>
        <button className="next-btn" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default Ailments;