import React from 'react';
import { CheckCircle } from 'lucide-react';

interface ResumeTemplateSelectorProps {
  selectedTemplate: number;
  onSelectTemplate: (templateId: number) => void;
  onNext: () => void;
  onBack: () => void;
}

const templateData = [
  {
    id: 1,
    name: "Professional",
    description: "Clean and modern design suitable for all industries",
    bgColor: "bg-blue-50",
    accentColor: "border-blue-400",
    previewImage: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 2,
    name: "Executive",
    description: "Sophisticated design for senior positions",
    bgColor: "bg-purple-50",
    accentColor: "border-purple-400",
    previewImage: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 3,
    name: "Creative",
    description: "Stand out with this design for creative fields",
    bgColor: "bg-pink-50",
    accentColor: "border-pink-400",
    previewImage: "https://images.pexels.com/photos/1764956/pexels-photo-1764956.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 4,
    name: "Modern",
    description: "Contemporary look for tech and digital roles",
    bgColor: "bg-green-50",
    accentColor: "border-green-400",
    previewImage: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 5,
    name: "Classic",
    description: "Traditional format for conservative industries",
    bgColor: "bg-gray-50",
    accentColor: "border-gray-400",
    previewImage: "https://images.pexels.com/photos/331990/pexels-photo-331990.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  }
];

const ResumeTemplateSelector: React.FC<ResumeTemplateSelectorProps> = ({
  selectedTemplate,
  onSelectTemplate,
  onNext,
  onBack
}) => {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-8">Choose a Template</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {templateData.map((template) => (
          <div
            key={template.id}
            className={`border-2 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedTemplate === template.id
                ? `border-indigo-500 shadow-md`
                : "border-transparent hover:border-gray-300"
            }`}
            onClick={() => onSelectTemplate(template.id)}
          >
            <div className="relative">
              <img
                src={template.previewImage}
                alt={`${template.name} template preview`}
                className="w-full h-48 object-cover"
              />
              {selectedTemplate === template.id && (
                <div className="absolute inset-0 bg-indigo-500 bg-opacity-20 flex items-center justify-center">
                  <CheckCircle className="text-white h-12 w-12 drop-shadow-lg" />
                </div>
              )}
            </div>
            <div className={`p-4 ${template.bgColor}`}>
              <h3 className="font-semibold text-lg">{template.name}</h3>
              <p className="text-sm text-gray-600">{template.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Next: Preview Resume
        </button>
      </div>
    </div>
  );
};

export default ResumeTemplateSelector;