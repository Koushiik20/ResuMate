import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { ResumeData } from '../../types';

interface CreativeTemplateProps {
  data: ResumeData;
}

const CreativeTemplate: React.FC<CreativeTemplateProps> = ({ data }) => {
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

  // Skill level to width percentage mapping
  const getSkillLevelWidth = (level: number) => {
    const levels = {
      1: '20%',
      2: '40%',
      3: '60%',
      4: '80%',
      5: '100%',
    };
    return levels[level as keyof typeof levels] || '0%';
  };

  return (
    <div className="bg-white w-full h-full" id="creative-template">
      {/* Header with accent color */}
      <div className="bg-purple-600 text-white p-8">
        <h1 className="text-3xl font-bold">{personalInfo.fullName || 'Your Name'}</h1>
        <p className="text-xl mt-1 text-purple-200">{personalInfo.title || 'Professional Title'}</p>
        
        {/* Contact Info */}
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
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
      
      <div className="p-8">
        {/* Summary */}
        {personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-purple-600 mb-3">About Me</h2>
            <p className="text-gray-700 bg-gray-50 p-4 rounded-lg border-l-4 border-purple-500">
              {personalInfo.summary}
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {/* Experience */}
            {experience.length > 0 && experience[0].company && (
              <div className="mb-8">
                <h2 className="text-lg font-bold text-purple-600 mb-4">Work Experience</h2>
                
                <div className="space-y-6">
                  {experience.map((exp) => (
                    <div className="relative pl-6 border-l-2 border-purple-300" key={exp.id}>
                      <div className="absolute w-3 h-3 bg-purple-500 rounded-full -left-[7px] top-1"></div>
                      <h3 className="font-bold text-gray-900">{exp.position || 'Position'}</h3>
                      <p className="text-purple-600 font-medium">{exp.company || 'Company'}</p>
                      <p className="text-sm text-gray-600 mb-2">
                        {getDateRangeString(exp.startDate, exp.endDate, exp.current)}
                      </p>
                      <p className="text-gray-700">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Education */}
            {education.length > 0 && education[0].institution && (
              <div>
                <h2 className="text-lg font-bold text-purple-600 mb-4">Education</h2>
                
                <div className="space-y-6">
                  {education.map((edu) => (
                    <div className="relative pl-6 border-l-2 border-purple-300" key={edu.id}>
                      <div className="absolute w-3 h-3 bg-purple-500 rounded-full -left-[7px] top-1"></div>
                      <h3 className="font-bold text-gray-900">
                        {edu.degree || 'Degree'} {edu.field ? `in ${edu.field}` : ''}
                      </h3>
                      <p className="text-purple-600 font-medium">{edu.institution || 'Institution'}</p>
                      <p className="text-sm text-gray-600 mb-2">
                        {getDateRangeString(edu.startDate, edu.endDate, edu.current)}
                      </p>
                      {edu.description && <p className="text-gray-700">{edu.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Skills - Right Column */}
          <div>
            {skills.length > 0 && skills[0].name && (
              <div>
                <h2 className="text-lg font-bold text-purple-600 mb-4">Skills</h2>
                
                <div className="space-y-4">
                  {skills.map((skill) => (
                    <div key={skill.id}>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-gray-700">{skill.name}</span>
                        <span className="text-xs text-gray-500">
                          {['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert'][skill.level - 1]}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full" 
                          style={{ width: getSkillLevelWidth(skill.level) }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreativeTemplate;