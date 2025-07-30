import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SocialHistoryPreview.css";

const SocialHistoryPreview = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  
  // Extract all data with null fallbacks
  const {
    tobaccoUse = null,
    alcoholUse = null,
    socialText = null,
    financialResources = null,
    education = null,
    physicalActivity = null,
    stress = null,
    socialIsolation = null,
    exposureToViolence = null,
    genderIdentity = null,
    sexualOrientation = null,
    nutrientsHistory = null,
    // Add other sections as needed
  } = state?.socialHistoryData || {};

  const handleBack = () => navigate(-1);

  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="social-history-preview-container">
      <div className="preview-header">
        <h2>Social History Preview</h2>
        <button onClick={handleBack} className="back-button">
          ← Back to Edit
        </button>
      </div>

      <div className="preview-sections">
        {/* Tobacco Use Section */}
        <section className="preview-section">
          <h3>Tobacco Use</h3>
          <div className="preview-grid">
            <div className="preview-item">
              <strong>Status:</strong> {tobaccoUse?.status || "Not specified"}
            </div>
            <div className="preview-item">
              <strong>Daily Consumption:</strong> 
              {tobaccoUse?.dailyConsumption ? `${tobaccoUse.dailyConsumption} cigarettes/day` : "Not specified"}
            </div>
            <div className="preview-item">
              <strong>Duration:</strong> 
              {tobaccoUse?.duration ? `${tobaccoUse.duration} ${tobaccoUse.durationUnit || "years"}` : "Not specified"}
            </div>
            <div className="preview-item">
              <strong>Quit Date:</strong> {tobaccoUse?.quitDate ? formatDate(tobaccoUse.quitDate) : "Not specified"}
            </div>
            <div className="preview-item notes">
              <strong>Notes:</strong> {tobaccoUse?.notes || "No notes provided"}
            </div>
          </div>
        </section>

        {/* Alcohol Use Section */}
        <section className="preview-section">
          <h3>Alcohol Use</h3>
          <div className="preview-grid">
            <div className="preview-item">
              <strong>Status:</strong> {alcoholUse?.status || "Not specified"}
            </div>
            <div className="preview-item">
              <strong>Weekly Consumption:</strong> 
              {alcoholUse?.weeklyConsumption ? `${alcoholUse.weeklyConsumption} drinks/week` : "Not specified"}
            </div>
            <div className="preview-item">
              <strong>Preferred Type:</strong> {alcoholUse?.alcoholType || "Not specified"}
            </div>
            <div className="preview-item">
              <strong>Period of Use:</strong> {alcoholUse?.period || "Not specified"}
            </div>
            <div className="preview-item notes">
              <strong>Notes:</strong> {alcoholUse?.notes || "No notes provided"}
            </div>
          </div>
        </section>

        {/* Social Text Section */}
        <section className="preview-section">
          <h3>Social History (free text)</h3>
          {socialText?.notes ? (
            <div className="preview-text-content">
              <p>{socialText.notes}</p>
            </div>
          ) : (
            <p className="no-data">No additional notes provided</p>
          )}
        </section>

        {/* Financial Resources Section */}
        <section className="preview-section">
          <h3>Financial Resources</h3>
          {financialResources ? (
            <div className="preview-grid">
              <div className="preview-item">
                <strong>Income Level:</strong> {financialResources.incomeLevel || "Not specified"}
              </div>
              <div className="preview-item">
                <strong>Employment Status:</strong> {financialResources.employmentStatus || "Not specified"}
              </div>
              <div className="preview-item">
                <strong>Financial Support:</strong> {financialResources.financialSupport || "Not specified"}
              </div>
              {financialResources.notes && (
                <div className="preview-item notes">
                  <strong>Notes:</strong> {financialResources.notes}
                </div>
              )}
            </div>
          ) : (
            <p className="no-data">No financial resources information provided</p>
          )}
        </section>

        {/* Education */}
        <section className="preview-section">
            <h3>Education</h3>
            {education ? (
              <div className="preview-grid">
                <div className="preview-item">
                  <strong>Highest Education:</strong> {education.highestEducation || "Not specified"}
                </div>
                {education.notes && (
                  <div className="preview-item notes">
                    <strong>Notes:</strong> {education.notes}
                  </div>
                )}
              </div>
            ) : (
              <p className="no-data">No education information provided</p>
            )}
          </section>

        {/* Physical Activity Section */}
        <section className="preview-section">
          <h3>Physical Activity</h3>
          {physicalActivity ? (
            <div className="preview-grid">
              <div className="preview-item">
                <strong>Frequency:</strong> {physicalActivity.frequency || "Not specified"}
              </div>
              <div className="preview-item">
                <strong>Type:</strong> {physicalActivity.type || "Not specified"}
              </div>
              <div className="preview-item">
                <strong>Duration:</strong> {physicalActivity.duration ? `${physicalActivity.duration} ${physicalActivity.durationUnit}` : "Not specified"}
              </div>
              <div className="preview-item">
                <strong>Consistency:</strong> {physicalActivity.consistency || "Not specified"}
              </div>
              {physicalActivity.notes && (
                <div className="preview-item notes">
                  <strong>Notes:</strong> {physicalActivity.notes}
                </div>
              )}
            </div>
          ) : (
            <p className="no-data">No physical activity information provided</p>
          )}
        </section>
        {/* Stress */}
        <section className="preview-section">
          <h3>Stress</h3>
          {stress ? (
            <div className="preview-grid">
              <div className="preview-item">
                <strong>Stress Level:</strong> {stress.stressLevel || "Not specified"}
              </div>
              {stress.stressors && (
                <div className="preview-item">
                  <strong>Major Stressors:</strong> {stress.stressors}
                </div>
              )}
              {stress.coping && (
                <div className="preview-item">
                  <strong>Coping Mechanisms:</strong> {stress.coping}
                </div>
              )}
              {stress.notes && (
                <div className="preview-item notes">
                  <strong>Notes:</strong> {stress.notes}
                </div>
              )}
            </div>
          ) : (
            <p className="no-data">No stress information provided</p>
          )}
        </section>
        {/* Social Isolation */}
        <section className="preview-section">
          <h3>Social Isolation & Connection</h3>
          {socialIsolation ? (
            <div className="preview-grid">
              <div className="preview-item">
                <strong>Isolation Status:</strong> {socialIsolation.isolationStatus || "Not specified"}
              </div>
              <div className="preview-item">
                <strong>Social Support:</strong> {socialIsolation.socialSupport || "Not specified"}
              </div>
              {socialIsolation.interactions && (
                <div className="preview-item">
                  <strong>Social Interactions:</strong> {socialIsolation.interactions}
                </div>
              )}
              {socialIsolation.notes && (
                <div className="preview-item notes">
                  <strong>Notes:</strong> {socialIsolation.notes}
                </div>
              )}
            </div>
          ) : (
            <p className="no-data">No social isolation information provided</p>
          )}
        </section>
        {/* Exposure To Violence */}
        <section className="preview-section">
          <h3>Exposure to Violence</h3>       
          {exposureToViolence ? (
            <div className="preview-grid">
              <div className="preview-item">
                <strong>Type of Violence:</strong> {exposureToViolence.typeOfViolence || "Not specified"}
              </div>
              {exposureToViolence.lastExposure && (
                <div className="preview-item">
                  <strong>Last Exposure:</strong> {new Date(exposureToViolence.lastExposure).toLocaleDateString()}
                </div>
              )}
              {exposureToViolence.supportReceived && (
                <div className="preview-item">
                  <strong>Support Received:</strong> {exposureToViolence.supportReceived}
                </div>
              )}
              {exposureToViolence.notes && (
                <div className="preview-item notes">
                  <strong>Notes:</strong> {exposureToViolence.notes}
               </div>
              )}
            </div>
          ) : (
            <p className="no-data">No violence exposure information provided</p>
          )}
        </section>
        {/* Gender Identity */}
       <section className="preview-section">
        <h3>Gender Identity</h3>
        {genderIdentity ? (
          <div className="preview-grid">
            <div className="preview-item">
              <strong>Identity:</strong> {genderIdentity.identity || "Not specified"}
            </div>
            {genderIdentity.notes && (
              <div className="preview-item notes">
                <strong>Notes:</strong> {genderIdentity.notes}
              </div>
            )}
          </div>
        ) : (
          <p className="no-data">No gender identity information provided</p>
        )}
      </section>
        
        {/* Sexual Orientation */}
        <section className="preview-section">
          <h3>Sexual Orientation</h3>
          {sexualOrientation ? (
            <div className="preview-grid">
              <div className="preview-item">
                <strong>Orientation:</strong> {sexualOrientation.orientation || "Not specified"}
              </div>
              {sexualOrientation.notes && (
                <div className="preview-item notes">
                  <strong>Notes:</strong> {sexualOrientation.notes}
                </div>
              )}
            </div>
          ) : (
            <p className="no-data">No sexual orientation information provided</p>
          )}
        </section>
        {/* Nutrient History */}
        <section className="preview-section">
          <h3>Nutrients History</h3>
          {nutrientsHistory ? (
            <div className="preview-grid">
              {nutrientsHistory.dietaryPreferences && (
                <div className="preview-item">
                  <strong>Dietary Preferences:</strong> {nutrientsHistory.dietaryPreferences}
                </div>
              )}
              <div className="preview-item">
                <strong>Supplement Usage:</strong> {nutrientsHistory.supplementUsage || "Not specified"}
              </div>
              {nutrientsHistory.notes && (
                <div className="preview-item notes">
                  <strong>Notes:</strong> {nutrientsHistory.notes}
                </div>
              )}
            </div>
          ) : (
            <p className="no-data">No nutrients history information provided</p>
          )}
       </section>
       
      
      </div>
    </div>
  );        
};

export default SocialHistoryPreview;