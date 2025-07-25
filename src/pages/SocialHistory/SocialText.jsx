import React, { useState } from "react";
import "./SocialText.css";

const SocialText = () => {
  const [formData, setFormData] = useState({
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="gender-identity-panel">
      <div className="panel-header">
        <h3>Social History</h3>
        <button className="close-btn">X</button>
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

export default SocialText;
