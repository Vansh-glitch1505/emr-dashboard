import React, { useState } from "react";
import "./Stress.css";

const Stress = () => {
  const [formData, setFormData] = useState({
    stressLevel: "Moderate",
    stressors: "",
    coping: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="stress-panel">
      <div className="panel-header">
        <h3>Stress</h3>
        <button className="close-btn">X</button>
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
        />
      </div>

      <div className="form-group">
        <label>Coping Mechanisms</label>
        <textarea
          name="coping"
          placeholder="e.g., Meditation, therapy, exercise..."
          value={formData.coping}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
        />
      </div>

      <div className="stress-buttons">
        <button>Add</button>
        <button>Cancel</button>
        <button className="save-btn">Save</button>
      </div>
    </div>
  );
};

export default Stress;
