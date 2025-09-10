import React, { useState } from "react";
import { useSocialHistory } from "./SocialHistoryContext";
import "./TobaccoUse.css";

const TobaccoUse = ({ onClose }) => {
  const { updateTobaccoUse } = useSocialHistory();
  const [formData, setFormData] = useState({
    status: "Former Smoker",
    dailyConsumption: 10,
    duration: 10,
    durationUnit: "years",
    quitDate: "2020-06-01",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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


  const handleSave = () => {
    // Prepare the data structure exactly as we want to display it
    const tobaccoData = {
      status: formData.status,
      dailyConsumption: formData.dailyConsumption,
      duration: formData.duration,
      durationUnit: formData.durationUnit,
      quitDate: formData.quitDate,
      notes: formData.notes
    };
    
    updateTobaccoUse(tobaccoData);
    console.log("Tobacco data saved:", tobaccoData); // Debug log
    alert('Tobacco information saved successfully!');
  };

  return (
    <div className="tobacco-use-panel">
      <div className="panel-header">
        <h3>Tobacco Use</h3>
        <button className="close-btn" onClick={handleClose}>×</button>
      </div>

      <div className="form-group">
        <label>Current Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option>Current Smoker</option>
          <option>Former Smoker</option>
          <option>Never Smoked</option>
        </select>
      </div>

      <div className="form-group">
        <label>Average Daily Consumption</label>
        <input
          type="number"
          name="dailyConsumption"
          value={formData.dailyConsumption}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Duration of Use</label>
        <input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
        />
        <select name="durationUnit" value={formData.durationUnit} onChange={handleChange}>
          <option>months</option>
          <option>years</option>
        </select>
      </div>

      <div className="form-group">
        <label>Quit Date</label>
        <input
          type="date"
          name="quitDate"
          value={formData.quitDate}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Notes</label>
        <textarea name="notes" value={formData.notes} onChange={handleChange} />
      </div>

      <div className="tobacco-buttons">
        <button className="save-btn" onClick={handleSave}>
          Save Tobacco Data
        </button>
      </div>
    </div>
  );
};

export default TobaccoUse;