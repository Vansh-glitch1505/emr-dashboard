import React, { useState } from "react";
import { useSocialHistory } from "./SocialHistoryContext";
import "./Stress.css";

const Stress = () => {
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
        <button className="close-btn">×</button>
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
        <button className="cancel-btn" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Stress;