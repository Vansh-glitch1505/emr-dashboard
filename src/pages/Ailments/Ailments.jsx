import React, { useState } from "react";
import "./ailments.css";

const Ailments = () => {
  // Replace these with your real navigation / context functions
  const navigate = (path) => console.log("Navigate:", path);
  const updatePreviewData = (data, type) =>
    console.log("Update preview:", type, data);

  const [ailment, setAilment] = useState({
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
  });

  const [showPreview, setShowPreview] = useState(false);

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

  const handleSave = async () => {
    try {
      console.log("Saving:", ailment);
      updatePreviewData(ailment, "ailments");
      alert("Ailment saved");
      setShowPreview(false);
      setAilment({
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
      });
    } catch (err) {
      console.error(err);
      alert("Save failed");
    }
  };

  const handleNext = async () => {
    if (ailment.problemName) await handleSave();
    navigate("/dashboard/assessment");
  };

  return (
    <div className="ailments-container">
      <header className="fixed-header">
        <h1 className="header-title">Ailments</h1>
      </header>

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
        <button className="next-btn" onClick={handleNext}>
          Next
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
              <button className="preview-save-btn" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ailments;
