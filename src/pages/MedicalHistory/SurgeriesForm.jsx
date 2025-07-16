import React, { useState } from "react";
import "./MedicalHistory.css"; // Reuse the same CSS file

const SurgeriesForm = ({ onClose }) => {
  const [surgeryType, setSurgeryType] = useState("");
  const [surgeryDate, setSurgeryDate] = useState("");
  const [surgeonName, setSurgeonName] = useState("");
  const [postOpNotes, setPostOpNotes] = useState("");

  const handleSave = () => {
    // handle save logic (e.g., send to backend or context)
    console.log({
      surgeryType,
      surgeryDate,
      surgeonName,
      postOpNotes,
    });
    onClose();
  };

  return (
    <div className="slide-panel">
      <div className="panel-header">
        <h2>Surgeries</h2>
        <span className="close-btn" onClick={onClose}>✕</span>
      </div>

      <div className="form-content">
        <label>Surgery Type</label>
        <input
          type="text"
          value={surgeryType}
          onChange={(e) => setSurgeryType(e.target.value)}
        />

        <label>Surgery Date</label>
        <input
          type="text"
          value={surgeryDate}
          onChange={(e) => setSurgeryDate(e.target.value)}
        />

        <label>Surgeon Name</label>
        <input
          type="text"
          value={surgeonName}
          onChange={(e) => setSurgeonName(e.target.value)}
        />

        <label>Post-operative Notes</label>
        <textarea
          value={postOpNotes}
          onChange={(e) => setPostOpNotes(e.target.value)}
        />

        <div className="button-group">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default SurgeriesForm;
