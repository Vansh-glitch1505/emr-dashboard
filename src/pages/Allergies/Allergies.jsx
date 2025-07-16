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
    navigate('/dashboard/family-history');  // or the next section path
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

  return (
    <div className="allergies-container">
      <h2>Allergies Information</h2>
      <table className="allergies-table">
        <thead>
          <tr>
            <th>Allergen</th>
            <th>Reaction</th>
            <th>Severity</th>
            <th>Category</th>
            <th>Code</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {allergyData.map((item, index) => (
            <tr key={index}>
              {Object.keys(item).map((field) => (
                <td key={field}>
                  <input
                    type="text"
                    value={item[field]}
                    onChange={(e) =>
                      handleChange(index, field, e.target.value)
                    }
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="button-row">
        <button className="nav-button" onClick={handleAddRow}>
          + Add Row
        </button>
        <div className="nav-buttons-group">
          <button className="nav-button">Previous</button>
          <button className="nav-button" onClick={handleNext}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Allergies;
