import React, { useState } from "react";
import { useSocialHistory } from "./SocialHistoryContext";
import "./Stress.css";

const Stress = ({ onClose }) => {
  const { updateStress, socialHistoryData } = useSocialHistory();
  const [formData, setFormData] = useState({
    stressLevel: socialHistoryData?.stress?.stressLevel || "Moderate",
    stressors: socialHistoryData?.stress?.stressors || "",
    coping: socialHistoryData?.stress?.coping || "",
    notes: socialHistoryData?.stress?.notes || ""
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
    const stressData = {
      stressLevel: formData.stressLevel,
      stressors: formData.stressors,
      coping: formData.coping,
      notes: formData.notes
    };
    
    updateStress(stressData);
    console.log("Stress data saved:", stressData);
    alert('Stress information saved successfully!');
  };

  const handleCancel = () => {
    setFormData({
      stressLevel: socialHistoryData?.stress?.stressLevel || "Moderate",
      stressors: socialHistoryData?.stress?.stressors || "",
      coping: socialHistoryData?.stress?.coping || "",
      notes: socialHistoryData?.stress?.notes || ""
    });
  };

  return (
    <div className="stress-panel">
      <div className="panel-header">
        <h3>Stress</h3>
        <button className="close-btn" onClick={handleClose}>×</button>
      </div>

      <div className="form-group">
        <label>Perceived Stress Level</label>
        <select
          name="stressLevel"
          value={formData.stressLevel}
          onChange={handleChange}
        >
          <option>Low</option>
          <option>Moderate</option>
          <option>High</option>
        </select>
      </div>

      <div className="form-group">
        <label>Major Stressors</label>
        <textarea
          name="stressors"
          placeholder="e.g., Work deadlines, family responsibilities..."
          value={formData.stressors}
          onChange={handleChange}
          rows={3}
        />
      </div>

      <div className="form-group">
        <label>Coping Mechanisms</label>
        <textarea
          name="coping"
          placeholder="e.g., Meditation, therapy, exercise..."
          value={formData.coping}
          onChange={handleChange}
          rows={3}
        />
      </div>

      <div className="form-group">
        <label>Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Additional notes about stress..."
          rows={3}
        />
      </div>

      <div className="stress-buttons">
        <button className="save-btn" onClick={handleSave}>
          Save Stress Data
        </button>
      </div>
    </div>
  );
};

export default Stress;