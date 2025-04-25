import React from 'react';
import { CheckCircle } from 'lucide-react';

interface PortfolioTemplate {
  id: number;
  name: string;
  description: string;
  previewUrl: string;
}

interface TemplateSelectorProps {
  templates: PortfolioTemplate[];
  selectedTemplateId: number | null;
  onSelect: (id: number) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  templates,
  selectedTemplateId,
  onSelect,
}) => {
  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-xl font-semibold mb-6 text-center">Choose a Template</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`rounded-lg overflow-hidden shadow-md transition-all cursor-pointer ${
              selectedTemplateId === template.id
                ? 'ring-2 ring-indigo-500 transform scale-[1.02]'
                : 'hover:shadow-lg'
            }`}
            onClick={() => onSelect(template.id)}
          >
            <div className="relative">
              <img
                src={template.previewUrl}
                alt={`${template.name} template`}
                className="w-full h-40 object-cover"
              />
              {selectedTemplateId === template.id && (
                <div className="absolute inset-0 bg-indigo-500 bg-opacity-20 flex items-center justify-center">
                  <CheckCircle className="h-10 w-10 text-white drop-shadow-lg" />
                </div>
              )}
            </div>
            <div className="p-4 bg-white">
              <h3 className="font-semibold">{template.name}</h3>
              <p className="text-sm text-gray-600">{template.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;