import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ResumeData, ThemeMode } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Initial resume data
const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    summary: '',
  },
  experience: [
    {
      id: uuidv4(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    },
  ],
  education: [
    {
      id: uuidv4(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    },
  ],
  skills: [
    {
      id: uuidv4(),
      name: '',
      level: 3,
    },
  ],
  template: 'modern',
};

interface ResumeContextProps {
  resumeData: ResumeData;
  updatePersonalInfo: (info: Partial<ResumeData['personalInfo']>) => void;
  addExperience: () => void;
  updateExperience: (id: string, data: Partial<ResumeData['experience'][0]>) => void;
  removeExperience: (id: string) => void;
  addEducation: () => void;
  updateEducation: (id: string, data: Partial<ResumeData['education'][0]>) => void;
  removeEducation: (id: string) => void;
  addSkill: () => void;
  updateSkill: (id: string, data: Partial<ResumeData['skills'][0]>) => void;
  removeSkill: (id: string) => void;
  setTemplate: (template: string) => void;
  resetResume: () => void;
  themeMode: ThemeMode;
  toggleThemeMode: () => void;
}

const ResumeContext = createContext<ResumeContextProps | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    const savedData = localStorage.getItem('resumeData');
    return savedData ? JSON.parse(savedData) : initialResumeData;
  });
  
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');

  // Save to localStorage whenever resumeData changes
  React.useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  }, [resumeData]);

  const updatePersonalInfo = (info: Partial<ResumeData['personalInfo']>) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info },
    }));
  };

  const addExperience = () => {
    const newExperience = {
      id: uuidv4(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    setResumeData((prev) => ({
      ...prev,
      experience: [...prev.experience, newExperience],
    }));
  };

  const updateExperience = (id: string, data: Partial<ResumeData['experience'][0]>) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, ...data } : exp
      ),
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  };

  const addEducation = () => {
    const newEducation = {
      id: uuidv4(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, newEducation],
    }));
  };

  const updateEducation = (id: string, data: Partial<ResumeData['education'][0]>) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, ...data } : edu
      ),
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  const addSkill = () => {
    const newSkill = {
      id: uuidv4(),
      name: '',
      level: 3,
    };
    setResumeData((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }));
  };

  const updateSkill = (id: string, data: Partial<ResumeData['skills'][0]>) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill) =>
        skill.id === id ? { ...skill, ...data } : skill
      ),
    }));
  };

  const removeSkill = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill.id !== id),
    }));
  };

  const setTemplate = (template: string) => {
    setResumeData((prev) => ({
      ...prev,
      template,
    }));
  };

  const resetResume = () => {
    setResumeData(initialResumeData);
  };

  const toggleThemeMode = () => {
    setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        updatePersonalInfo,
        addExperience,
        updateExperience,
        removeExperience,
        addEducation,
        updateEducation,
        removeEducation,
        addSkill,
        updateSkill,
        removeSkill,
        setTemplate,
        resetResume,
        themeMode,
        toggleThemeMode,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};