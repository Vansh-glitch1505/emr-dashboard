import React, { useState } from "react";
import { useSocialHistory } from "./SocialHistoryContext";
import "./ExposureToViolence.css";

const ExposureToViolence = () => {
  const { updateExposureToViolence, socialHistoryData } = useSocialHistory();
  const [formData, setFormData] = useState({
    typeOfViolence: socialHistoryData?.exposureToViolence?.typeOfViolence || "",
    lastExposure: socialHistoryData?.exposureToViolence?.lastExposure || "",
    supportReceived: socialHistoryData?.exposureToViolence?.supportReceived || "",
    notes: socialHistoryData?.exposureToViolence?.notes || ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!formData.typeOfViolence) {
      alert('Please select a type of violence');
      return;
    }

    const violenceData = {
      typeOfViolence: formData.typeOfViolence,
      lastExposure: formData.lastExposure,
      supportReceived: formData.supportReceived,
      notes: formData.notes
    };
    
    updateExposureToViolence(violenceData);
    console.log("Violence exposure data saved:", violenceData);
    alert('Violence exposure information saved successfully!');
  };

  const handleCancel = () => {
    setFormData({
      typeOfViolence: socialHistoryData?.exposureToViolence?.typeOfViolence || "",
      lastExposure: socialHistoryData?.exposureToViolence?.lastExposure || "",
      supportReceived: socialHistoryData?.exposureToViolence?.supportReceived || "",
      notes: socialHistoryData?.exposureToViolence?.notes || ""
    });
  };

  return (
    <div className="violence-panel">
      <div className="panel-header">
        <h3>Exposure to Violence</h3>
        <button className="close-btn">×</button>
      </div>

      <div className="form-group">
        <label>Type of Violence</label>
        <select
          name="typeOfViolence"
          value={formData.typeOfViolence}
          onChange={handleChange}
          required
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
          rows={3}
        />
      </div>

      <div className="form-group">
        <label>Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Additional details about the exposure..."
          rows={3}
        />
      </div>

      <div className="violence-buttons">
        <button className="save-btn" onClick={handleSave}>
          Save Violence Data
        </button>
        <button className="cancel-btn" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ExposureToViolence;