import React, { useState } from "react";
import { useSocialHistory } from "./SocialHistoryContext";
import "./PhysicalActivity.css";

const PhysicalActivity = () => {
  const { updatePhysicalActivity, socialHistoryData } = useSocialHistory();
  const [formData, setFormData] = useState({
    frequency: socialHistoryData?.physicalActivity?.frequency || "3 times/week",
    type: socialHistoryData?.physicalActivity?.type || "",
    duration: socialHistoryData?.physicalActivity?.duration || "30",
    durationUnit: socialHistoryData?.physicalActivity?.durationUnit || "min",
    consistency: socialHistoryData?.physicalActivity?.consistency || "Regular",
    notes: socialHistoryData?.physicalActivity?.notes || ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const activityData = {
      frequency: formData.frequency,
      type: formData.type,
      duration: formData.duration,
      durationUnit: formData.durationUnit,
      consistency: formData.consistency,
      notes: formData.notes
    };
    
    updatePhysicalActivity(activityData);
    console.log("Physical activity saved:", activityData);
    alert('Physical activity information saved successfully!');
  };

  const handleCancel = () => {
    setFormData({
      frequency: socialHistoryData?.physicalActivity?.frequency || "3 times/week",
      type: socialHistoryData?.physicalActivity?.type || "",
      duration: socialHistoryData?.physicalActivity?.duration || "30",
      durationUnit: socialHistoryData?.physicalActivity?.durationUnit || "min",
      consistency: socialHistoryData?.physicalActivity?.consistency || "Regular",
      notes: socialHistoryData?.physicalActivity?.notes || ""
    });
  };

  return (
    <div className="physical-activity-panel">
      <div className="panel-header">
        <h3>Physical Activity</h3>
        <button className="close-btn">×</button>
      </div>

      <div className="form-group">
        <label>Frequency</label>
        <select 
          name="frequency" 
          value={formData.frequency} 
          onChange={handleChange}
        >
          <option>1–2 times/week</option>
          <option>3 times/week</option>
          <option>5+ times/week</option>
          <option>Rarely</option>
        </select>
      </div>

      <div className="form-group">
        <label>Type of Exercise</label>
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
          placeholder="e.g., Running, Swimming, Yoga"
        />
      </div>

      <div className="form-group rowed">
        <label>Duration</label>
        <input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          min="1"
        />
        <select 
          name="durationUnit" 
          value={formData.durationUnit} 
          onChange={handleChange}
        >
          <option>min</option>
          <option>hr</option>
        </select>
      </div>

      <div className="form-group">
        <label>Consistency</label>
        <select 
          name="consistency" 
          value={formData.consistency} 
          onChange={handleChange}
        >
          <option>Regular</option>
          <option>Occasional</option>
          <option>Irregular</option>
        </select>
      </div>

      <div className="form-group">
        <label>Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Additional notes about physical activity..."
          rows={3}
        />
      </div>

      <div className="activity-buttons">
        <button className="save-btn" onClick={handleSave}>
          Save Activity Data
        </button>
        <button className="cancel-btn" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PhysicalActivity;