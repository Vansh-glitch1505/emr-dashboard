import React, { createContext, useContext, useState } from 'react';
import ExposureToViolence from './ExposureToViolence';
import NutrientsHistory from './NutrientsHistory';
import GenderIdentity from './GenderIdentity';
import SexualOrientation from './SexualOrientation';

const SocialHistoryContext = createContext();

export const SocialHistoryProvider = ({ children }) => {
  const [socialHistoryData, setSocialHistoryData] = useState({
    tobaccoUse: null,
    alcoholUse: null,
    socialText: null,
    financialResources: null,
    education : null,
    physicalActivity: null,
    stress : null,
    socialIsolation : null,
    exposureToViolence : null,
    genderIdentity :null,
    sexualOrientation : null,
    nutrientsHistory : null,
    // Add other sections as needed
  });

  const updateTobaccoUse = (data) => {
    setSocialHistoryData(prev => ({ ...prev, tobaccoUse: data }));
  };

  const updateAlcoholUse = (data) => {
    setSocialHistoryData(prev => ({ ...prev, alcoholUse: data }));
  };

  const updateSocialText = (data) => {
    setSocialHistoryData(prev => ({ ...prev, socialText: data }));
  };

  // Add update functions for other sections as needed
  const updateFinancialResources = (data) => {
    setSocialHistoryData(prev => ({ ...prev, financialResources: data }));
  };

  const updateEducation = (data) => {
    setSocialHistoryData(prev => ({ ...prev, education: data }));
  };

  const updatePhysicalActivity = (data) => {
    setSocialHistoryData(prev => ({ ...prev, physicalActivity: data }));
  };

  const updateStress = (data) => {
  setSocialHistoryData(prev => ({ ...prev, stress: data }));
  };

  const updateSocialIsolation = (data) => {
  setSocialHistoryData(prev => ({ ...prev, socialIsolation: data }));
  };

  const updateExposureToViolence = (data) => {
  setSocialHistoryData(prev => ({ ...prev, exposureToViolence: data }));
  };

  const updateNutrientsHistory = (data) => {
  setSocialHistoryData(prev => ({ ...prev, nutrientsHistory: data }));
  };

  const updateGenderIdentity = (data) => {
    setSocialHistoryData(prev => ({ ...prev, genderIdentity: data }));
  };

  const updateSexualOrientation = (data) => {
  setSocialHistoryData(prev => ({ ...prev, sexualOrientation: data }));
  };

  return (
    <SocialHistoryContext.Provider 
      value={{ 
        socialHistoryData, 
        updateTobaccoUse,
        updateAlcoholUse,
        updateSocialText,
        updateFinancialResources,
        updateEducation,
        updatePhysicalActivity,
        updateStress,
        updateSocialIsolation,
        updateExposureToViolence,
        updateGenderIdentity,
        updateSexualOrientation,
        updateNutrientsHistory,
        // Add other update functions here
      }}
    >
      {children}
    </SocialHistoryContext.Provider>
  );
};

export const useSocialHistory = () => useContext(SocialHistoryContext);