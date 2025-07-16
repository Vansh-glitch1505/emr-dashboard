// src/pages/InsuranceInformation/InsuranceInformation.jsx
import React from "react";
import { useNavigate } from 'react-router-dom';
import "./InsuranceInformation.css";

const InsuranceInformation = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/dashboard/ailments');  // or the next section path
  };


  return (
    <div className="insurance-container">
      <h2>Insurance Information</h2>

      <fieldset className="insurance-section">
        <legend>Primary Insurance:</legend>
        <div className="form-group">
          <label>Insurance Company Name</label>
          <input type="text" />
        </div>
        <div className="form-row">
          <div>
            <label>Policy Number</label>
            <input type="text" />
          </div>
          <div>
            <label>Group Number</label>
            <input type="text" />
          </div>
        </div>
        <div className="form-row">
          <div>
            <label>Plan Type</label>
            <select>
              <option>Family Insurance</option>
              <option>Individual</option>
              <option>Employer</option>
            </select>
          </div>
          <div>
            <label>Insurance Effective Dates</label>
            <div className="date-pair">
              <input type="date" />
              <input type="date" />
            </div>
          </div>
        </div>
      </fieldset>

      <fieldset className="insurance-section">
        <legend>Secondary Insurance: <span className="optional-text">If Applicable</span></legend>
        <div className="form-group">
          <label>Insurance Company Name</label>
          <input type="text" />
        </div>
        <div className="form-row">
          <div>
            <label>Policy Number</label>
            <input type="text" />
          </div>
          <div>
            <label>Group Number</label>
            <input type="text" />
          </div>
        </div>
        <div className="form-row">
          <div>
            <label>Plan Type</label>
            <select>
              <option>Family</option>
              <option>Individual</option>
              <option>Employer</option>
            </select>
          </div>
          <div>
            <label>Insurance Effective Dates</label>
            <div className="date-pair">
              <input type="date" />
              <input type="date" />
            </div>
          </div>
        </div>
      </fieldset>

      <fieldset className="insurance-section">
        <legend>Insurance Contact Information:</legend>
        <div className="form-row">
          <div>
            <label>Contact Number</label>
            <input type="tel" />
          </div>
        </div>
        <div className="form-row">
          <div>
            <label>Insurance Card Images</label>
            <input type="file" />
          </div>
        </div>
      </fieldset>

      <div className="form-actions">
        <button className="save-btn">Save</button>
        <button className="next-btn" onClick={handleNext} >Next</button>
      </div>
    </div>
  );
};

export default InsuranceInformation;
