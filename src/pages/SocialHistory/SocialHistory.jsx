import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./SocialHistory.css";
import TobaccoUse from "./TobaccoUse.jsx"; // Adjust path if needed
import AlcoholUse from "./AlcoholUse.jsx";
import FinancialResources from "./FinancialResources.jsx";
import PhysicalActivity from "./PhysicalActivity.jsx";
import GenderIdentity from "./GenderIdentity.jsx";
import SocialText from "./SocialText.jsx";
import SexualOrientation from "./SexualOrientation.jsx";
import Stress from "./Stress.jsx";
import SocialIsolation from "./SocialIsolation.jsx";
import ExposureToViolence from "./ExposureToViolence.jsx";
import NutrientsHistory from "./NutrientsHistory.jsx";
import Education from "./Education.jsx";

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
    navigate('/dashboard/preview');
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

      {toggles["Tobacco use"] && <TobaccoUse />}
      {toggles["Alcohol use"] && <AlcoholUse />}
      {toggles["Social History (free text)"] && <SocialText />}
      {toggles["Financial Resources"] && <FinancialResources />}
      {toggles["Physical activity"] && <PhysicalActivity />}
      {toggles["Gender identity"] && <GenderIdentity />}
      {toggles["Sexual orientation"] && <SexualOrientation />}
      {toggles["Stress"] && <Stress />}
      {toggles["Social isolation & connection"] && <SocialIsolation />}
      {toggles["Exposure to violence"] && <ExposureToViolence />}
      {toggles["Nutrients History"] && <NutrientsHistory />}
      {toggles["Education"] && <Education />}


      <div className="social-history-buttons">
        <button className="preview-btn" onClick={handleNext}>Preview</button>
        <button className="next-btn" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default SocialHistory;
