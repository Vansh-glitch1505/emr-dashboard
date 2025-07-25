import React, { useState } from "react";
import "./ExposureToViolence.css";

const ExposureToViolence = () => {
  const [formData, setFormData] = useState({
    typeOfViolence: "",
    lastExposure: "",
    supportReceived: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="violence-panel">
      <div className="panel-header">
        <h3>Exposure to violence</h3>
        <button className="close-btn">X</button>
      </div>

      <div className="form-group">
        <label>Type of Violence</label>
        <select
          name="typeOfViolence"
          value={formData.typeOfViolence}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option>Domestic violence</option>
          <option>Community violence</option>
          <option>Sexual violence</option>
          <option>Emotional abuse</option>
          <option>Other</option>
        </select>
      </div>

      <div className="form-group">
        <label>Date of Last Exposure</label>
        <input
          type="date"
          name="lastExposure"
          value={formData.lastExposure}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Support or Intervention Received</label>
        <textarea
          name="supportReceived"
          placeholder="e.g., Counseling, legal support, shelter..."
          value={formData.supportReceived}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
        />
      </div>

      <div className="violence-buttons">
        <button>Add</button>
        <button>Cancel</button>
        <button className="save-btn">Save</button>
      </div>
    </div>
  );
};

export default ExposureToViolence;
