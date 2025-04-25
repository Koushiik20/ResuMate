import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { ResumeData } from '../../types';

interface ModernTemplateProps {
  data: ResumeData;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ data }) => {
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
    <div className="bg-white p-8 shadow-lg w-full h-full" id="modern-template">
      {/* Header */}
      <div className="border-b-2 border-blue-600 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{personalInfo.fullName || 'Your Name'}</h1>
        <p className="text-xl text-blue-600 mt-1">{personalInfo.title || 'Professional Title'}</p>
        
        {/* Contact Info */}
        <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-600">
          {personalInfo.email && (
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-1" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          
          {personalInfo.phone && (
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-1" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          
          {personalInfo.location && (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          
          {personalInfo.website && (
            <div className="flex items-center">
              <Globe className="h-4 w-4 mr-1" />
              <span>{personalInfo.website}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Summary</h2>
          <p className="text-gray-700">{personalInfo.summary}</p>
        </div>
      )}
      
      {/* Experience */}
      {experience.length > 0 && experience[0].company && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">Experience</h2>
          
          {experience.map((exp) => (
            <div className="mb-4" key={exp.id}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{exp.position || 'Position'}</h3>
                  <p className="text-gray-700">{exp.company || 'Company'}</p>
                </div>
                <p className="text-sm text-gray-600">
                  {getDateRangeString(exp.startDate, exp.endDate, exp.current)}
                </p>
              </div>
              <p className="text-gray-700 mt-1 text-sm">{exp.description}</p>
            </div>
          ))}
        </div>
      )}
      
      {/* Education */}
      {education.length > 0 && education[0].institution && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">Education</h2>
          
          {education.map((edu) => (
            <div className="mb-4" key={edu.id}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {edu.degree || 'Degree'} {edu.field ? `in ${edu.field}` : ''}
                  </h3>
                  <p className="text-gray-700">{edu.institution || 'Institution'}</p>
                </div>
                <p className="text-sm text-gray-600">
                  {getDateRangeString(edu.startDate, edu.endDate, edu.current)}
                </p>
              </div>
              {edu.description && <p className="text-gray-700 mt-1 text-sm">{edu.description}</p>}
            </div>
          ))}
        </div>
      )}
      
      {/* Skills */}
      {skills.length > 0 && skills[0].name && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">Skills</h2>
          
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <div 
                key={skill.id} 
                className="bg-gray-100 px-3 py-1 rounded-full text-gray-700 text-sm"
              >
                {skill.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModernTemplate;