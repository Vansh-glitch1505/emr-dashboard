import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from 'react-router-dom';
import "./InsuranceInformation.css";

const InsuranceInformation = () => {
  const navigate = useNavigate();
  const { insuranceData: contextInsuranceData, updatePreviewData } = useOutletContext();

  const [insuranceData, setInsuranceData] = useState({
    primaryCompanyName: '',
    primaryPolicyNumber: '',
    primaryGroupNumber: '',
    primaryPlanType: 'Family Insurance',
    primaryStartDate: '',
    primaryEndDate: '',
    secondaryCompanyName: '',
    secondaryPolicyNumber: '',
    secondaryGroupNumber: '',
    secondaryPlanType: 'Family',
    secondaryStartDate: '',
    secondaryEndDate: '',
    contactNumber: ''
  });

  // Load existing data from context if available
  useEffect(() => {
    if (contextInsuranceData && Object.keys(contextInsuranceData).length > 0) {
      setInsuranceData(contextInsuranceData);
    }
  }, [contextInsuranceData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInsuranceData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (e, dateType) => {
    setInsuranceData(prev => ({
      ...prev,
      [dateType]: e.target.value
    }));
  };

  const handleSave = async () => {
    try {
      // Save to preview context
      updatePreviewData(insuranceData, 'insurance');

      // Save to backend
      const res = await fetch("http://localhost:5000/api/insurance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...insuranceData, user_id: 1 })
      });

      const data = await res.json();
      if (res.ok) {
        alert("Insurance Information saved successfully!");
        console.log("Saved Insurance Data:", data);
      } else {
        alert("Failed to save Insurance Information: " + data.error);
      }
    } catch (error) {
      console.error("Error saving insurance info:", error);
      alert("An error occurred while saving insurance info.");
    }
  };

  const handleNext = () => {
    updatePreviewData(insuranceData, 'insurance');
    navigate('/dashboard/ailments');
  };

  return (
    <div className="insurance-container">
      <h2 className="insurance-title">Insurance Information</h2>

      {/* Primary Insurance */}
      <fieldset className="insurance-section">
        <legend className="section-title">Primary Insurance</legend>
        <div className="form-row">
          <div className="input-group full-width">
            <label htmlFor="primaryCompanyName">Insurance Company Name</label>
            <input
              id="primaryCompanyName"
              type="text"
              name="primaryCompanyName"
              value={insuranceData.primaryCompanyName}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="input-group">
            <label htmlFor="primaryPolicyNumber">Policy Number</label>
            <input
              id="primaryPolicyNumber"
              type="text"
              name="primaryPolicyNumber"
              value={insuranceData.primaryPolicyNumber}
              onChange={handleChange}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="primaryGroupNumber">Group Number</label>
            <input
              id="primaryGroupNumber"
              type="text"
              name="primaryGroupNumber"
              value={insuranceData.primaryGroupNumber}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="form-row aligned-row">
          <div className="input-group">
            <label htmlFor="primaryPlanType">Plan Type</label>
            <select
              id="primaryPlanType"
              name="primaryPlanType"
              value={insuranceData.primaryPlanType}
              onChange={handleChange}
            >
              <option value="Family Insurance">Family</option>
              <option value="Individual">Individual</option>
              <option value="Employer">Employer</option>
            </select>
          </div>
          
          <div className="input-group date-group">
            <div className="date-container">
              <div className="date-input-group">
                <label htmlFor="primaryStartDate" className="date-label">Start Date</label>
                <input
                  id="primaryStartDate"
                  type="date"
                  onChange={(e) => handleDateChange(e, 'primaryStartDate')}
                  value={insuranceData.primaryStartDate}
                  className="date-input"
                />
              </div>
              <div className="date-separator">to</div>
              <div className="date-input-group">
                <label htmlFor="primaryEndDate" className="date-label">End Date</label>
                <input
                  id="primaryEndDate"
                  type="date"
                  onChange={(e) => handleDateChange(e, 'primaryEndDate')}
                  value={insuranceData.primaryEndDate}
                  className="date-input"
                />
              </div>
            </div>
          </div>
        </div>
      </fieldset>

      {/* Secondary Insurance */}
      <fieldset className="insurance-section">
        <legend className="section-title">
          Secondary Insurance 
          <span className="optional-text"> (If Applicable)</span>
        </legend>
        <div className="form-row">
          <div className="input-group full-width">
            <label htmlFor="secondaryCompanyName">Insurance Company Name</label>
            <input
              id="secondaryCompanyName"
              type="text"
              name="secondaryCompanyName"
              value={insuranceData.secondaryCompanyName}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="input-group">
            <label htmlFor="secondaryPolicyNumber">Policy Number</label>
            <input
              id="secondaryPolicyNumber"
              type="text"
              name="secondaryPolicyNumber"
              value={insuranceData.secondaryPolicyNumber}
              onChange={handleChange}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="secondaryGroupNumber">Group Number</label>
            <input
              id="secondaryGroupNumber"
              type="text"
              name="secondaryGroupNumber"
              value={insuranceData.secondaryGroupNumber}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="form-row aligned-row">
          <div className="input-group">
            <label htmlFor="secondaryPlanType">Plan Type</label>
            <select
              id="secondaryPlanType"
              name="secondaryPlanType"
              value={insuranceData.secondaryPlanType}
              onChange={handleChange}
            >
              <option value="Family">Family</option>
              <option value="Individual">Individual</option>
              <option value="Employer">Employer</option>
            </select>
          </div>
          
          <div className="input-group date-group">
            <div className="date-container">
              <div className="date-input-group">
                <label htmlFor="secondaryStartDate" className="date-label">Start Date</label>
                <input
                  id="secondaryStartDate"
                  type="date"
                  onChange={(e) => handleDateChange(e, 'secondaryStartDate')}
                  value={insuranceData.secondaryStartDate}
                  className="date-input"
                />
              </div>
              <div className="date-separator">to</div>
              <div className="date-input-group">
                <label htmlFor="secondaryEndDate" className="date-label">End Date</label>
                <input
                  id="secondaryEndDate"
                  type="date"
                  onChange={(e) => handleDateChange(e, 'secondaryEndDate')}
                  value={insuranceData.secondaryEndDate}
                  className="date-input"
                />
              </div>
            </div>
          </div>
        </div>
      </fieldset>

      {/* Contact Info */}
      <fieldset className="insurance-section">
        <legend className="section-title">Insurance Contact Information</legend>
        <div className="form-row">
          <div className="input-group">
            <label htmlFor="contactNumber">Contact Number</label>
            <input
              id="contactNumber"
              type="tel"
              name="contactNumber"
              value={insuranceData.contactNumber}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="input-group full-width">
            <label htmlFor="insuranceCard">Insurance Card Images</label>
            <input 
              id="insuranceCard"
              type="file" 
            />
          </div>
        </div>
      </fieldset>

      {/* Buttons */}
      <div className="form-actions">
        <button className="save-btn" onClick={handleSave}>Save</button>
        <button className="next-btn" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default InsuranceInformation;
