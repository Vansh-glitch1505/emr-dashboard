import React, { useState } from "react";
import { useSocialHistory } from "./SocialHistoryContext";
import "./SexualOrientation.css";

const SexualOrientation = () => {
  const { updateSexualOrientation } = useSocialHistory();
  const [formData, setFormData] = useState({
    orientation: "Heterosexual",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const orientationData = {
      orientation: formData.orientation,
      notes: formData.notes,
    };
    updateSexualOrientation(orientationData);
    alert('Sexual orientation saved successfully!');
  };

  return (
    <div className="sexual-orientation-panel">
      <div className="panel-header">
        <h3>Sexual Orientation</h3>
        <button className="close-btn">×</button>
      </div>

      <div className="form-group">
        <label>Sexual Orientation</label>
        <select 
          name="orientation" 
          value={formData.orientation} 
          onChange={handleChange}
        >
          <option>Heterosexual</option>
          <option>Homosexual</option>
          <option>Bisexual</option>
          <option>Pansexual</option>
          <option>Asexual</option>
          <option>Queer</option>
          <option>Questioning</option>
          <option>Other</option>
          <option>Prefer not to say</option>
        </select>
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

      <div className="orientation-buttons">
        <button className="save-btn" onClick={handleSave}>
          Save Orientation Data
        </button>
      </div>
    </div>
  );
};

export default SexualOrientation;