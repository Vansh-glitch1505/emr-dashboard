import React, { useState } from "react";
import { useSocialHistory } from "./SocialHistoryContext";
import "./AlcoholUse.css";

const AlcoholUse = ({ onClose }) => {
  const { updateAlcoholUse } = useSocialHistory();
  const [formData, setFormData] = useState({
    status: "Moderate Drinker",
    weeklyConsumption: "",
    alcoholType: "Red wine",
    period: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const alcoholData = {
      status: formData.status,
      weeklyConsumption: formData.weeklyConsumption,
      alcoholType: formData.alcoholType,
      period: formData.period,
      notes: formData.notes
    };
    
    updateAlcoholUse(alcoholData);
    console.log("Alcohol data saved:", alcoholData);
    alert('Alcohol information saved successfully!');
  };

  const handleClose = () => {
    console.log("Close button clicked!"); // Debug log
    console.log("onClose prop:", onClose); // Check if onClose exists
    
    if (onClose) {
      console.log("Calling onClose function"); // Debug log
      onClose();
    } else {
      console.log("No onClose function provided!"); // Debug log
      alert("Close function not provided by parent component");
    }
  };

  return (
    <div className="alcohol-use-panel">
      <div className="panel-header">
        <h3>Alcohol Use</h3>
        <button className="close-btn" onClick={handleClose}>×</button>
      </div>

      <div className="form-group">
        <label>Current Status</label>
        <select 
          name="status" 
          value={formData.status} 
          onChange={handleChange}
        >
          <option>Non-Drinker</option>
          <option>Moderate Drinker</option>
          <option>Heavy Drinker</option>
        </select>
      </div>

      <div className="form-group">
        <label>Average Weekly Consumption (drinks)</label>
        <input
          type="number"
          name="weeklyConsumption"
          value={formData.weeklyConsumption}
          onChange={handleChange}
          placeholder="e.g., 5"
        />
      </div>

      <div className="form-group">
        <label>Type of Alcohol</label>
        <select 
          name="alcoholType" 
          value={formData.alcoholType} 
          onChange={handleChange}
        >
          <option>Beer</option>
          <option>Wine</option>
          <option>Liquor/Spirits</option>
          <option>Mixed Drinks</option>
          <option>Other</option>
        </select>
      </div>

      <div className="form-group">
        <label>Period of Use</label>
        <input
          type="text"
          name="period"
          value={formData.period}
          onChange={handleChange}
          placeholder="e.g., 2 years"
        />
      </div>

      <div className="form-group">
        <label>Notes</label>
        <textarea 
          name="notes" 
          value={formData.notes} 
          onChange={handleChange}
          placeholder="Additional notes..."
        />
      </div>

      <div className="alcohol-buttons">
        <button className="save-btn" onClick={handleSave}>
          Save Alcohol Data
        </button>
      </div>
    </div>
  );
};

export default AlcoholUse;