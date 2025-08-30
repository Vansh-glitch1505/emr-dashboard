import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MedicationHistory.css";

const emptyRow = () => ({ problem: "", medicine: "", mg: "", doseTime: "", timePeriod: "", status: false });

const MedicationHistory = () => {
  const [medications, setMedications] = useState([emptyRow()]);
  const [selectedTab, setSelectedTab] = useState("current");
  const navigate = useNavigate();

  // get userId from localStorage (ensure you set it at login)
  const userIdRaw = localStorage.getItem("userId");
  //const userId = userIdRaw ? parseInt(userIdRaw, 10) : null;
  const userId = 1;

  useEffect(() => {
    if (!userId) return;

    const fetchMeds = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/medication-history/${userId}`);
        if (!res.ok) {
          console.error("Failed loading medication history:", await res.text());
          return;
        }
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          // map DB rows into front-end shape
          setMedications(
            data.map((r) => ({
              problem: r.problem || "",
              medicine: r.medicine || "",
              mg: r.mg || "",
              doseTime: r.doseTime || "",
              timePeriod: r.timePeriod || "",
              status: !!r.status
            }))
          );
        }
      } catch (err) {
        console.error("Error fetching medication history:", err);
      }
    };

    fetchMeds();
  }, [userId]);

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

  const removeRow = (index) => {
    setMedications((prev) => {
      if (prev.length === 1) return prev;
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSave = async () => {
    if (!userId) {
      alert("No userId found. Please login again.");
      return;
    }

    // filter out completely empty rows
    const medsToSend = medications.filter((m) =>
      m && (m.problem?.trim() || m.medicine?.trim() || m.mg?.trim() || m.doseTime?.trim() || m.timePeriod?.trim())
    );

    if (medsToSend.length === 0) {
      alert("Please add at least one medication before saving.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/medication-history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, medications: medsToSend })
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
        <h2 className="medication-title">Medication History</h2>
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

      <div className="table-section">
        <legend className="section-title">Medication Details</legend>
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
                    <select value={med.doseTime} onChange={(e) => handleChange(index, "doseTime", e.target.value)}>
                      <option value="">Select</option>
                      <option value="OD">Once daily (OD)</option>
                      <option value="BD">Twice daily (BD)</option>
                      <option value="TDS">Thrice daily (TDS)</option>
                      <option value="QID">Four times daily (QID)</option>
                      <option value="PRN">As needed (PRN)</option>
                    </select>
                  </td>

                  <td>
                    <select value={med.timePeriod} onChange={(e) => handleChange(index, "timePeriod", e.target.value)}>
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
                    <button type="button" className={`status-toggle ${med.status ? "active" : "inactive"}`} onClick={() => toggleStatus(index)}>
                      {med.status ? "Active" : "Inactive"}
                    </button>
                  </td>

                  <td>
                    <div className="action-buttons">
                      <button type="button" className="add-button" onClick={addRow}>
                        +
                      </button>
                      {medications.length > 1 && (
                        <button type="button" className="remove-button" onClick={() => removeRow(index)}>
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
      </div>
    </div>
  );
};

export default MedicationHistory;