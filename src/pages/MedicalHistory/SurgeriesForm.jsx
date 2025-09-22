import React, { useState } from "react";
import "./MedicalHistory.css"; // Reuse the same CSS file

// ⬇️ Added onSave to props
const SurgeriesForm = ({ closeForm, onSave }) => {
  const [surgeryType, setSurgeryType] = useState("");
  const [surgeryDate, setSurgeryDate] = useState("");
  const [surgeonName, setSurgeonName] = useState("");
  const [postOpNotes, setPostOpNotes] = useState("");
  
  const [surgeryList, setSurgeryList] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [savedData, setSavedData] = useState(null);

  const handleAdd = () => {
    if (surgeryType || surgeryDate || surgeonName || postOpNotes) {
      const newSurgery = {
        id: Date.now(),
        surgeryType,
        surgeryDate,
        surgeonName,
        postOpNotes
      };
      
      setSurgeryList(prev => [...prev, newSurgery]);
      
      // Clear form after adding
      setSurgeryType('');
      setSurgeryDate('');
      setSurgeonName('');
      setPostOpNotes('');
    }
  };

  const handleSave = () => {
    let finalList = [...surgeryList];

    // If there's current form data, add it before saving
    if (surgeryType || surgeryDate || surgeonName || postOpNotes) {
      const newItem = {
        id: Date.now(),
        surgeryType,
        surgeryDate,
        surgeonName,
        postOpNotes
      };
      finalList.push(newItem);
    }

    setSavedData(finalList);
    setShowPreview(true);

    // ⬇️ NEW: Pass data to parent
    if (onSave) {
      onSave(finalList);
    }

    console.log("Saved surgeries:", finalList);
  };

  const handleEdit = () => {
    setShowPreview(false);
  };

  const removeSurgery = (id) => {
    setSurgeryList(prev => prev.filter(item => item.id !== id));
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    if (dateString.includes('/') || dateString.includes('-')) {
      return dateString;
    }
    return dateString;
  };

  if (showPreview) {
    return (
      <div className="right-panel">
        <div className="form-header">
          <h2 className="form-title">Surgeries Preview</h2>
          <button className="close-btn" onClick={closeForm}>×</button>
        </div>

        <div className="preview-container">
          {savedData && savedData.length > 0 ? (
            savedData.map((surgery, index) => (
              <div key={surgery.id} className="immunization-preview-item">
                <h4>Surgery {index + 1}</h4>
                <ul className="preview-list">
                  <li><strong>Surgery Type:</strong> {surgery.surgeryType}</li>
                  <li><strong>Surgery Date:</strong> {formatDate(surgery.surgeryDate)}</li>
                  <li><strong>Surgeon Name:</strong> {surgery.surgeonName}</li>
                  <li><strong>Post-operative Notes:</strong> {surgery.postOpNotes}</li>
                </ul>
              </div>
            ))
          ) : (
            <p>No surgeries added.</p>
          )}
        </div>

        <div className="button-group-right">
          <button onClick={handleEdit}>Edit</button>
          <button onClick={closeForm}>Done</button>
        </div>
      </div>
    );
  }

  return (
    <div className="right-panel">
      <div className="form-header">
        <h2 className="form-title">Surgeries</h2>
        <button className="close-btn" onClick={closeForm}>×</button>
      </div>

      {/* Show added surgeries list */}
      {surgeryList.length > 0 && (
        <div className="added-immunizations">
          <h3>Added Surgeries:</h3>
          {surgeryList.map((surgery, index) => (
            <div key={surgery.id} className="immunization-item">
              <div className="immunization-details">
                <strong>{surgery.surgeryType}</strong> - {formatDate(surgery.surgeryDate)}
                {surgery.surgeonName && (
                  <span className="reaction-note"> (Surgeon: {surgery.surgeonName})</span>
                )}
                {surgery.postOpNotes && (
                  <div className="reaction-note">Notes: {surgery.postOpNotes}</div>
                )}
              </div>
              <button 
                className="remove-btn" 
                onClick={() => removeSurgery(surgery.id)}
                title="Remove surgery"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="form-group">
        <label>Surgery Type</label>
        <input
          type="text"
          value={surgeryType}
          onChange={(e) => setSurgeryType(e.target.value)}
          placeholder="e.g. Appendectomy"
        />
      </div>

      <div className="form-group">
        <label>Surgery Date</label>
        <input
          type="date"
          value={surgeryDate}
          onChange={(e) => setSurgeryDate(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Surgeon Name</label>
        <input
          type="text"
          value={surgeonName}
          onChange={(e) => setSurgeonName(e.target.value)}
          placeholder="e.g. Dr. Smith"
        />
      </div>

      <div className="form-group">
        <label>Post-operative Notes</label>
        <textarea
          value={postOpNotes}
          onChange={(e) => setPostOpNotes(e.target.value)}
          placeholder="e.g. Recovery went well, no complications"
        />
      </div>

      <div className="button-group-right">
        <button type="button" onClick={handleAdd}>Add</button>
        <button type="submit" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default SurgeriesForm;