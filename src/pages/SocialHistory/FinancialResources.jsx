import React, { useState } from "react";
import "./FinancialResources.css";

const FinancialResources = () => {
  const [formData, setFormData] = useState({
    incomeLevel: "Moderate",
    employmentStatus: "Employed",
    financialSupport: "None",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="financial-resources-panel">
      <div className="panel-header">
        <h3>Financial Resources</h3>
        <button className="close-btn">X</button>
      </div>

      <div className="form-group">
        <label>Income Level</label>
        <select name="incomeLevel" value={formData.incomeLevel} onChange={handleChange}>
          <option>Low</option>
          <option>Moderate</option>
          <option>High</option>
        </select>
      </div>

      <div className="form-group">
        <label>Employment Status:</label>
        <select name="employmentStatus" value={formData.employmentStatus} onChange={handleChange}>
          <option>Employed</option>
          <option>Unemployed</option>
          <option>Student</option>
          <option>Retired</option>
        </select>
      </div>

      <div className="form-group">
        <label>Financial Support</label>
        <select name="financialSupport" value={formData.financialSupport} onChange={handleChange}>
          <option>None</option>
          <option>Family</option>
          <option>Government</option>
          <option>Other</option>
        </select>
      </div>

      <div className="form-group">
        <label>Notes</label>
        <textarea name="notes" value={formData.notes} onChange={handleChange} />
      </div>

      <div className="financial-buttons">
        <button>Add</button>
        <button>Cancel</button>
        <button className="save-btn">Save</button>
      </div>
    </div>
  );
};

export default FinancialResources;
