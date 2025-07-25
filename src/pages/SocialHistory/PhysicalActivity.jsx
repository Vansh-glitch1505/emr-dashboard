import React, { useState } from "react";
import "./PhysicalActivity.css";

const PhysicalActivity = () => {
  const [formData, setFormData] = useState({
    frequency: "3 times/week",
    type: "",
    duration: "30",
    //durationUnit: "min",
    consistency: "Regular",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="physical-activity-panel">
      <div className="panel-header">
        <h3>Physical activity</h3>
        <button className="close-btn">X</button>
      </div>

      <div className="form-group">
        <label>Frequency</label>
        <select name="frequency" value={formData.frequency} onChange={handleChange}>
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
        />
      </div>

      <div className="form-group rowed">
        <label>Duration</label>
        <input
          type="text"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
        />
        <select name="durationUnit" value={formData.durationUnit} onChange={handleChange}>
          <option>min</option>
          <option>hr</option>
        </select>
      </div>

      <div className="form-group">
        <label>Consistency:</label>
        <select name="consistency" value={formData.consistency} onChange={handleChange}>
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
        />
      </div>

      <div className="activity-buttons">
        <button>Add</button>
        <button>Cancel</button>
        <button className="save-btn">Save</button>
      </div>
    </div>
  );
};

export default PhysicalActivity;
