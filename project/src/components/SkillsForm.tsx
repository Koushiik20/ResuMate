import React from 'react';
import { Code, Plus, Trash2 } from 'lucide-react';
import { useResume } from '../context/ResumeContext';

const SkillsForm: React.FC = () => {
  const { resumeData, addSkill, updateSkill, removeSkill } = useResume();
  const { skills } = resumeData;

  return (
    <div className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
          <Code className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
          Skills
        </h2>
        <button
          type="button"
          onClick={addSkill}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Skill
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map((skill) => (
          <div 
            key={skill.id} 
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg flex items-center space-x-4 animate-fadeIn"
          >
            <div className="flex-grow">
              <input
                type="text"
                value={skill.name}
                onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Skill name (e.g., JavaScript, Project Management)"
              />
            </div>
            
            <div className="w-28">
              <select
                value={skill.level}
                onChange={(e) => updateSkill(skill.id, { level: parseInt(e.target.value) })}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm"
              >
                <option value={1}>Beginner</option>
                <option value={2}>Basic</option>
                <option value={3}>Intermediate</option>
                <option value={4}>Advanced</option>
                <option value={5}>Expert</option>
              </select>
            </div>
            
            {skills.length > 1 && (
              <button
                type="button"
                onClick={() => removeSkill(skill.id)}
                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                aria-label="Remove skill"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsForm;