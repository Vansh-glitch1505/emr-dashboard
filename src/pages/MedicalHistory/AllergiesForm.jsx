import React, { useState } from 'react';
import './MedicalHistory.css';

export default function AllergiesForm({ closeForm, onSave }) {
  const [allergyType, setAllergyType] = useState('');
  const [substance, setSubstance] = useState('');
  const [severity, setSeverity] = useState('');

  const [allergyList, setAllergyList] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [savedData, setSavedData] = useState(null);

  const allergyTypes = [
    'Medication Allergy', 'Food Allergy', 'Environmental Allergy',
    'Insect Sting Allergy', 'Latex Allergy', 'Animal Allergy',
    'Pollen Allergy', 'Mold Allergy', 'Dust Allergy', 'Other'
  ];

  const allergicSubstances = [
    'Penicillin', 'Sulfa Drugs', 'Aspirin', 'Shellfish', 'Nuts',
    'Eggs', 'Milk', 'Wheat', 'Soy', 'Pollen', 'Dust Mites',
    'Latex', 'Nickel', 'Pet Dander', 'Bee Venom', 'Mold',
    'Certain Medications', 'Other'
  ];

  const severityLevels = ['Mild', 'Moderate', 'Severe', 'Critical', 'Unknown'];

  const handleAdd = () => {
    if (allergyType || substance || severity) {
      const newAllergy = {
        id: Date.now(),
        allergyType,
        substance,
        severity
      };
      setAllergyList(prev => [...prev, newAllergy]);
      setAllergyType('');
      setSubstance('');
      setSeverity('');
    }
  };

  const handleSave = async () => {
    try {
      const patientId = localStorage.getItem('currentPatientId');
      
      if (!patientId) {
        alert("Please complete Patient Demographics first");
        return;
      }

      let finalList = [...allergyList];
      if (allergyType || substance || severity) {
        finalList.push({ id: Date.now(), allergyType, substance, severity });
      }

      const response = await fetch('http://localhost:5000/api/medical-history/allergies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patient_id: patientId,
          allergies: finalList
        })
      });

      if (response.ok) {
        const result = await response.json();
        setSavedData(finalList);
        setShowPreview(true);
        if (onSave) onSave(finalList);
        alert("Allergies saved successfully!");
        console.log("Saved allergies:", result);
      } else {
        const errorData = await response.json();
        alert(`Failed to save allergies: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error saving allergies:", error);
      alert("Error saving allergies.");
    }
  };

  const handleEdit = () => setShowPreview(false);

  const removeAllergy = (id) => setAllergyList(prev => prev.filter(item => item.id !== id));

  if (showPreview) {
    return (
      <div className="right-panel">
        <div className="form-header">
          <h2 className="form-title">Allergies Preview</h2>
          <button className="close-btn" onClick={closeForm}>×</button>
        </div>

        <div className="preview-container">
          {savedData && savedData.length > 0 ? (
            savedData.map((allergy, index) => (
              <div key={allergy.id} className="immunization-preview-item">
                <h4>Allergy {index + 1}</h4>
                <ul className="preview-list">
                  <li><strong>Allergy Type:</strong> {allergy.allergyType}</li>
                  <li><strong>Allergic Substance:</strong> {allergy.substance}</li>
                  <li><strong>Severity:</strong> {allergy.severity}</li>
                </ul>
              </div>
            ))
          ) : <p>No allergies added.</p>}
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
        <h2 className="form-title">Allergies</h2>
        <button className="close-btn" onClick={closeForm}>×</button>
      </div>

      {allergyList.length > 0 && (
        <div className="added-immunizations">
          <h3>Added Allergies:</h3>
          {allergyList.map((allergy) => (
            <div key={allergy.id} className="immunization-item">
              <div className="immunization-details">
                <strong>{allergy.allergyType}</strong> - {allergy.substance}
                {allergy.severity && <span className="reaction-note"> (Severity: {allergy.severity})</span>}
              </div>
              <button className="remove-btn" onClick={() => removeAllergy(allergy.id)}>×</button>
            </div>
          ))}
        </div>
      )}

      <div className="form-group">
        <label>Allergy Type</label>
        <select value={allergyType} onChange={(e) => setAllergyType(e.target.value)}>
          <option value="">Select Allergy Type</option>
          {allergyTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Allergic Substance</label>
        <select value={substance} onChange={(e) => setSubstance(e.target.value)}>
          <option value="">Select Substance</option>
          {allergicSubstances.map(sub => (
            <option key={sub} value={sub}>{sub}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Severity</label>
        <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
          <option value="">Select Severity</option>
          {severityLevels.map(level => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>

      <div className="button-group-right">
        <button type="button" onClick={handleAdd}>Add</button>
        <button type="submit" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}