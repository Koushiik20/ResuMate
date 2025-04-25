import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

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

interface ResumeFormProps {
  resumeData: ResumeData;
  onDataChange: (data: ResumeData) => void;
  onNext: () => void;
}

const ResumeForm: React.FC<ResumeFormProps> = ({ resumeData, onDataChange, onNext }) => {
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onDataChange({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [name]: value,
      },
    });
  };

  const handleExperienceChange = (index: number, field: string, value: string) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value,
    };
    onDataChange({
      ...resumeData,
      experience: updatedExperience,
    });
  };

  const addExperience = () => {
    onDataChange({
      ...resumeData,
      experience: [
        ...resumeData.experience,
        {
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    });
  };

  const removeExperience = (index: number) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience.splice(index, 1);
    onDataChange({
      ...resumeData,
      experience: updatedExperience,
    });
  };

  const handleEducationChange = (index: number, field: string, value: string) => {
    const updatedEducation = [...resumeData.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value,
    };
    onDataChange({
      ...resumeData,
      education: updatedEducation,
    });
  };

  const addEducation = () => {
    onDataChange({
      ...resumeData,
      education: [
        ...resumeData.education,
        {
          institution: "",
          degree: "",
          field: "",
          graduationDate: "",
        },
      ],
    });
  };

  const removeEducation = (index: number) => {
    const updatedEducation = [...resumeData.education];
    updatedEducation.splice(index, 1);
    onDataChange({
      ...resumeData,
      education: updatedEducation,
    });
  };

  const handleSkillChange = (index: number, value: string) => {
    const updatedSkills = [...resumeData.skills];
    updatedSkills[index] = value;
    onDataChange({
      ...resumeData,
      skills: updatedSkills,
    });
  };

  const addSkill = () => {
    onDataChange({
      ...resumeData,
      skills: [...resumeData.skills, ""],
    });
  };

  const removeSkill = (index: number) => {
    const updatedSkills = [...resumeData.skills];
    updatedSkills.splice(index, 1);
    onDataChange({
      ...resumeData,
      skills: updatedSkills,
    });
  };

  const isFormValid = () => {
    // Basic validation - check if required fields are filled
    return (
      resumeData.personalInfo.name.trim() !== "" &&
      resumeData.personalInfo.email.trim() !== ""
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input
              type="text"
              name="name"
              value={resumeData.personalInfo.name}
              onChange={handlePersonalInfoChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Professional Title</label>
            <input
              type="text"
              name="title"
              value={resumeData.personalInfo.title}
              onChange={handlePersonalInfoChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              name="email"
              value={resumeData.personalInfo.email}
              onChange={handlePersonalInfoChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={resumeData.personalInfo.phone}
              onChange={handlePersonalInfoChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={resumeData.personalInfo.location}
              onChange={handlePersonalInfoChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="City, State, Country"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
            <textarea
              name="summary"
              value={resumeData.personalInfo.summary}
              onChange={handlePersonalInfoChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Brief overview of your experience and strengths"
            />
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Work Experience</h2>
          <button
            type="button"
            onClick={addExperience}
            className="flex items-center text-sm text-indigo-600 hover:text-indigo-800"
          >
            <Plus size={16} className="mr-1" /> Add Experience
          </button>
        </div>

        {resumeData.experience.map((exp, index) => (
          <div key={index} className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-medium">Experience {index + 1}</h3>
              {resumeData.experience.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) => handleExperienceChange(index, "position", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="text"
                  value={exp.startDate}
                  onChange={(e) => handleExperienceChange(index, "startDate", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="MM/YYYY"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="text"
                  value={exp.endDate}
                  onChange={(e) => handleExperienceChange(index, "endDate", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="MM/YYYY or Present"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={exp.description}
                  onChange={(e) => handleExperienceChange(index, "description", e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Describe your responsibilities and achievements"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Education</h2>
          <button
            type="button"
            onClick={addEducation}
            className="flex items-center text-sm text-indigo-600 hover:text-indigo-800"
          >
            <Plus size={16} className="mr-1" /> Add Education
          </button>
        </div>

        {resumeData.education.map((edu, index) => (
          <div key={index} className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-medium">Education {index + 1}</h3>
              {resumeData.education.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => handleEducationChange(index, "institution", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
                <input
                  type="text"
                  value={edu.field}
                  onChange={(e) => handleEducationChange(index, "field", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Graduation Date</label>
                <input
                  type="text"
                  value={edu.graduationDate}
                  onChange={(e) => handleEducationChange(index, "graduationDate", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="MM/YYYY or Expected MM/YYYY"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Skills</h2>
          <button
            type="button"
            onClick={addSkill}
            className="flex items-center text-sm text-indigo-600 hover:text-indigo-800"
          >
            <Plus size={16} className="mr-1" /> Add Skill
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {resumeData.skills.map((skill, index) => (
            <div key={index} className="flex items-center">
              <input
                type="text"
                value={skill}
                onChange={(e) => handleSkillChange(index, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g., Python, Project Management"
              />
              {resumeData.skills.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="px-2 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="text-right">
        <button
          type="button"
          onClick={onNext}
          disabled={!isFormValid()}
          className={`px-6 py-2 rounded-md ${
            isFormValid()
              ? "bg-indigo-600 text-white hover:bg-indigo-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Next: Choose Template
        </button>
      </div>
    </div>
  );
};

export default ResumeForm;