import React, { useState } from "react";
import "./MedicalHistory.css"; // Reuse the same CSS file

const SurgeriesForm = ({ closeForm }) => {
  const [surgeryType, setSurgeryType] = useState("");
  const [surgeryDate, setSurgeryDate] = useState("");
  const [surgeonName, setSurgeonName] = useState("");
  const [postOpNotes, setPostOpNotes] = useState("");
  
  const [showPreview, setShowPreview] = useState(false);
  const [savedData, setSavedData] = useState(null);

  const handleSave = () => {
    // Save the data and show preview
    const formData = {
      surgeryType,
      surgeryDate,
      surgeonName,
      postOpNotes,
    };
    setSavedData(formData);
    setShowPreview(true);
    console.log(formData);
  };

  const handleEdit = () => {
    setShowPreview(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    // If it's already a formatted date, return as is
    if (dateString.includes('/') || dateString.includes('-')) {
      return dateString;
    }
    return dateString;
  };

  if (showPreview && savedData) {
    return (
      <div className="slide-panel">
        <div className="panel-header">
          <h2>Surgery Preview</h2>
          <span className="close-btn" onClick={closeForm}>✕</span> {/* fixed here */}
        </div>

        <div className="form-content">
          <div className="preview-container">
            <ul className="preview-list">
              <li><strong>Surgery Type:</strong> {savedData.surgeryType}</li>
              <li><strong>Surgery Date:</strong> {formatDate(savedData.surgeryDate)}</li>
              <li><strong>Surgeon Name:</strong> {savedData.surgeonName}</li>
              <li><strong>Post-operative Notes:</strong> {savedData.postOpNotes}</li>
            </ul>
          </div>

          <div className="button-group-right">
            <button onClick={handleEdit}>Edit</button>
            <button onClick={closeForm}>Done</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="slide-panel">
      <div className="panel-header">
        <h2>Surgeries</h2>
        <span className="close-btn" onClick={closeForm}>✕</span> {/* fixed here */}
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

        <div className="button-group-right">
          <button onClick={closeForm}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default SurgeriesForm;
