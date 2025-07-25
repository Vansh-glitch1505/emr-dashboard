import React, { useState } from "react";
import "./AlcoholUse.css";

const AlcoholUse = () => {
  const [formData, setFormData] = useState({
    status: "Moderate Drinker",
    weeklyConsumption: "02",
    alcoholType: "Red wine",
    period: "5 years",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="alcohol-use-panel">
      <div className="panel-header">
        <h3>Alcohol use</h3>
        <button className="close-btn">X</button>
      </div>

      <div className="form-group">
        <label>Current Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option>Non-Drinker</option>
          <option>Moderate Drinker</option>
          <option>Heavy Drinker</option>
        </select>
      </div>

      <div className="form-group">
        <label>Average Weekly Consumption</label>
        <input
          type="text"
          name="weeklyConsumption"
          value={formData.weeklyConsumption}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Type of Alcohol</label>
        <select name="alcoholType" value={formData.alcoholType} onChange={handleChange}>
          <option>Beer</option>
          <option>Wine</option>
          <option>Red wine</option>
          <option>Whiskey</option>
          <option>Vodka</option>
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
        />
      </div>

      <div className="form-group">
        <label>Notes</label>
        <textarea name="notes" value={formData.notes} onChange={handleChange} />
      </div>

      <div className="alcohol-buttons">
        <button>Add</button>
        <button>Cancel</button>
        <button className="save-btn">Save</button>
      </div>
    </div>
  );
};

export default AlcoholUse;
