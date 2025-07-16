import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./Vitals.css";

const Vitals = () => {
  const [formData, setFormData] = useState({
    systolic: "",
    diastolic: "",
    pulse: "",
    respiratory: "",
    temperature: "",
    tempUnit: "Celsius",
    height: "",
    heightUnit: "feet",
    weight: "",
    bmi: "",
    pain: "0",
    spo2: "",
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
    comments: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Calculate BMI when height or weight changes
    if (formData.height && formData.weight) {
      const heightInMeters = formData.heightUnit === "feet" 
        ? parseFloat(formData.height) * 0.3048 
        : parseFloat(formData.height) * 0.0254;
      
      const weightInKg = parseFloat(formData.weight);
      
      if (heightInMeters > 0 && weightInKg > 0) {
        const bmiValue = (weightInKg / (heightInMeters * heightInMeters)).toFixed(1);
        setFormData(prev => ({ ...prev, bmi: bmiValue }));
      }
    }
  }, [formData.height, formData.weight, formData.heightUnit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Basic validation
    if (name === "systolic" || name === "diastolic" || name === "pulse" || 
        name === "respiratory" || name === "spo2") {
      if (value && isNaN(value)) return;
    }
    
    setFormData({ ...formData, [name]: value });
  };
  const handleNext = () => {
    navigate('/dashboard/allergies');  // or the next section path
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time) newErrors.time = "Time is required";
    
    if (formData.systolic && (formData.systolic < 50 || formData.systolic > 250)) {
      newErrors.systolic = "Invalid systolic value";
    }
    
    if (formData.diastolic && (formData.diastolic < 30 || formData.diastolic > 150)) {
      newErrors.diastolic = "Invalid diastolic value";
    }
    
    if (formData.pulse && (formData.pulse < 30 || formData.pulse > 200)) {
      newErrors.pulse = "Invalid pulse rate";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      setIsSubmitted(true);
      // Here you would typically send data to an API
    }
  };

  const getPainLevelText = (value) => {
    const painLevels = [
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
    return painLevels[parseInt(value)] || "";
  };

  return (
    <div className="vitals-container">
      <h2>Patient Vitals</h2>
      
      {isSubmitted ? (
        <div className="success-message">
          <h3>Vitals recorded successfully!</h3>
          <button className="new-entry" onClick={() => setIsSubmitted(false)}>
            Record New Vitals
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Date & Time</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">Date*</label>
                <input 
                  type="date" 
                  id="date" 
                  name="date" 
                  value={formData.date} 
                  onChange={handleChange}
                  className={errors.date ? "error" : ""}
                />
                {errors.date && <span className="error-message">{errors.date}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="time">Time*</label>
                <input 
                  type="time" 
                  id="time" 
                  name="time" 
                  value={formData.time} 
                  onChange={handleChange}
                  className={errors.time ? "error" : ""}
                />
                {errors.time && <span className="error-message">{errors.time}</span>}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Vital Signs</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="systolic">Systolic BP</label>
                <div className="input-with-unit">
                  <input 
                    type="number" 
                    id="systolic" 
                    name="systolic" 
                    placeholder="120"
                    value={formData.systolic} 
                    onChange={handleChange}
                    className={errors.systolic ? "error" : ""}
                  />
                  <span className="unit">mmHg</span>
                </div>
                {errors.systolic && <span className="error-message">{errors.systolic}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="diastolic">Diastolic BP</label>
                <div className="input-with-unit">
                  <input 
                    type="number" 
                    id="diastolic" 
                    name="diastolic" 
                    placeholder="80"
                    value={formData.diastolic} 
                    onChange={handleChange}
                    className={errors.diastolic ? "error" : ""}
                  />
                  <span className="unit">mmHg</span>
                </div>
                {errors.diastolic && <span className="error-message">{errors.diastolic}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="pulse">Pulse Rate</label>
                <div className="input-with-unit">
                  <input 
                    type="number" 
                    id="pulse" 
                    name="pulse" 
                    placeholder="72"
                    value={formData.pulse} 
                    onChange={handleChange}
                    className={errors.pulse ? "error" : ""}
                  />
                  <span className="unit">BPM</span>
                </div>
                {errors.pulse && <span className="error-message">{errors.pulse}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="respiratory">Respiratory Rate</label>
                <div className="input-with-unit">
                  <input 
                    type="number" 
                    id="respiratory" 
                    name="respiratory" 
                    placeholder="16"
                    value={formData.respiratory} 
                    onChange={handleChange}
                  />
                  <span className="unit">BPM</span>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="temperature">Temperature</label>
                <div className="input-with-unit">
                  <input 
                    type="number" 
                    id="temperature" 
                    name="temperature" 
                    placeholder={formData.tempUnit === "Celsius" ? "37.0" : "98.6"}
                    value={formData.temperature} 
                    onChange={handleChange}
                    step="0.1"
                  />
                  <div className="unit-toggle">
                    <button 
                      type="button"
                      className={formData.tempUnit === "Celsius" ? "selected" : ""}
                      onClick={() => setFormData({ ...formData, tempUnit: "Celsius" })}
                    >
                      °C
                    </button>
                    <button 
                      type="button"
                      className={formData.tempUnit === "Fahrenheit" ? "selected" : ""}
                      onClick={() => setFormData({ ...formData, tempUnit: "Fahrenheit" })}
                    >
                      °F
                    </button>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="spo2">SpO₂</label>
                <div className="input-with-unit">
                  <input 
                    type="number" 
                    id="spo2" 
                    name="spo2" 
                    placeholder="98"
                    value={formData.spo2} 
                    onChange={handleChange}
                    min="70"
                    max="100"
                  />
                  <span className="unit">%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Anthropometrics</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="height">Height</label>
                <div className="input-with-unit">
                  <input 
                    type="number" 
                    id="height" 
                    name="height" 
                    placeholder={formData.heightUnit === "feet" ? "5.8" : "70"}
                    value={formData.height} 
                    onChange={handleChange}
                    step="0.1"
                  />
                  <div className="unit-toggle">
                    <button 
                      type="button"
                      className={formData.heightUnit === "feet" ? "selected" : ""}
                      onClick={() => setFormData({ ...formData, heightUnit: "feet" })}
                    >
                      ft
                    </button>
                    <button 
                      type="button"
                      className={formData.heightUnit === "inches" ? "selected" : ""}
                      onClick={() => setFormData({ ...formData, heightUnit: "inches" })}
                    >
                      in
                    </button>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="weight">Weight</label>
                <div className="input-with-unit">
                  <input 
                    type="number" 
                    id="weight" 
                    name="weight" 
                    placeholder="70"
                    value={formData.weight} 
                    onChange={handleChange}
                    step="0.1"
                  />
                  <span className="unit">kg</span>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="bmi">BMI</label>
              <div className="input-with-unit">
                <input 
                  type="text" 
                  id="bmi" 
                  name="bmi" 
                  value={formData.bmi} 
                  readOnly
                />
                <span className="unit">kg/m²</span>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Pain Assessment</h3>
            <div className="form-group">
              <label htmlFor="pain">Pain Level: {formData.pain}/10 - {getPainLevelText(formData.pain)}</label>
              <input 
                type="range" 
                id="pain" 
                name="pain" 
                min="0" 
                max="10" 
                value={formData.pain} 
                onChange={handleChange}
                className="pain-slider"
              />
              <div className="pain-scale">
                <span>0</span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6</span>
                <span>7</span>
                <span>8</span>
                <span>9</span>
                <span>10</span>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Additional Notes</h3>
            <div className="form-group">
              <textarea 
                id="comments" 
                name="comments" 
                placeholder="Enter any additional comments or observations..."
                value={formData.comments} 
                onChange={handleChange}
                rows="4"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary" onClick={handleNext}>
              Save Vitals
            </button>
            <button type="button" className="btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Vitals;