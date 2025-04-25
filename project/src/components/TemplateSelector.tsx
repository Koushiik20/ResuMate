import React from 'react';
import { useResume } from '../context/ResumeContext';

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and professional design with a modern touch.',
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional resume layout that works for any industry.',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold design for creative professionals.',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and elegant design with focus on content.',
  },
];

const TemplateSelector: React.FC = () => {
  const { resumeData, setTemplate } = useResume();
  const currentTemplate = resumeData.template;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Choose a Template</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`
              cursor-pointer p-4 rounded-lg border-2 transition-all duration-200
              ${currentTemplate === template.id 
                ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-500' 
                : 'border-gray-200 hover:border-blue-300 dark:border-gray-700 dark:hover:border-blue-700'}
            `}
            onClick={() => setTemplate(template.id)}
          >
            <div className="aspect-[8.5/11] mb-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 flex items-center justify-center">
              <div className={`w-full h-full p-2 ${template.id}-template-thumbnail`}></div>
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white">{template.name}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{template.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;