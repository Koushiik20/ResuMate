import React from 'react';
import { useResume } from '../context/ResumeContext';
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import { Download, RefreshCw } from 'lucide-react';
import html2pdf from 'html2pdf.js';

const ResumePreview: React.FC = () => {
  const { resumeData, resetResume } = useResume();
  const { template } = resumeData;

  const renderTemplate = () => {
    switch (template) {
      case 'modern':
        return <ModernTemplate data={resumeData} />;
      case 'classic':
        return <ClassicTemplate data={resumeData} />;
      case 'creative':
        return <CreativeTemplate data={resumeData} />;
      case 'minimal':
        return <MinimalTemplate data={resumeData} />;
      default:
        return <ModernTemplate data={resumeData} />;
    }
  };

  const handleDownload = () => {
    const element = document.getElementById(template + '-template');
    if (!element) return;

    const options = {
      filename: `${resumeData.personalInfo.fullName || 'resume'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    html2pdf().from(element).set(options).save();
  };

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Preview</h2>
          
          <div className="flex space-x-2">
            <button
              onClick={resetResume}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Reset
            </button>
            
            <button
              onClick={handleDownload}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <Download className="h-4 w-4 mr-1" />
              Download PDF
            </button>
          </div>
        </div>
        
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded overflow-hidden">
          <div className="bg-white shadow-md w-full max-h-[800px] overflow-y-auto scale-90 origin-top mx-auto" style={{ aspectRatio: '1/1.414' }}>
            {renderTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;