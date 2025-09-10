import React, { useState } from "react";
import { useSocialHistory } from "./SocialHistoryContext";
import "./GenderIdentity.css";

const GenderIdentity = ({ onClose }) => {
  const { updateGenderIdentity } = useSocialHistory();
  const [formData, setFormData] = useState({
    identity: "Male",
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
    const genderData = {
      identity: formData.identity,
      notes: formData.notes,
    };
    updateGenderIdentity(genderData);
    alert('Gender identity saved successfully!');
  };

  return (
    <div className="gender-identity-panel">
      <div className="panel-header">
        <h3>Gender Identity</h3>
        <button className="close-btn" onClick={handleClose}>×</button>
      </div>

      <div className="form-group">
        <label>Gender Identity</label>
        <select 
          name="identity" 
          value={formData.identity} 
          onChange={handleChange}
        >
          <option>Male</option>
          <option>Female</option>
          <option>Non-binary</option>
          <option>Transgender</option>
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

      <div className="identity-buttons">
        <button className="save-btn" onClick={handleSave}>
          Save Gender Data
        </button>
      </div>
    </div>
  );
};

export default GenderIdentity;