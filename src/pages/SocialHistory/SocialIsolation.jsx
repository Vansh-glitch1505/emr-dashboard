import React, { useState } from "react";
import "./SocialIsolation.css";

const SocialIsolation = () => {
  const [formData, setFormData] = useState({
    isolationStatus: "Low",
    socialSupport: "Supportive family",
    interactions: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="social-panel">
      <div className="panel-header">
        <h3>Social isolation & connection</h3>
        <button className="close-btn">X</button>
      </div>

      <div className="form-group">
        <label>Isolation Status</label>
        <select
          name="isolationStatus"
          value={formData.isolationStatus}
          onChange={handleChange}
        >
          <option>Low</option>
          <option>Moderate</option>
          <option>High</option>
        </select>
      </div>

      <div className="form-group">
        <label>Social Support</label>
        <select
          name="socialSupport"
          value={formData.socialSupport}
          onChange={handleChange}
        >
          <option>Supportive family</option>
          <option>Friends</option>
          <option>Community groups</option>
          <option>Minimal support</option>
          <option>None</option>
        </select>
      </div>

      <div className="form-group">
        <label>Frequency of Social Interactions</label>
        <textarea
          name="interactions"
          placeholder="e.g., Weekly calls, monthly visits, daily chats..."
          value={formData.interactions}
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

      <div className="social-buttons">
        <button>Add</button>
        <button>Cancel</button>
        <button className="save-btn">Save</button>
      </div>
    </div>
  );
};

export default SocialIsolation;
