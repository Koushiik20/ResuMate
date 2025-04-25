import React from 'react';

interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    title: string;
    summary: string;
  };
  experience: {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  education: {
    institution: string;
    degree: string;
    field: string;
    graduationDate: string;
  }[];
  skills: string[];
}

interface ResumePreviewProps {
  resumeData: ResumeData;
  templateId: number;
}

const ProfessionalTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  return (
    <div className="bg-white shadow-lg p-8 max-w-[800px] mx-auto border border-gray-200 text-gray-800">
      <div className="border-b-2 border-gray-300 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{data.personalInfo.name || "Your Name"}</h1>
        <h2 className="text-xl text-indigo-600 mt-1">{data.personalInfo.title || "Professional Title"}</h2>
        
        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-sm">
          {data.personalInfo.email && (
            <div>{data.personalInfo.email}</div>
          )}
          {data.personalInfo.phone && (
            <div>{data.personalInfo.phone}</div>
          )}
          {data.personalInfo.location && (
            <div>{data.personalInfo.location}</div>
          )}
        </div>
      </div>
      
      {data.personalInfo.summary && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-900">Professional Summary</h3>
          <p className="text-gray-700">{data.personalInfo.summary}</p>
        </div>
      )}
      
      {data.experience.length > 0 && data.experience[0].company && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 border-b border-gray-200 pb-1">Work Experience</h3>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">{exp.position || "Position"}</h4>
                  <h5 className="text-indigo-600">{exp.company || "Company"}</h5>
                </div>
                <div className="text-sm text-gray-600">
                  {exp.startDate || "Start Date"} - {exp.endDate || "End Date"}
                </div>
              </div>
              {exp.description && <p className="mt-2 text-sm text-gray-700">{exp.description}</p>}
            </div>
          ))}
        </div>
      )}
      
      {data.education.length > 0 && data.education[0].institution && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 border-b border-gray-200 pb-1">Education</h3>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">{edu.degree || "Degree"} {edu.field ? `in ${edu.field}` : ""}</h4>
                  <h5 className="text-indigo-600">{edu.institution || "Institution"}</h5>
                </div>
                <div className="text-sm text-gray-600">
                  {edu.graduationDate || "Graduation Date"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {data.skills.length > 0 && data.skills[0] && (
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-900 border-b border-gray-200 pb-1">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              skill && (
                <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ExecutiveTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  return (
    <div className="bg-white shadow-lg max-w-[800px] mx-auto border border-gray-200 text-gray-800">
      <div className="bg-blue-900 text-white p-8">
        <h1 className="text-3xl font-bold">{data.personalInfo.name || "Your Name"}</h1>
        <h2 className="text-xl mt-1 text-blue-200">{data.personalInfo.title || "Professional Title"}</h2>
        
        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 text-sm text-blue-100">
          {data.personalInfo.email && (
            <div>{data.personalInfo.email}</div>
          )}
          {data.personalInfo.phone && (
            <div>{data.personalInfo.phone}</div>
          )}
          {data.personalInfo.location && (
            <div>{data.personalInfo.location}</div>
          )}
        </div>
      </div>
      
      <div className="p-8">
        {data.personalInfo.summary && (
          <div className="mb-6 border-l-4 border-blue-900 pl-4">
            <h3 className="text-lg font-semibold mb-2 text-blue-900">Executive Profile</h3>
            <p className="text-gray-700">{data.personalInfo.summary}</p>
          </div>
        )}
        
        {data.experience.length > 0 && data.experience[0].company && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 text-blue-900 border-b border-gray-200 pb-1">Professional Experience</h3>
            {data.experience.map((exp, index) => (
              <div key={index} className="mb-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-gray-900">{exp.position || "Position"}</h4>
                    <h5 className="text-blue-600">{exp.company || "Company"}</h5>
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    {exp.startDate || "Start Date"} - {exp.endDate || "End Date"}
                  </div>
                </div>
                {exp.description && <p className="mt-2 text-gray-700">{exp.description}</p>}
              </div>
            ))}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.education.length > 0 && data.education[0].institution && (
            <div>
              <h3 className="text-lg font-semibold mb-3 text-blue-900 border-b border-gray-200 pb-1">Education</h3>
              {data.education.map((edu, index) => (
                <div key={index} className="mb-3">
                  <h4 className="font-medium text-gray-900">{edu.degree || "Degree"} {edu.field ? `in ${edu.field}` : ""}</h4>
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-600">{edu.institution || "Institution"}</span>
                    <span className="text-gray-600">{edu.graduationDate || "Graduation Date"}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {data.skills.length > 0 && data.skills[0] && (
            <div>
              <h3 className="text-lg font-semibold mb-3 text-blue-900 border-b border-gray-200 pb-1">Areas of Expertise</h3>
              <div className="grid grid-cols-2 gap-2">
                {data.skills.map((skill, index) => (
                  skill && (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-900 rounded-full mr-2"></div>
                      <span className="text-gray-800">{skill}</span>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CreativeTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  return (
    <div className="bg-white shadow-lg max-w-[800px] mx-auto border border-gray-200 text-gray-800">
      <div className="p-8 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white">
        <h1 className="text-4xl font-bold">{data.personalInfo.name || "Your Name"}</h1>
        <h2 className="text-xl mt-2 font-light">{data.personalInfo.title || "Professional Title"}</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        <div className="p-6 bg-gray-100">
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-3 text-purple-600">Contact</h3>
            <ul className="space-y-2 text-sm">
              {data.personalInfo.email && (
                <li>{data.personalInfo.email}</li>
              )}
              {data.personalInfo.phone && (
                <li>{data.personalInfo.phone}</li>
              )}
              {data.personalInfo.location && (
                <li>{data.personalInfo.location}</li>
              )}
            </ul>
          </div>
          
          {data.skills.length > 0 && data.skills[0] && (
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-3 text-purple-600">Skills</h3>
              <div className="space-y-2">
                {data.skills.map((skill, index) => (
                  skill && (
                    <div key={index} className="relative pt-1">
                      <div className="text-xs font-semibold text-gray-700">{skill}</div>
                      <div className="mt-1 w-full bg-gray-300 rounded-full h-2">
                        <div className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full" style={{ width: `${90 - (index * 10)}%` }}></div>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}
          
          {data.education.length > 0 && data.education[0].institution && (
            <div>
              <h3 className="text-lg font-bold mb-3 text-purple-600">Education</h3>
              {data.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <h4 className="font-medium text-gray-900">{edu.degree || "Degree"}</h4>
                  <p className="text-sm text-purple-600">{edu.institution || "Institution"}</p>
                  <p className="text-xs text-gray-600">{edu.field || "Field"}</p>
                  <p className="text-xs text-gray-500">{edu.graduationDate || "Graduation Date"}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="col-span-2 p-6">
          {data.personalInfo.summary && (
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-3 text-purple-600">About Me</h3>
              <p className="text-gray-700">{data.personalInfo.summary}</p>
            </div>
          )}
          
          {data.experience.length > 0 && data.experience[0].company && (
            <div>
              <h3 className="text-lg font-bold mb-4 text-purple-600">Experience</h3>
              {data.experience.map((exp, index) => (
                <div key={index} className="mb-5 relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:bottom-0 before:w-0.5 before:bg-purple-200">
                  <div className="absolute left-0 top-0 w-2 h-2 rounded-full bg-purple-500 -translate-x-[3px]"></div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-gray-900">{exp.position || "Position"}</h4>
                      <h5 className="text-purple-600">{exp.company || "Company"}</h5>
                    </div>
                    <div className="text-xs font-medium text-gray-500">
                      {exp.startDate || "Start Date"} - {exp.endDate || "End Date"}
                    </div>
                  </div>
                  {exp.description && <p className="mt-2 text-sm text-gray-700">{exp.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ModernTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  return (
    <div className="bg-white shadow-lg max-w-[800px] mx-auto border border-gray-200 text-gray-800">
      <div className="flex flex-col md:flex-row">
        <div className="bg-gray-900 text-white p-8 md:w-1/3">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">{data.personalInfo.name || "Your Name"}</h1>
            <h2 className="text-lg mt-1 text-green-400">{data.personalInfo.title || "Professional Title"}</h2>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3 text-green-400">Contact</h3>
            <ul className="space-y-2 text-sm">
              {data.personalInfo.email && (
                <li>{data.personalInfo.email}</li>
              )}
              {data.personalInfo.phone && (
                <li>{data.personalInfo.phone}</li>
              )}
              {data.personalInfo.location && (
                <li>{data.personalInfo.location}</li>
              )}
            </ul>
          </div>
          
          {data.skills.length > 0 && data.skills[0] && (
            <div>
              <h3 className="text-lg font-semibold mb-3 text-green-400">Skills</h3>
              <div className="space-y-1">
                {data.skills.map((skill, index) => (
                  skill && (
                    <span key={index} className="inline-block bg-gray-800 text-white px-2 py-1 rounded text-xs mr-2 mb-2">
                      {skill}
                    </span>
                  )
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="p-8 md:w-2/3">
          {data.personalInfo.summary && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Profile</h3>
              <p className="text-gray-700">{data.personalInfo.summary}</p>
            </div>
          )}
          
          {data.experience.length > 0 && data.experience[0].company && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Experience</h3>
              {data.experience.map((exp, index) => (
                <div key={index} className="mb-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-gray-900">{exp.position || "Position"}</h4>
                      <h5 className="text-green-600">{exp.company || "Company"}</h5>
                    </div>
                    <div className="text-sm font-medium bg-gray-100 px-2 py-1 rounded text-gray-600">
                      {exp.startDate || "Start Date"} - {exp.endDate || "End Date"}
                    </div>
                  </div>
                  {exp.description && <p className="mt-2 text-gray-700">{exp.description}</p>}
                </div>
              ))}
            </div>
          )}
          
          {data.education.length > 0 && data.education[0].institution && (
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Education</h3>
              {data.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">{edu.degree || "Degree"} {edu.field ? `in ${edu.field}` : ""}</h4>
                      <h5 className="text-green-600">{edu.institution || "Institution"}</h5>
                    </div>
                    <div className="text-sm bg-gray-100 px-2 py-1 rounded text-gray-600">
                      {edu.graduationDate || "Graduation Date"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ClassicTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  return (
    <div className="bg-white shadow-lg p-8 max-w-[800px] mx-auto border border-gray-200 text-gray-800">
      <div className="text-center border-b-2 border-gray-300 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 uppercase tracking-wider">{data.personalInfo.name || "Your Name"}</h1>
        <h2 className="text-xl text-gray-600 mt-1">{data.personalInfo.title || "Professional Title"}</h2>
        
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-3 text-sm">
          {data.personalInfo.email && (
            <div>{data.personalInfo.email}</div>
          )}
          {data.personalInfo.phone && (
            <div>{data.personalInfo.phone}</div>
          )}
          {data.personalInfo.location && (
            <div>{data.personalInfo.location}</div>
          )}
        </div>
      </div>
      
      {data.personalInfo.summary && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 uppercase tracking-wider">Summary</h3>
          <div className="h-1 w-16 bg-gray-300 mb-3"></div>
          <p className="text-gray-700">{data.personalInfo.summary}</p>
        </div>
      )}
      
      {data.experience.length > 0 && data.experience[0].company && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 uppercase tracking-wider">Experience</h3>
          <div className="h-1 w-16 bg-gray-300 mb-3"></div>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                  <h4 className="font-bold text-gray-900">{exp.position || "Position"}, {exp.company || "Company"}</h4>
                </div>
                <div className="text-sm text-gray-600 md:text-right">
                  {exp.startDate || "Start Date"} - {exp.endDate || "End Date"}
                </div>
              </div>
              {exp.description && <p className="mt-2 text-gray-700">{exp.description}</p>}
            </div>
          ))}
        </div>
      )}
      
      {data.education.length > 0 && data.education[0].institution && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 uppercase tracking-wider">Education</h3>
          <div className="h-1 w-16 bg-gray-300 mb-3"></div>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                  <h4 className="font-bold text-gray-900">{edu.degree || "Degree"} {edu.field ? `in ${edu.field}` : ""}</h4>
                  <h5>{edu.institution || "Institution"}</h5>
                </div>
                <div className="text-sm text-gray-600 md:text-right">
                  {edu.graduationDate || "Graduation Date"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {data.skills.length > 0 && data.skills[0] && (
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-900 uppercase tracking-wider">Skills</h3>
          <div className="h-1 w-16 bg-gray-300 mb-3"></div>
          <div className="flex flex-wrap">
            {data.skills.map((skill, index) => (
              skill && (
                <span key={index} className="mr-2 mb-2">
                  • {skill}
                </span>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ResumePreview: React.FC<ResumePreviewProps> = ({ resumeData, templateId }) => {
  const renderTemplate = () => {
    switch (templateId) {
      case 1:
        return <ProfessionalTemplate data={resumeData} />;
      case 2:
        return <ExecutiveTemplate data={resumeData} />;
      case 3:
        return <CreativeTemplate data={resumeData} />;
      case 4:
        return <ModernTemplate data={resumeData} />;
      case 5:
        return <ClassicTemplate data={resumeData} />;
      default:
        return <ProfessionalTemplate data={resumeData} />;
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      {renderTemplate()}
    </div>
  );
};

export default ResumePreview;