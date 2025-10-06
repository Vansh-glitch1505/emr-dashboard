import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MedicationHistory.css";

const emptyRow = () => ({
  problem: "",
  medicine: "",
  mg: "",
  doseTime: "",
  frequency: "",
  timePeriod: "",
  status: false
});

const MedicationHistory = () => {
  const [medications, setMedications] = useState([emptyRow()]);
  const navigate = useNavigate();

  const patientId = localStorage.getItem("currentPatientId");

  useEffect(() => {
    if (!patientId) return;

    const fetchMeds = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/medication-history/${patientId}`);
        if (!res.ok) {
          console.error("Failed loading medication history:", await res.text());
          return;
        }
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setMedications(
            data.map((r) => ({
              problem: r.problem || "",
              medicine: r.medicine || "",
              mg: r.dosage || "",
              doseTime: r.dose_time || "",
              frequency: r.frequency || "",
              timePeriod: r.duration || "",
              status: r.status === "Active"
            }))
          );
        }
      } catch (err) {
        console.error("Error fetching medication history:", err);
      }
    };

    fetchMeds();
  }, [patientId]);

  const handleChange = (index, field, value) => {
    setMedications((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const toggleStatus = (index) => {
    setMedications((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], status: !copy[index].status };
      return copy;
    });
  };

  const addRow = () => setMedications((prev) => [...prev, emptyRow()]);
  const removeRow = (index) =>
    setMedications((prev) => (prev.length === 1 ? prev : prev.filter((_, i) => i !== index)));

  const handleNext = async () => navigate("/dashboard/vitals");

  const handleSave = async () => {
    if (!patientId) {
      alert("Please complete Patient Demographics first.");
      navigate("/dashboard/patient-demographics");
      return;
    }

    const medsToSend = medications.filter(
      (m) =>
        m &&
        (m.problem?.trim() ||
          m.medicine?.trim() ||
          m.mg?.trim() ||
          m.doseTime?.trim() ||
          m.frequency?.trim() ||
          m.timePeriod?.trim())
    );

    if (medsToSend.length === 0) {
      alert("Please add at least one medication before saving.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/medication-history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patientId, medications: medsToSend })
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message || "Medication history saved!");
        navigate("/dashboard/vitals");
      } else {
        alert("Failed to save medication history: " + (data.error || JSON.stringify(data)));
      }
    } catch (err) {
      console.error("Error saving medication history:", err);
      alert("Failed to save medication history: " + err.message);
    }
  };

  return (
    <div className="medication-container">
      <div className="header-section">
        <header className="fixed-header">
          <h1 className="header-title"></h1>
        </header>
        <h2 className="medication-title">Medication History</h2>
      </div>

      <div className="table-section">
        <legend className="section-title">Medication Details</legend>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Problem</th>
                <th>Medicines</th>
                <th>Dosage</th>
                <th>Dose Time</th>
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
                      <option value="Morning">Morning</option>
                      <option value="Afternoon">Afternoon</option>
                      <option value="Evening">Evening</option>
                      <option value="Night">Night</option>
                      <option value="Before Meals">Before Meals</option>
                      <option value="After Meals">After Meals</option>
                      <option value="With Meals">With Meals</option>
                    </select>
                  </td>

                  <td>
                    <select
                      value={med.frequency}
                      onChange={(e) => handleChange(index, "frequency", e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="Once daily (OD)">Once daily (OD)</option>
                      <option value="Twice daily (BD)">Twice daily (BD)</option>
                      <option value="Thrice daily (TDS)">Thrice daily (TDS)</option>
                      <option value="Four times daily (QID)">Four times daily (QID)</option>
                      <option value="As needed (PRN)">As needed (PRN)</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Monthly">Monthly</option>
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
                      <option value="1 year">1 year</option>
                      <option value="Ongoing">Ongoing</option>
                    </select>
                  </td>

                  <td>
                    <button
                      type="button"
                      className={`status-toggle ${med.status ? "active" : "inactive"}`}
                      onClick={() => toggleStatus(index)}
                    >
                      {med.status ? "Active" : "Inactive"}
                    </button>
                  </td>

                  <td>
                    <div className="action-buttons">
                      <button type="button" className="add-button" onClick={addRow}>
                        +
                      </button>
                      {medications.length > 1 && (
                        <button
                          type="button"
                          className="remove-button"
                          onClick={() => removeRow(index)}
                        >
                          ×
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="form-actions">
        <button className="save-btn" onClick={handleSave}>
          Save Medications
        </button>
        <button className="next-btn" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default MedicationHistory;