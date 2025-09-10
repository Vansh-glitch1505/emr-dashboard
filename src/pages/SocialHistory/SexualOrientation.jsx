import React, { useState } from "react";
import { useSocialHistory } from "./SocialHistoryContext";
import "./SexualOrientation.css";

const SexualOrientation = ({ onClose }) => {
  const { updateSexualOrientation } = useSocialHistory();
  const [formData, setFormData] = useState({
    orientation: "Heterosexual",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
        <button className="close-btn" onClick={handleClose}>×</button>
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