import React, { useState } from "react";
import { useSocialHistory } from "./SocialHistoryContext";
import "./SocialText.css";

const SocialText = ({ onClose }) => {
  const { updateSocialText } = useSocialHistory();
  const [formData, setFormData] = useState({
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const socialTextData = {
      notes: formData.notes
    };
    updateSocialText(socialTextData);
    console.log("Social text saved:", socialTextData);
    alert('Social History notes saved successfully!');
    onClose(); // close panel after saving
  };

  return (
    <div className="social-text-panel slide-in">
      <div className="panel-header">
        <h3>Social History (Free Text)</h3>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>

      <div className="form-group">
        <label>Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Enter any additional social history notes..."
          rows={5}
        />
      </div>

      <div className="social-text-buttons">
        <button className="save-btn" onClick={handleSave}>
          Save Notes
        </button>
        <button className="cancel-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SocialText;
