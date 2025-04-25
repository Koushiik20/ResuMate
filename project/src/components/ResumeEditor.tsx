import React, { useState } from 'react';
import TemplateSelector from './TemplateSelector';
import PersonalInfoForm from './PersonalInfoForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import SkillsForm from './SkillsForm';
import { ChevronDown, ChevronUp } from 'lucide-react';

type SectionState = {
  personalInfo: boolean;
  experience: boolean;
  education: boolean;
  skills: boolean;
};

const ResumeEditor: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<SectionState>({
    personalInfo: true,
    experience: true,
    education: true,
    skills: true,
  });

  const toggleSection = (section: keyof SectionState) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <TemplateSelector />
      </div>
      
      <div className="space-y-4">
        {/* Personal Info Section */}
        <div>
          <button
            type="button"
            onClick={() => toggleSection('personalInfo')}
            className="w-full flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <span className="font-medium text-gray-900 dark:text-white">Personal Information</span>
            {expandedSections.personalInfo ? (
              <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            )}
          </button>
          {expandedSections.personalInfo && (
            <div className="mt-2 transition-all duration-300 ease-in-out">
              <PersonalInfoForm />
            </div>
          )}
        </div>

        {/* Experience Section */}
        <div>
          <button
            type="button"
            onClick={() => toggleSection('experience')}
            className="w-full flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <span className="font-medium text-gray-900 dark:text-white">Work Experience(Optional)</span>
            {expandedSections.experience ? (
              <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            )}
          </button>
          {expandedSections.experience && (
            <div className="mt-2 transition-all duration-300 ease-in-out">
              <ExperienceForm />
            </div>
          )}
        </div>
        <div>
          <button
            type="button"
            onClick={() => toggleSection('education')}
            className="w-full flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <span className="font-medium text-gray-900 dark:text-white">Education</span>
            {expandedSections.education ? (
              <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            )}
          </button>
          {expandedSections.education && (
            <div className="mt-2 transition-all duration-300 ease-in-out">
              <EducationForm />
            </div>
          )}
        </div>

        {/* Skills Section */}
        <div>
          <button
            type="button"
            onClick={() => toggleSection('skills')}
            className="w-full flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <span className="font-medium text-gray-900 dark:text-white">Skills</span>
            {expandedSections.skills ? (
              <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            )}
          </button>
          {expandedSections.skills && (
            <div className="mt-2 transition-all duration-300 ease-in-out">
              <SkillsForm />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeEditor;