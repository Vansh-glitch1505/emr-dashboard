import React, { useState } from "react";
import { useSocialHistory } from "./SocialHistoryContext";
import "./NutrientsHistory.css";

const NutrientsHistory = () => {
  const { updateNutrientsHistory, socialHistoryData } = useSocialHistory();
  const [formData, setFormData] = useState({
    dietaryPreferences: socialHistoryData?.nutrientsHistory?.dietaryPreferences || "",
    supplementUsage: socialHistoryData?.nutrientsHistory?.supplementUsage || "",
    notes: socialHistoryData?.nutrientsHistory?.notes || ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const nutrientsData = {
      dietaryPreferences: formData.dietaryPreferences,
      supplementUsage: formData.supplementUsage,
      notes: formData.notes
    };
    
    updateNutrientsHistory(nutrientsData);
    console.log("Nutrients history saved:", nutrientsData);
    alert('Nutrients history saved successfully!');
  };

  const handleCancel = () => {
    setFormData({
      dietaryPreferences: socialHistoryData?.nutrientsHistory?.dietaryPreferences || "",
      supplementUsage: socialHistoryData?.nutrientsHistory?.supplementUsage || "",
      notes: socialHistoryData?.nutrientsHistory?.notes || ""
    });
  };

  return (
    <div className="nutrients-panel">
      <div className="panel-header">
        <h3>Nutrients History</h3>
        <button className="close-btn">×</button>
      </div>

      <div className="form-group">
        <label>Dietary Preferences</label>
        <textarea
          name="dietaryPreferences"
          placeholder="e.g., Vegetarian, Vegan, Keto, Gluten-free, etc."
          value={formData.dietaryPreferences}
          onChange={handleChange}
          rows={3}
        />
      </div>

      <div className="form-group">
        <label>Supplement Usage</label>
        <select
          name="supplementUsage"
          value={formData.supplementUsage}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="Occasionally">Occasionally</option>
        </select>
      </div>

      <div className="form-group">
        <label>Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Additional notes about nutrition and supplements..."
          rows={3}
        />
      </div>

      <div className="nutrients-buttons">
        <button className="save-btn" onClick={handleSave}>
          Save Nutrients Data
        </button>
        <button className="cancel-btn" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default NutrientsHistory;