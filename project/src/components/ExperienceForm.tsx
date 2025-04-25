import React from 'react';
import { Briefcase, Plus, Trash2 } from 'lucide-react';
import { useResume } from '../context/ResumeContext';

const ExperienceForm: React.FC = () => {
  const { resumeData, addExperience, updateExperience, removeExperience } = useResume();
  const { experience } = resumeData;

  return (
    <div className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
          <Briefcase className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
          Work Experience
        </h2>
        <button
          type="button"
          onClick={addExperience}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Experience
        </button>
      </div>

      {experience.map((exp, index) => (
        <div 
          key={exp.id} 
          className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-4 animate-fadeIn"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-gray-900 dark:text-white">Experience {index + 1}</h3>
            {experience.length > 1 && (
              <button
                type="button"
                onClick={() => removeExperience(exp.id)}
                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                aria-label="Remove experience"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor={`company-${exp.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Company
              </label>
              <input
                type="text"
                id={`company-${exp.id}`}
                value={exp.company}
                onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Company Name"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor={`position-${exp.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Position
              </label>
              <input
                type="text"
                id={`position-${exp.id}`}
                value={exp.position}
                onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Job Title"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor={`startDate-${exp.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Start Date
              </label>
              <input
                type="month"
                id={`startDate-${exp.id}`}
                value={exp.startDate}
                onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor={`endDate-${exp.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  End Date
                </label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`current-${exp.id}`}
                    checked={exp.current}
                    onChange={(e) => {
                      updateExperience(exp.id, { 
                        current: e.target.checked,
                        endDate: e.target.checked ? '' : exp.endDate 
                      });
                    }}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`current-${exp.id}`} className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Current
                  </label>
                </div>
              </div>
              <input
                type="month"
                id={`endDate-${exp.id}`}
                value={exp.endDate}
                onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                disabled={exp.current}
                className={`block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white ${
                  exp.current ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor={`description-${exp.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              id={`description-${exp.id}`}
              value={exp.description}
              onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
              rows={3}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Describe your responsibilities and achievements..."
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExperienceForm;