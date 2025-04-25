import React from 'react';
import { ResumeData } from '../../types';

interface ClassicTemplateProps {
  data: ResumeData;
}

const ClassicTemplate: React.FC<ClassicTemplateProps> = ({ data }) => {
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
    <div className="bg-white p-8 shadow-lg w-full h-full" id="classic-template">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold uppercase tracking-wider text-gray-900">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p className="text-lg text-gray-700 mt-1">{personalInfo.title || 'Professional Title'}</p>
        
        {/* Contact Info */}
        <div className="mt-3 text-sm text-gray-600 flex flex-wrap justify-center gap-x-4">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </div>
      
      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase text-gray-900 border-b-2 border-gray-300 pb-1 mb-2">
            Professional Summary
          </h2>
          <p className="text-gray-700">{personalInfo.summary}</p>
        </div>
      )}
      
      {/* Experience */}
      {experience.length > 0 && experience[0].company && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase text-gray-900 border-b-2 border-gray-300 pb-1 mb-3">
            Professional Experience
          </h2>
          
          {experience.map((exp) => (
            <div className="mb-4" key={exp.id}>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <h3 className="font-bold text-gray-900">{exp.position || 'Position'}</h3>
                <p className="text-sm text-gray-600 italic">
                  {getDateRangeString(exp.startDate, exp.endDate, exp.current)}
                </p>
              </div>
              <p className="font-medium text-gray-800">{exp.company || 'Company'}</p>
              <p className="text-gray-700 mt-1">{exp.description}</p>
            </div>
          ))}
        </div>
      )}
      
      {/* Education */}
      {education.length > 0 && education[0].institution && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase text-gray-900 border-b-2 border-gray-300 pb-1 mb-3">
            Education
          </h2>
          
          {education.map((edu) => (
            <div className="mb-4" key={edu.id}>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <h3 className="font-bold text-gray-900">
                  {edu.degree || 'Degree'} {edu.field ? `in ${edu.field}` : ''}
                </h3>
                <p className="text-sm text-gray-600 italic">
                  {getDateRangeString(edu.startDate, edu.endDate, edu.current)}
                </p>
              </div>
              <p className="font-medium text-gray-800">{edu.institution || 'Institution'}</p>
              {edu.description && <p className="text-gray-700 mt-1">{edu.description}</p>}
            </div>
          ))}
        </div>
      )}
      
      {/* Skills */}
      {skills.length > 0 && skills[0].name && (
        <div>
          <h2 className="text-lg font-bold uppercase text-gray-900 border-b-2 border-gray-300 pb-1 mb-3">
            Skills
          </h2>
          
          <div className="flex flex-wrap">
            {skills.map((skill) => (
              <div key={skill.id} className="w-1/2 sm:w-1/3 mb-2">
                <span className="text-gray-800">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassicTemplate;