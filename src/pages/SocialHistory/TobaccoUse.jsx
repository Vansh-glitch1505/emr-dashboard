import React, { useState } from "react";
import "./TobaccoUse.css";

const TobaccoUse = () => {
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

  return (
    <div className="tobacco-use-panel">
      <div className="panel-header">
        <h3>Tobacco Use</h3>
        <button className="close-btn">X</button>
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
        <button>Add</button>
        <button>Cancel</button>
        <button className="save-btn">Save</button>
      </div>
    </div>
  );
};

export default TobaccoUse;
