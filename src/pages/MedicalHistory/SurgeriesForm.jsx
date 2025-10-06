import React, { useState } from "react";
import "./MedicalHistory.css";

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
      setSurgeryType('');
      setSurgeryDate('');
      setSurgeonName('');
      setPostOpNotes('');
    } else {
      alert('Please fill in at least one field');
    }
  };

  const handleSave = async () => {
    try {
      const patientId = localStorage.getItem('currentPatientId');
      
      if (!patientId) {
        alert("Please complete Patient Demographics first");
        return;
      }

      let finalList = [...surgeryList];
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

      if (finalList.length === 0) {
        alert('Please add at least one surgery');
        return;
      }

      const response = await fetch('http://localhost:5000/api/medical-history/surgeries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patient_id: patientId,
          surgeries: finalList
        })
      });

      if (response.ok) {
        const result = await response.json();
        setSavedData(finalList);
        setShowPreview(true);
        if (onSave) onSave(finalList);
        alert("Surgeries saved successfully!");
        console.log("Saved surgeries:", result);
      } else {
        const errorData = await response.json();
        alert(`Failed to save surgeries: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error saving surgeries:", error);
      alert(`Error saving surgeries: ${error.message}`);
    }
  };

  const handleEdit = () => setShowPreview(false);

  const removeSurgery = (id) => {
    setSurgeryList(prev => prev.filter(item => item.id !== id));
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
                  <li><strong>Surgeon Name:</strong> {surgery.surgeonName || 'Not specified'}</li>
                  <li><strong>Post-operative Notes:</strong> {surgery.postOpNotes || 'None'}</li>
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

      {surgeryList.length > 0 && (
        <div className="added-immunizations">
          <h3>Added Surgeries:</h3>
          {surgeryList.map((surgery) => (
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
        <select
          value={surgeryType}
          onChange={(e) => setSurgeryType(e.target.value)}
        >
          <option value="">-- Select Surgery Type --</option>
          <option value="Cardiothoracic Surgery">Cardiothoracic Surgery</option>
          <option value="Orthopedic Surgery">Orthopedic Surgery</option>
          <option value="Neurosurgery">Neurosurgery</option>
          <option value="General Surgery">General Surgery</option>
          <option value="Plastic and Reconstructive Surgery">Plastic and Reconstructive Surgery</option>
          <option value="Pediatric Surgery">Pediatric Surgery</option>
          <option value="Vascular Surgery">Vascular Surgery</option>
          <option value="Urological Surgery">Urological Surgery</option>
          <option value="Gynecological Surgery">Gynecological Surgery</option>
          <option value="ENT Surgery">ENT (Ear, Nose, Throat) Surgery</option>
          <option value="Ophthalmic Surgery">Ophthalmic Surgery (Eye Surgery)</option>
          <option value="Oral and Maxillofacial Surgery">Oral and Maxillofacial Surgery</option>
          <option value="Transplant Surgery">Transplant Surgery</option>
          <option value="Bariatric Surgery">Bariatric Surgery (Weight Loss Surgery)</option>
          <option value="Cosmetic Surgery">Cosmetic Surgery</option>
          <option value="Oncological Surgery">Oncological Surgery (Cancer Surgery)</option>
          <option value="Endoscopic Surgery">Endoscopic Surgery</option>
          <option value="Minimally Invasive Surgery">Minimally Invasive Surgery</option>
          <option value="Trauma Surgery">Trauma Surgery</option>
          <option value="Emergency Surgery">Emergency Surgery</option>
          <option value="Colorectal Surgery">Colorectal Surgery</option>
          <option value="Hernia Repair Surgery">Hernia Repair Surgery</option>
          <option value="Thoracic Surgery">Thoracic Surgery (Chest Surgery)</option>
          <option value="Laparoscopic Surgery">Laparoscopic Surgery</option>
          <option value="Spinal Surgery">Spinal Surgery</option>
          <option value="Other">Other</option>
        </select>
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
          rows="4"
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