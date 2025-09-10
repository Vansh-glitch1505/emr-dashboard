import React, { useState } from "react";
import { useSocialHistory } from "./SocialHistoryContext";
import "./SocialIsolation.css";

const SocialIsolation = ({ onClose }) => {
  const { updateSocialIsolation, socialHistoryData } = useSocialHistory();
  const [formData, setFormData] = useState({
    isolationStatus: socialHistoryData?.socialIsolation?.isolationStatus || "Low",
    socialSupport: socialHistoryData?.socialIsolation?.socialSupport || "Supportive family",
    interactions: socialHistoryData?.socialIsolation?.interactions || "",
    notes: socialHistoryData?.socialIsolation?.notes || ""
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
    const isolationData = {
      isolationStatus: formData.isolationStatus,
      socialSupport: formData.socialSupport,
      interactions: formData.interactions,
      notes: formData.notes
    };
    
    updateSocialIsolation(isolationData);
    console.log("Social isolation data saved:", isolationData);
    alert('Social isolation information saved successfully!');
  };

  const handleCancel = () => {
    setFormData({
      isolationStatus: socialHistoryData?.socialIsolation?.isolationStatus || "Low",
      socialSupport: socialHistoryData?.socialIsolation?.socialSupport || "Supportive family",
      interactions: socialHistoryData?.socialIsolation?.interactions || "",
      notes: socialHistoryData?.socialIsolation?.notes || ""
    });
  };

  return (
    <div className="social-panel">
      <div className="panel-header">
        <h3>Social Isolation & Connection</h3>
        <button className="close-btn" onClick={handleClose}>×</button>
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
          rows={3}
        />
      </div>

      <div className="form-group">
        <label>Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Additional notes about social connections..."
          rows={3}
        />
      </div>

      <div className="social-buttons">
        <button className="save-btn" onClick={handleSave}>
          Save Social Data
        </button>
      </div>
    </div>
  );
};

export default SocialIsolation;