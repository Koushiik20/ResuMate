import React from 'react';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import { useResume } from '../context/ResumeContext';

const EducationForm: React.FC = () => {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResume();
  const { education } = resumeData;

  return (
    <div className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
          <GraduationCap className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
          Education
        </h2>
        <button
          type="button"
          onClick={addEducation}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Education
        </button>
      </div>

      {education.map((edu, index) => (
        <div 
          key={edu.id} 
          className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-4 animate-fadeIn"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-gray-900 dark:text-white">Education {index + 1}</h3>
            {education.length > 1 && (
              <button
                type="button"
                onClick={() => removeEducation(edu.id)}
                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                aria-label="Remove education"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor={`institution-${edu.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Institution
              </label>
              <input
                type="text"
                id={`institution-${edu.id}`}
                value={edu.institution}
                onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="University Name"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor={`degree-${edu.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Degree
              </label>
              <input
                type="text"
                id={`degree-${edu.id}`}
                value={edu.degree}
                onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Bachelor's, Master's, etc."
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor={`field-${edu.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Field of Study
            </label>
            <input
              type="text"
              id={`field-${edu.id}`}
              value={edu.field}
              onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Computer Science, Business, etc."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor={`eduStartDate-${edu.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Start Date
              </label>
              <input
                type="month"
                id={`eduStartDate-${edu.id}`}
                value={edu.startDate}
                onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor={`eduEndDate-${edu.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  End Date
                </label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`eduCurrent-${edu.id}`}
                    checked={edu.current}
                    onChange={(e) => {
                      updateEducation(edu.id, { 
                        current: e.target.checked,
                        endDate: e.target.checked ? '' : edu.endDate 
                      });
                    }}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`eduCurrent-${edu.id}`} className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Current
                  </label>
                </div>
              </div>
              <input
                type="month"
                id={`eduEndDate-${edu.id}`}
                value={edu.endDate}
                onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                disabled={edu.current}
                className={`block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white ${
                  edu.current ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor={`eduDescription-${edu.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description (Optional)
            </label>
            <textarea
              id={`eduDescription-${edu.id}`}
              value={edu.description || ''}
              onChange={(e) => updateEducation(edu.id, { description: e.target.value })}
              rows={2}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Relevant coursework, achievements, etc..."
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default EducationForm;