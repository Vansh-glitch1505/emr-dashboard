import React, { useState } from "react";
import "./NutrientsHistory.css";

const NutrientsHistory = () => {
  const [formData, setFormData] = useState({
    dietaryPreferences: "",
    supplementUsage: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="nutrients-panel">
      <div className="panel-header">
        <h3>Nutrients History</h3>
        <button className="close-btn">X</button>
      </div>

      <div className="form-group">
        <label>Dietary Preferences</label>
        <textarea
          name="dietaryPreferences"
          placeholder="e.g., Vegetarian, Vegan, Keto, etc."
          value={formData.dietaryPreferences}
          onChange={handleChange}
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
        />
      </div>

      <div className="nutrients-buttons">
        <button>Add</button>
        <button>Cancel</button>
        <button className="save-btn">Save</button>
      </div>
    </div>
  );
};

export default NutrientsHistory;
