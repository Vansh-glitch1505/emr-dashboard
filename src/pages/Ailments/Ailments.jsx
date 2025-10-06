import React, { useState } from "react";
import "./ailments.css";

const Ailments = () => {
  const navigate = (path) => console.log("Navigate:", path);
  const updatePreviewData = (data, type) =>
    console.log("Update preview:", type, data);

  const initialAilment = {
    problemName: "",
    icdCode: "",
    description: "",
    status: "Select",
    severity: "Select",
    dateOfOnset: "",
    pain: "0",
    riskFactor: "",
    comorbidities: "",
    sideEffects: "",
    treatmentPlan: "",
    testResults: ""
  };

  const [ailment, setAilment] = useState(initialAilment);
  const [ailmentsList, setAilmentsList] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAilment((p) => ({ ...p, [name]: value }));
  };

  const getPainLevelText = (value) => {
    const levels = [
      "No pain",
      "Very mild",
      "Mild",
      "Moderate",
      "Moderately severe",
      "Severe",
      "Very severe",
      "Intense",
      "Very intense",
      "Excruciating",
      "Unimaginable"
    ];
    return levels[parseInt(value, 10)] || "";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  const handlePreview = () => {
    if (!ailment.problemName) {
      alert("Please enter at least a problem name");
      return;
    }
    setShowPreview(true);
  };

  const handleAdd = () => {
    if (!ailment.problemName) {
      alert("Please enter at least a problem name");
      return;
    }
    
    // ADD THIS VALIDATION
    if (ailment.status === "Select") {
      alert("Please select a valid status");
      return;
    }
    
    if (ailment.severity === "Select") {
      alert("Please select a valid severity");
      return;
    }
    
    if (editingIndex !== null) {
      const updated = [...ailmentsList];
      updated[editingIndex] = { ...ailment };
      setAilmentsList(updated);
      setEditingIndex(null);
      alert("Ailment updated successfully");
    } else {
      setAilmentsList([...ailmentsList, { ...ailment }]);
      alert("Ailment added successfully");
    }
    
    setAilment(initialAilment);
    setShowPreview(false);
  };

  const handleEdit = (index) => {
    setAilment(ailmentsList[index]);
    setEditingIndex(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this ailment?")) {
      setAilmentsList(ailmentsList.filter((_, i) => i !== index));
    }
  };

  const handleCancelEdit = () => {
    setAilment(initialAilment);
    setEditingIndex(null);
  };

  const handleSaveAndNext = async () => {
    // Check if there's unsaved data in the form
    if (ailment.problemName && editingIndex === null) {
      if (!window.confirm("You have unsaved data. Do you want to add it before continuing?")) {
        // User chose not to save, proceed anyway
        await saveToBackend();
        return;
      }
      // Add the current ailment to the list
      setAilmentsList(prev => [...prev, { ...ailment }]);
      // Save including the new ailment
      await saveToBackend([...ailmentsList, { ...ailment }]);
    } else if (ailment.problemName && editingIndex !== null) {
      // If editing, update the list first
      const updated = [...ailmentsList];
      updated[editingIndex] = { ...ailment };
      setAilmentsList(updated);
      await saveToBackend(updated);
    } else {
      // No unsaved data, just save the list
      await saveToBackend();
    }
  };

  const saveToBackend = async (dataToSave = ailmentsList) => {
      if (dataToSave.length === 0) {
      alert("No ailments to save. Please add at least one ailment.");
      return;
    }

    // Validate all ailments before saving
    for (let i = 0; i < dataToSave.length; i++) {
      const ailment = dataToSave[i];
      if (ailment.severity === "Select" || !ailment.severity) {
        alert(`Ailment "${ailment.problemName}" has invalid severity. Please edit and select a valid severity.`);
        return;
      }
      if (ailment.status === "Select" || !ailment.status) {
        alert(`Ailment "${ailment.problemName}" has invalid status. Please edit and select a valid status.`);
        return;
      }
    }

    if (dataToSave.length === 0) {
      alert("No ailments to save. Please add at least one ailment.");
      return;
    }

    setIsSaving(true);

    try {
      // ✅ Get patientId from localStorage (set during demographics save)
      const patientId = localStorage.getItem("currentPatientId");

      if (!patientId) {
        alert("No patient selected. Please complete Patient Demographics first.");
        setIsSaving(false);
        navigate("/dashboard/patient-demographics");
        return;
      }

      // In your saveToBackend function, before the fetch:
      console.log('Sending ailments:', JSON.stringify(dataToSave, null, 2));

      // ✅ Save ailments to backend using patientId
      const response = await fetch(`http://localhost:5000/api/ailments/${patientId}/bulk`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ailments: dataToSave }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to save ailments");
      }

      alert(`Successfully saved ${result.totalAilments} ailment(s)!`);

      // ✅ Update preview and navigate
      updatePreviewData(dataToSave, "ailments");
      navigate("/dashboard/assessment");

    } catch (error) {
      console.error("Error saving ailments:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };



  return (
    <div className="ailments-container">
      <header className="fixed-header">
        <h1 className="header-title"></h1>
      </header>

      {editingIndex !== null && (
        <div className="editing-banner">
          <span>Editing Ailment #{editingIndex + 1}</span>
          <button className="cancel-edit-btn" onClick={handleCancelEdit}>
            Cancel Edit
          </button>
        </div>
      )}

      {/* Problem Information */}
      <fieldset className="section ailments-section">
        <legend>Problem Information</legend>
        <div className="section-inner">
          <div className="form-row">
            <div className="input-group">
              <label htmlFor="problemName">Problem Name</label>
              <input
                id="problemName"
                name="problemName"
                type="text"
                value={ailment.problemName}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label htmlFor="icdCode">ICD Code</label>
              <input
                id="icdCode"
                name="icdCode"
                type="text"
                value={ailment.icdCode}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="input-group full-width">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                rows="3"
                value={ailment.description}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={ailment.status}
                onChange={handleChange}
              >
                <option value="Select">Select</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Resolved">Resolved</option>
                <option value="Chronic">Chronic</option>
                <option value="Acute">Acute</option>
                <option value="Recurrent">Recurrent</option>
                <option value="Unknown">Unknown</option>
                <option value="None">None</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="severity">Severity</label>
              <select
                id="severity"
                name="severity"
                value={ailment.severity}
                onChange={handleChange}
              >
                <option value="Select">Select</option>
                <option value="Mild">Mild</option>
                <option value="Moderate">Moderate</option>
                <option value="Severe">Severe</option>
                <option value="Critical">Critical</option>
                <option value="Unknown">Unknown</option>
                <option value="None">None</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="dateOfOnset">Date of Onset</label>
              <input
                id="dateOfOnset"
                name="dateOfOnset"
                type="date"
                value={ailment.dateOfOnset}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </fieldset>

      {/* Pain */}
      <fieldset className="section ailments-section">
        <legend>Pain Assessment</legend>
        <div className="section-inner">
          <div className="form-row">
            <div className="input-group full-width">
              <label htmlFor="pain">
                Pain Level: {ailment.pain}/10 — {getPainLevelText(ailment.pain)}
              </label>
              <input
                id="pain"
                name="pain"
                type="range"
                min="0"
                max="10"
                value={ailment.pain}
                onChange={handleChange}
                className="pain-slider"
              />
              <div className="pain-scale">
                {[...Array(11).keys()].map((n) => (
                  <span key={n}>{n}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </fieldset>

      {/* Associated */}
      <fieldset className="section ailments-section">
        <legend>Associated Factors</legend>
        <div className="section-inner">
          <div className="form-row">
            <div className="input-group">
              <label htmlFor="riskFactor">Risk Factor</label>
              <input
                id="riskFactor"
                name="riskFactor"
                type="text"
                value={ailment.riskFactor}
                onChange={handleChange}
              />
            </div>

            <div className="input-group full-width">
              <label htmlFor="comorbidities">Comorbidities</label>
              <textarea
                id="comorbidities"
                name="comorbidities"
                rows="2"
                value={ailment.comorbidities}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="input-group full-width">
              <label htmlFor="sideEffects">Medication Side Effects</label>
              <textarea
                id="sideEffects"
                name="sideEffects"
                rows="2"
                value={ailment.sideEffects}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="input-group full-width">
              <label htmlFor="treatmentPlan">Treatment Plan</label>
              <textarea
                id="treatmentPlan"
                name="treatmentPlan"
                rows="3"
                value={ailment.treatmentPlan}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="input-group full-width">
              <label htmlFor="testResults">Test Results</label>
              <textarea
                id="testResults"
                name="testResults"
                rows="3"
                value={ailment.testResults}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </fieldset>

      {/* Actions */}
      <div className="form-actions-center">
        <button className="preview-btn" onClick={handlePreview}>
          Preview
        </button>
        <button className="add-btn" onClick={handleAdd}>
          {editingIndex !== null ? "Update" : "Add"} Ailment
        </button>
      </div>

      {/* Saved Ailments List */}
      {ailmentsList.length > 0 && (
        <div className="saved-ailments">
          <h2 className="saved-title">Saved Ailments ({ailmentsList.length})</h2>
          {ailmentsList.map((item, index) => (
            <div key={index} className="ailment-card">
              <div className="ailment-header">
                <div>
                  <h3 className="ailment-name">{item.problemName}</h3>
                  {item.icdCode && <span className="icd-badge">ICD: {item.icdCode}</span>}
                </div>
                <div className="ailment-actions">
                  <button className="edit-btn" onClick={() => handleEdit(index)}>
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(index)}>
                    Delete
                  </button>
                </div>
              </div>
              <div className="ailment-details">
                <div className="detail-row">
                  <span className="detail-label">Status:</span>
                  <span>{item.status !== "Select" ? item.status : "—"}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Severity:</span>
                  <span>{item.severity !== "Select" ? item.severity : "—"}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Pain:</span>
                  <span>{item.pain}/10</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Onset:</span>
                  <span>{formatDate(item.dateOfOnset)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Save & Next Button */}
      <div className="next-btn-container">
        <button 
          className="next-btn" 
          onClick={handleSaveAndNext}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save & Next"}
        </button>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="preview-modal-overlay" role="dialog" aria-modal="true">
          <div className="preview-modal">
            <div className="preview-header">
              <h2>Ailment Preview</h2>
              <button
                className="close-btn"
                aria-label="Close"
                onClick={() => setShowPreview(false)}
              >
                ×
              </button>
            </div>

            <div className="preview-content">
              <div className="preview-photo-section">{/* optional avatar */}</div>

              <div className="preview-section">
                <div className="preview-section-title">Problem Information</div>
                <div className="preview-section-content">
                  <div className="preview-field">
                    <div className="preview-field-label">Problem Name</div>
                    <div className="preview-field-value">
                      {ailment.problemName || "Not specified"}
                    </div>
                  </div>

                  <div className="preview-field">
                    <div className="preview-field-label">ICD Code</div>
                    <div className="preview-field-value">
                      {ailment.icdCode || "Not specified"}
                    </div>
                  </div>

                  <div className="preview-field">
                    <div className="preview-field-label">Description</div>
                    <div className="preview-field-value">
                      {ailment.description || "Not specified"}
                    </div>
                  </div>

                  <div className="preview-field">
                    <div className="preview-field-label">Status</div>
                    <div className="preview-field-value">
                      {ailment.status === "Select"
                        ? "Not specified"
                        : ailment.status}
                    </div>
                  </div>

                  <div className="preview-field">
                    <div className="preview-field-label">Severity</div>
                    <div className="preview-field-value">
                      {ailment.severity === "Select"
                        ? "Not specified"
                        : ailment.severity}
                    </div>
                  </div>

                  <div className="preview-field">
                    <div className="preview-field-label">Date of Onset</div>
                    <div className="preview-field-value">
                      {formatDate(ailment.dateOfOnset)}
                    </div>
                  </div>

                  <div className="preview-field">
                    <div className="preview-field-label">Pain</div>
                    <div className="preview-field-value">
                      {ailment.pain}/10 — {getPainLevelText(ailment.pain)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="preview-section">
                <div className="preview-section-title">Associated Factors</div>
                <div className="preview-section-content">
                  <div className="preview-field">
                    <div className="preview-field-label">Risk Factor</div>
                    <div className="preview-field-value">
                      {ailment.riskFactor || "Not specified"}
                    </div>
                  </div>

                  <div className="preview-field">
                    <div className="preview-field-label">Comorbidities</div>
                    <div className="preview-field-value">
                      {ailment.comorbidities || "Not specified"}
                    </div>
                  </div>

                  <div className="preview-field">
                    <div className="preview-field-label">
                      Medication Side Effects
                    </div>
                    <div className="preview-field-value">
                      {ailment.sideEffects || "Not specified"}
                    </div>
                  </div>

                  <div className="preview-field">
                    <div className="preview-field-label">Treatment Plan</div>
                    <div className="preview-field-value">
                      {ailment.treatmentPlan || "Not specified"}
                    </div>
                  </div>

                  <div className="preview-field">
                    <div className="preview-field-label">Test Results</div>
                    <div className="preview-field-value">
                      {ailment.testResults || "Not specified"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="preview-actions">
              <button
                className="preview-cancel-btn"
                onClick={() => setShowPreview(false)}
              >
                Cancel
              </button>
              <button className="preview-save-btn" onClick={handleAdd}>
                {editingIndex !== null ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ailments;