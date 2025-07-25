import React, { useState } from "react";
import "./GenderIdentity.css";

const GenderIdentity = () => {
  const [formData, setFormData] = useState({
    identity: "Male",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="gender-identity-panel">
      <div className="panel-header">
        <h3>Gender identity</h3>
        <button className="close-btn">X</button>
      </div>

      <div className="form-group">
        <label>Gender Identity</label>
        <select name="identity" value={formData.identity} onChange={handleChange}>
          <option>Male</option>
          <option>Female</option>
          <option>Non-binary</option>
          <option>Transgender</option>
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

export default GenderIdentity;
