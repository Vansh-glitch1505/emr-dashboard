import React, { useState } from "react";
import { useSocialHistory } from "./SocialHistoryContext";
import "./FinancialResources.css";

const FinancialResources = () => {
  const { updateFinancialResources, socialHistoryData } = useSocialHistory();
  const [formData, setFormData] = useState({
    incomeLevel: socialHistoryData?.financialResources?.incomeLevel || "Moderate",
    employmentStatus: socialHistoryData?.financialResources?.employmentStatus || "Employed",
    financialSupport: socialHistoryData?.financialResources?.financialSupport || "None",
    notes: socialHistoryData?.financialResources?.notes || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const financialData = {
      incomeLevel: formData.incomeLevel,
      employmentStatus: formData.employmentStatus,
      financialSupport: formData.financialSupport,
      notes: formData.notes
    };
    
    updateFinancialResources(financialData);
    console.log("Financial resources saved:", financialData);
    alert('Financial resources saved successfully!');
  };

  const handleCancel = () => {
    setFormData({
      incomeLevel: socialHistoryData?.financialResources?.incomeLevel || "Moderate",
      employmentStatus: socialHistoryData?.financialResources?.employmentStatus || "Employed",
      financialSupport: socialHistoryData?.financialResources?.financialSupport || "None",
      notes: socialHistoryData?.financialResources?.notes || "",
    });
  };

  return (
    <div className="financial-resources-panel">
      <div className="panel-header">
        <h3>Financial Resources</h3>
        <button className="close-btn">×</button>
      </div>

      <div className="form-group">
        <label>Income Level</label>
        <select 
          name="incomeLevel" 
          value={formData.incomeLevel} 
          onChange={handleChange}
        >
          <option>Low</option>
          <option>Moderate</option>
          <option>High</option>
        </select>
      </div>

      <div className="form-group">
        <label>Employment Status</label>
        <select 
          name="employmentStatus" 
          value={formData.employmentStatus} 
          onChange={handleChange}
        >
          <option>Employed</option>
          <option>Unemployed</option>
          <option>Student</option>
          <option>Retired</option>
        </select>
      </div>

      <div className="form-group">
        <label>Financial Support</label>
        <select 
          name="financialSupport" 
          value={formData.financialSupport} 
          onChange={handleChange}
        >
          <option>None</option>
          <option>Family</option>
          <option>Government</option>
          <option>Other</option>
        </select>
      </div>

      <div className="form-group">
        <label>Notes</label>
        <textarea 
          name="notes" 
          value={formData.notes} 
          onChange={handleChange}
          placeholder="Enter any additional financial information..."
          rows={4}
        />
      </div>

      <div className="financial-buttons">
        <button className="save-btn" onClick={handleSave}>
          Save Financial Data
        </button>
        <button className="cancel-btn" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default FinancialResources;