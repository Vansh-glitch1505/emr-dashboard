import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./MedicationHistory.css";

const MedicationHistory = () => {
  const [medications, setMedications] = useState([
    {
      problem: "",
      medicine: "",
      mg: "",
      doseTime: "",
      timePeriod: "",
      status: false,
    },
  ]);

  const [selectedTab, setSelectedTab] = useState("current");
  const navigate = useNavigate();

  const handleChange = (index, field, value) => {
    const updated = [...medications];
    updated[index][field] = value;
    setMedications(updated);
  };

  const toggleStatus = (index) => {
    const updated = [...medications];
    updated[index].status = !updated[index].status;
    setMedications(updated);
  };

  const addRow = () => {
    setMedications([
      ...medications,
      { problem: "", medicine: "", mg: "", doseTime: "", timePeriod: "", status: false },
    ]);
  };

  const handleSave = () => {
    navigate('/dashboard/vitals');  // or the next section path
  };

  const removeRow = (index) => {
    if (medications.length > 1) {
      const updated = medications.filter((_, i) => i !== index);
      setMedications(updated);
    }
  };

  return (
    <div className="medication-container">
      <div className="header-section">
        <h2>Medication History</h2>
        <div className="tabs">
          <button 
            className={`tab-button ${selectedTab === "current" ? "active" : ""}`}
            onClick={() => setSelectedTab("current")}
          >
            Current Medications
          </button>
          <button 
            className={`tab-button ${selectedTab === "past" ? "active" : ""}`}
            onClick={() => setSelectedTab("past")}
          >
            Past Medications
          </button>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Problem</th>
              <th>Medicines</th>
              <th>Dosage</th>
              <th>Frequency</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {medications.map((med, index) => (
              <tr key={index} className={med.status ? "active-med" : "inactive-med"}>
                <td>
                  <input
                    type="text"
                    value={med.problem}
                    placeholder="e.g. Hypertension"
                    onChange={(e) => handleChange(index, "problem", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={med.medicine}
                    placeholder="e.g. Amlodipine"
                    onChange={(e) => handleChange(index, "medicine", e.target.value)}
                  />
                </td>
                <td>
                  <div className="dosage-input">
                    <input
                      type="text"
                      value={med.mg}
                      placeholder="e.g. 5"
                      onChange={(e) => handleChange(index, "mg", e.target.value)}
                    />
                    <span>mg</span>
                  </div>
                </td>
                <td>
                  <select
                    value={med.doseTime}
                    onChange={(e) => handleChange(index, "doseTime", e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="OD">Once daily (OD)</option>
                    <option value="BD">Twice daily (BD)</option>
                    <option value="TDS">Thrice daily (TDS)</option>
                    <option value="QID">Four times daily (QID)</option>
                    <option value="PRN">As needed (PRN)</option>
                  </select>
                </td>
                <td>
                  <select
                    value={med.timePeriod}
                    onChange={(e) => handleChange(index, "timePeriod", e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="1 week">1 week</option>
                    <option value="2 weeks">2 weeks</option>
                    <option value="1 month">1 month</option>
                    <option value="3 months">3 months</option>
                    <option value="6 months">6 months</option>
                    <option value="Ongoing">Ongoing</option>
                  </select>
                </td>
                <td>
                  <button
                    className={`status-toggle ${med.status ? "active" : "inactive"}`}
                    onClick={() => toggleStatus(index)}
                  >
                    {med.status ? "Active" : "Inactive"}
                  </button>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="add-button" onClick={addRow}>
                      <i className="fas fa-plus"></i>
                    </button>
                    {medications.length > 1 && (
                      <button className="remove-button" onClick={() => removeRow(index)}>
                        <i className="fas fa-trash"></i>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="footer-actions">
        <button className="save-button" onClick={handleSave}>Save Medications</button>
      </div>
    </div>
  );
};

export default MedicationHistory;