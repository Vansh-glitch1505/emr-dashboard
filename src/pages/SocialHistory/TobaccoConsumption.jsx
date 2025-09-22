import React, { useState, useEffect } from "react";
import { useSocialHistory } from "./SocialHistoryContext";
import "./TobaccoConsumption.css"; // Use the new CSS file

const TobaccoConsumption = ({ onClose }) => {
  const { socialHistoryData, updateSocialHistoryData } = useSocialHistory();
  
  const [formData, setFormData] = useState({
    status: "Never used",
    dailyConsumption: "",
    duration: "",
    durationUnit: "years",
    quitDate: "",
    notes: "",
  });

  useEffect(() => {
    if (socialHistoryData.tobaccoConsumption) {
      setFormData(socialHistoryData.tobaccoConsumption);
    }
  }, [socialHistoryData.tobaccoConsumption]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateSocialHistoryData({
      tobaccoConsumption: formData
    });
    onClose();
  };

  const handleCancel = () => {
    if (socialHistoryData.tobaccoConsumption) {
      setFormData(socialHistoryData.tobaccoConsumption);
    } else {
      setFormData({
        status: "Never used",
        dailyConsumption: "",
        duration: "",
        durationUnit: "years",
        quitDate: "",
        notes: "",
      });
    }
    onClose();
  };

  return (
    <div className="tobacco-consumption-panel">
      <div className="panel-header">
        <h3>Tobacco Consumption</h3>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
      
      <div className="form-group">
        <label>Status:</label>
        <select name="status" value={formData.status} onChange={handleInputChange}>
          <option value="Never used">Never used</option>
          <option value="Current user">Current user</option>
          <option value="Former user">Former user</option>
          <option value="Social user">Social user</option>
        </select>
      </div>

      {(formData.status === "Current user" || formData.status === "Former user" || formData.status === "Social user") && (
        <>
          <div className="form-group">
            <label>Daily Consumption (units per day):</label>
            <input
              type="number"
              name="dailyConsumption"
              value={formData.dailyConsumption}
              onChange={handleInputChange}
              placeholder="e.g., 5"
            />
          </div>

          <div className="form-group duration-group">
            <label>Duration:</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                placeholder="Duration"
              />
              <select name="durationUnit" value={formData.durationUnit} onChange={handleInputChange}>
                <option value="years">Years</option>
                <option value="months">Months</option>
              </select>
            </div>
          </div>

          {formData.status === "Former user" && (
            <div className="form-group">
              <label>Quit Date:</label>
              <input
                type="date"
                name="quitDate"
                value={formData.quitDate}
                onChange={handleInputChange}
              />
            </div>
          )}
        </>
      )}

      <div className="form-group">
        <label>Notes:</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          placeholder="Additional notes about tobacco consumption..."
        />
      </div>

      <div className="tobacco-consumption-buttons">
        <button onClick={handleSave} className="save-btn">Save</button>
      </div>
    </div>
  );
};

export default TobaccoConsumption;