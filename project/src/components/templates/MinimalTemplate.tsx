import React from 'react';
import { ResumeData } from '../../types';

interface MinimalTemplateProps {
  data: ResumeData;
}

const MinimalTemplate: React.FC<MinimalTemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills } = data;

  // Format date to display as "MMM YYYY" (e.g., "Jan 2020")
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    } catch (e) {
      return dateString;
    }
  };

  const getDateRangeString = (startDate: string, endDate: string, current: boolean) => {
    const start = formatDate(startDate);
    const end = current ? 'Present' : formatDate(endDate);
    
    if (!start && !end) return '';
    if (!start) return end;
    if (!end || current) return `${start} - Present`;
    
    return `${start} - ${end}`;
  };

  return (
    <div className="bg-white p-8 shadow-lg w-full h-full" id="minimal-template">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{personalInfo.fullName || 'Your Name'}</h1>
        <p className="text-gray-600 mt-1">{personalInfo.title || 'Professional Title'}</p>
        
        {/* Contact Info - Single line with separators */}
        <div className="mt-2 text-sm text-gray-600">
          {[
            personalInfo.email,
            personalInfo.phone,
            personalInfo.location,
            personalInfo.website
          ]
            .filter(Boolean)
            .map((item, index, arr) => (
              <React.Fragment key={index}>
                <span>{item}</span>
                {index < arr.length - 1 && <span className="mx-2">•</span>}
              </React.Fragment>
            ))}
        </div>
      </div>
      
      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-sm uppercase tracking-widest font-bold text-gray-400 mb-2">Profile</h2>
          <p className="text-gray-700">{personalInfo.summary}</p>
        </div>
      )}
      
      {/* Experience */}
      {experience.length > 0 && experience[0].company && (
        <div className="mb-6">
          <h2 className="text-sm uppercase tracking-widest font-bold text-gray-400 mb-3">Experience</h2>
          
          {experience.map((exp) => (
            <div className="mb-4" key={exp.id}>
              <div className="flex justify-between items-baseline">
                <h3 className="font-medium text-gray-900">{exp.position || 'Position'}</h3>
                <p className="text-xs text-gray-500">
                  {getDateRangeString(exp.startDate, exp.endDate, exp.current)}
                </p>
              </div>
              <p className="text-gray-600 text-sm">{exp.company || 'Company'}</p>
              <p className="text-gray-700 mt-1 text-sm">{exp.description}</p>
            </div>
          ))}
        </div>
      )}
      
      {/* Education */}
      {education.length > 0 && education[0].institution && (
        <div className="mb-6">
          <h2 className="text-sm uppercase tracking-widest font-bold text-gray-400 mb-3">Education</h2>
          
          {education.map((edu) => (
            <div className="mb-4" key={edu.id}>
              <div className="flex justify-between items-baseline">
                <h3 className="font-medium text-gray-900">
                  {edu.degree || 'Degree'} {edu.field ? `in ${edu.field}` : ''}
                </h3>
                <p className="text-xs text-gray-500">
                  {getDateRangeString(edu.startDate, edu.endDate, edu.current)}
                </p>
              </div>
              <p className="text-gray-600 text-sm">{edu.institution || 'Institution'}</p>
              {edu.description && <p className="text-gray-700 mt-1 text-sm">{edu.description}</p>}
            </div>
          ))}
        </div>
      )}
      
      {/* Skills */}
      {skills.length > 0 && skills[0].name && (
        <div>
          <h2 className="text-sm uppercase tracking-widest font-bold text-gray-400 mb-3">Skills</h2>
          
          <p className="text-gray-700">
            {skills.map((skill, index) => (
              <React.Fragment key={skill.id}>
                <span>{skill.name}</span>
                {index < skills.length - 1 && <span className="mx-1">•</span>}
              </React.Fragment>
            ))}
          </p>
        </div>
      )}
    </div>
  );
};

export default MinimalTemplate;