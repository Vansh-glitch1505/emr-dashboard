import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./SocialHistory.css";

const SocialHistory = () => {
  const fields = [
    "Tobacco use",
    "Alcohol use",
    "Social History (free text)",
    "Financial Resources",
    "Education",
    "Physical activity",
    "Stress",
    "Social isolation & connection",
    "Exposure to violence",
    "Gender identity",
    "Sexual orientation",
    "Nutrients History",
  ];

  const [toggles, setToggles] = useState(
    fields.reduce((acc, field) => {
      acc[field] = false;
      return acc;
    }, {})
  );

  const navigate = useNavigate();

  const handleToggle = (field) => {
    setToggles((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleNext = () => {
    navigate('/dashboard/preview');  // or the next section path
  };

  return (
    <div className="social-history-container">
      <h2>Social History</h2>
      <div className="toggle-list">
        {fields.map((field) => (
          <div className="toggle-row" key={field}>
            <label>{field}</label>
            <div
              className={`toggle-switch ${toggles[field] ? "on" : "off"}`}
              onClick={() => handleToggle(field)}
            >
              {toggles[field] ? "on" : "off"}
            </div>
          </div>
        ))}
      </div>

      <div className="social-history-buttons">
        <button className="preview-btn" onClick={handleNext}>Preview</button>
        <button className="next-btn" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default SocialHistory;
