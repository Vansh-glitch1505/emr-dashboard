import React, { useState } from 'react';
import './MedicalHistory.css';

// ⬇️ Added onSave to props
export default function ConditionForm({ closeForm, onSave }) { 
  const [condition, setCondition] = useState('');
  const [diagnosisDate, setDiagnosisDate] = useState('');
  const [physician, setPhysician] = useState('');
  const [status, setStatus] = useState('');
  
  const [conditionList, setConditionList] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [savedData, setSavedData] = useState(null);

  const handleAdd = () => {
    if (condition || diagnosisDate || physician || status) {
      const newCondition = {
        id: Date.now(),
        condition,
        diagnosisDate,
        physician,
        status
      };
      
      setConditionList(prev => [...prev, newCondition]);
      
      // Clear form after adding
      setCondition('');
      setDiagnosisDate('');
      setPhysician('');
      setStatus('');
    }
  };

  const handleSave = () => {
    let finalList = [...conditionList];

    // If there's current form data, add it before saving
    if (condition || diagnosisDate || physician || status) {
      const newItem = {
        id: Date.now(),
        condition,
        diagnosisDate,
        physician,
        status
      };
      finalList.push(newItem);
    }

    setSavedData(finalList);
    setShowPreview(true);

    // ⬇️ NEW: Pass data to parent
    if (onSave) {
      onSave(finalList);
    }

    console.log("Saved conditions:", finalList);
  };

  const handleEdit = () => {
    setShowPreview(false);
  };

  const removeCondition = (id) => {
    setConditionList(prev => prev.filter(item => item.id !== id));
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (showPreview) {
    return (
      <div className="right-panel">
        <div className="form-header">
          <h2 className="form-title">Conditions Preview</h2>
          <button className="close-btn" onClick={closeForm}>×</button>
        </div>

        <div className="preview-container">
          {savedData && savedData.length > 0 ? (
            savedData.map((conditionItem, index) => (
              <div key={conditionItem.id} className="immunization-preview-item">
                <h4>Condition {index + 1}</h4>
                <ul className="preview-list">
                  <li><strong>Condition:</strong> {conditionItem.condition}</li>
                  <li><strong>Diagnosis Date:</strong> {formatDate(conditionItem.diagnosisDate)}</li>
                  <li><strong>Treating Physician:</strong> {conditionItem.physician}</li>
                  <li><strong>Current Status:</strong> {conditionItem.status}</li>
                </ul>
              </div>
            ))
          ) : (
            <p>No conditions added.</p>
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
        <h2 className="form-title">Conditions</h2>
        <button className="close-btn" onClick={closeForm}>×</button>
      </div>

      {/* Show added conditions list */}
      {conditionList.length > 0 && (
        <div className="added-immunizations">
          <h3>Added Conditions:</h3>
          {conditionList.map((conditionItem, index) => (
            <div key={conditionItem.id} className="immunization-item">
              <div className="immunization-details">
                <strong>{conditionItem.condition}</strong> - {formatDate(conditionItem.diagnosisDate)}
                {conditionItem.physician && (
                  <span className="reaction-note"> (Physician: {conditionItem.physician})</span>
                )}
                {conditionItem.status && (
                  <div className="reaction-note">Status: {conditionItem.status}</div>
                )}
              </div>
              <button 
                className="remove-btn" 
                onClick={() => removeCondition(conditionItem.id)}
                title="Remove condition"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="form-group">
        <label>Condition</label>
        <input 
          type="text" 
          value={condition} 
          onChange={(e) => setCondition(e.target.value)}
          placeholder="e.g. Hypertension"
        />
      </div>

      <div className="form-group">
        <label>Diagnosis Date</label>
        <input 
          type="date" 
          value={diagnosisDate} 
          onChange={(e) => setDiagnosisDate(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Treating Physician</label>
        <input 
          type="text" 
          value={physician} 
          onChange={(e) => setPhysician(e.target.value)}
          placeholder="e.g. Dr. Johnson"
        />
      </div>

      <div className="form-group">
        <label>Current Status</label>
        <input 
          type="text" 
          value={status} 
          onChange={(e) => setStatus(e.target.value)}
          placeholder="e.g. Managed, Resolved, Ongoing"
        />
      </div>

      <div className="button-group-right">
        <button type="button" onClick={handleAdd}>Add</button>
        <button type="submit" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}