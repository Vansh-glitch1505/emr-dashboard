import React, { useState } from "react";
import { useSocialHistory } from "./SocialHistoryContext";
import "./Education.css";

const Education = ({ onClose }) => {
  const { updateEducation, socialHistoryData } = useSocialHistory();
  const [formData, setFormData] = useState({
    highestEducation: socialHistoryData?.education?.highestEducation || "",
    notes: socialHistoryData?.education?.notes || ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    console.log("Close button clicked!"); // Debug log
    console.log("onClose prop:", onClose); // Check if onClose exists
    
    if (onClose) {
      console.log("Calling onClose function"); // Debug log
      onClose();
    } else {
      console.log("No onClose function provided!"); // Debug log
      alert("Close function not provided by parent component");
    }
  };


  const handleSave = () => {
    if (!formData.highestEducation) {
      alert('Please select an education level');
      return;
    }

    const educationData = {
      highestEducation: formData.highestEducation,
      notes: formData.notes
    };
    
    updateEducation(educationData);
    console.log("Education data saved:", educationData);
    alert('Education information saved successfully!');
  };

  const handleCancel = () => {
    setFormData({
      highestEducation: socialHistoryData?.education?.highestEducation || "",
      notes: socialHistoryData?.education?.notes || ""
    });
  };

  return (
    <div className="education-panel">
      <div className="panel-header">
        <h3>Education</h3>
        <button className="close-btn" onClick={handleClose}>×</button>
      </div>

      <div className="form-group">
        <label>Highest Level of Education</label>
        <select
          name="highestEducation"
          value={formData.highestEducation}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          <option value="High School">High School</option>
          <option value="Diploma">Diploma</option>
          <option value="Bachelor's">Bachelor's</option>
          <option value="BMS">BMS</option>
          <option value="Master's">Master's</option>
          <option value="PhD">PhD</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label>Additional Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Enter any additional education information..."
          rows={3}
        />
      </div>

      <div className="education-buttons">
        <button className="save-btn" onClick={handleSave}>
          Save Education Data
        </button>
      </div>
    </div>
  );
};

export default Education;