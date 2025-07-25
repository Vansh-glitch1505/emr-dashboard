import React, { useState } from "react";
import "./SexualOrientation.css";
 
const SexualOrientation = () => {
  const [formData, setFormData] = useState({
    identity: "Heterosexual",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="sexual-orientation-panel">
      <div className="panel-header">
        <h3>Sexual Orientation</h3>
        <button className="close-btn">X</button>
      </div>

      <div className="form-group">
        <label>Sexual Orientation</label>
        <select name="identity" value={formData.identity} onChange={handleChange}>
          <option>Heterosexual</option>
          <option>Homosexual</option>
          <option>Bisexual</option>
          <option>Pansexual</option>
          <option>Asexual</option>
          <option>Queer</option>
          <option>Questioning</option>
          <option>Other</option>
          <option>Prefer not to say</option>
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

      <div className="identity-buttons">
        <button>Add</button>
        <button>Cancel</button>
        <button className="save-btn">Save</button>
      </div>
    </div>
  );
};

export default SexualOrientation;
