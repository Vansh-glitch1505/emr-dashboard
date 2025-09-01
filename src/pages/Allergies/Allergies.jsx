import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Allergies.css";

const Allergies = () => {
  const navigate = useNavigate();
  const [allergyData, setAllergyData] = useState([
    {
      allergen: "",
      reaction: "",
      severity: "",
      category: "",
      code: "",
      status: "",
    },
  ]);

  const handleChange = (index, field, value) => {
    const updatedData = [...allergyData];
    updatedData[index][field] = value;
    setAllergyData(updatedData);
  };

  const handleNext = () => {
    navigate('/dashboard/family-history');
  };

  const handleAddRow = () => {
    setAllergyData([
      ...allergyData,
      {
        allergen: "",
        reaction: "",
        severity: "",
        category: "",
        code: "",
        status: "",
      },
    ]);
  };

  const handleRemoveRow = (index) => {
    if (allergyData.length > 1) {
      const updatedData = allergyData.filter((_, i) => i !== index);
      setAllergyData(updatedData);
    }
  };

  return (
    <div className="allergies-container">
      <header className="fixed-header">
        <h1 className="header-title"></h1>
      </header>
      <h2 className="allergies-title">Allergies Information</h2>
      
      <div className="allergies-section">
        <legend className="section-title">Allergy Details</legend>
        <div className="table-container">
          <table className="allergies-table">
            <thead>
              <tr>
                <th>Allergen</th>
                <th>Reaction</th>
                <th>Severity</th>
                <th>Category</th>
                <th>Code</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allergyData.map((item, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      value={item.allergen}
                      onChange={(e) => handleChange(index, "allergen", e.target.value)}
                      placeholder="e.g. Penicillin"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={item.reaction}
                      onChange={(e) => handleChange(index, "reaction", e.target.value)}
                      placeholder="e.g. Rash"
                    />
                  </td>
                  <td>
                    <select
                      value={item.severity}
                      onChange={(e) => handleChange(index, "severity", e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="Mild">Mild</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Severe">Severe</option>
                      <option value="Life-threatening">Life-threatening</option>
                    </select>
                  </td>
                  <td>
                    <select
                      value={item.category}
                      onChange={(e) => handleChange(index, "category", e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="Food">Food</option>
                      <option value="Drug">Drug</option>
                      <option value="Environmental">Environmental</option>
                      <option value="Insect">Insect</option>
                      <option value="Other">Other</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={item.code}
                      onChange={(e) => handleChange(index, "code", e.target.value)}
                      placeholder="e.g. ICD-10 code"
                    />
                  </td>
                  <td>
                    <select
                      value={item.status}
                      onChange={(e) => handleChange(index, "status", e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </td>
                  <td>
                    <button 
                      className="remove-btn"
                      onClick={() => handleRemoveRow(index)}
                      disabled={allergyData.length === 1}
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="form-actions">
        <button className="add-btn" onClick={handleAddRow}>
          + Add Allergy
        </button>
        <div className="nav-buttons">
          <button className="next-btn" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Allergies;