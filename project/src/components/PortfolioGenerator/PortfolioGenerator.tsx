import React, { useState } from 'react';
import { FileUp, Globe, ChevronRight, CheckCircle } from 'lucide-react';
import TemplateSelector from './TemplateSelector';

interface PortfolioTemplate {
  id: number;
  name: string;
  description: string;
  previewUrl: string;
}

const templates: PortfolioTemplate[] = [
  {
    id: 1,
    name: "Minimalist",
    description: "Clean, simple design focusing on content",
    previewUrl: "https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 2,
    name: "Creative",
    description: "Bold, colorful design for creative professionals",
    previewUrl: "https://images.pexels.com/photos/5076531/pexels-photo-5076531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 3,
    name: "Corporate",
    description: "Professional design for business and corporate roles",
    previewUrl: "https://images.pexels.com/photos/5076535/pexels-photo-5076535.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 4,
    name: "Modern",
    description: "Contemporary design with a technical feel",
    previewUrl: "https://images.pexels.com/photos/5082567/pexels-photo-5082567.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  }
];

type GenerationStatus = 'idle' | 'uploading' | 'generating' | 'deploying' | 'complete';

const PortfolioGenerator: React.FC = () => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(null);
  const [status, setStatus] = useState<GenerationStatus>('idle');
  const [progress, setProgress] = useState<number>(0);
  const [portfolioUrl, setPortfolioUrl] = useState<string>('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setResumeFile(e.target.files[0]);
    }
  };
  
  const handleTemplateSelect = (templateId: number) => {
    setSelectedTemplateId(templateId);
  };
  
  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleGenerate = () => {
    if (!resumeFile || !selectedTemplateId) return;
    
    setStatus('uploading');
    setProgress(10);
    
    // Simulate the multi-step process
    setTimeout(() => {
      setStatus('generating');
      setProgress(40);
      
      setTimeout(() => {
        setStatus('deploying');
        setProgress(75);
        
        setTimeout(() => {
          setStatus('complete');
          setProgress(100);
          setPortfolioUrl('https://your-name-portfolio.netlify.app');
        }, 3000);
      }, 3000);
    }, 2000);
  };
  
  const renderProgressSteps = () => {
    const steps = [
      { key: 'upload', label: 'Resume Upload', status: 'uploading' },
      { key: 'generate', label: 'Site Generation', status: 'generating' },
      { key: 'deploy', label: 'Deployment', status: 'deploying' },
      { key: 'complete', label: 'Complete', status: 'complete' }
    ];
    
    return (
      <div className="max-w-3xl mx-auto">
        <div className="relative">
          <div className="overflow-hidden h-2 mb-6 text-xs flex rounded bg-gray-200">
            <div 
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600 transition-all duration-500 ease-in-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className="flex text-sm justify-between">
            {steps.map((step, i) => {
              const isActive = status === step.status || 
                (status === 'complete' && step.status !== 'complete') ||
                (status === 'deploying' && (step.status === 'uploading' || step.status === 'generating')) ||
                (status === 'generating' && step.status === 'uploading');
              
              const isComplete = 
                (status === 'complete') ||
                (status === 'deploying' && (step.status === 'uploading' || step.status === 'generating')) ||
                (status === 'generating' && step.status === 'uploading');
              
              const isCurrent = status === step.status;
              
              return (
                <div key={step.key} className="flex flex-col items-center w-1/4 relative">
                  <div 
                    className={`w-6 h-6 rounded-full mb-1 flex items-center justify-center ${
                      isActive 
                        ? isComplete
                          ? 'bg-green-500 text-white'
                          : 'bg-indigo-600 text-white animate-pulse'
                        : 'bg-gray-300 text-gray-500'
                    }`}
                  >
                    {isComplete ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <span className="text-xs">{i + 1}</span>
                    )}
                  </div>
                  <div className={`text-xs text-center ${isCurrent ? 'font-semibold text-indigo-600' : isComplete ? 'text-green-600' : 'text-gray-500'}`}>
                    {step.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };
  
  const renderStatusMessage = () => {
    switch (status) {
      case 'uploading':
        return "Uploading and parsing your resume...";
      case 'generating':
        return "Converting resume into portfolio website...";
      case 'deploying':
        return "Deploying your portfolio to the web...";
      case 'complete':
        return "Your portfolio website is live!";
      default:
        return "";
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Portfolio Generator</h1>
        <p className="text-gray-600 mt-2">
          Transform your resume into a professional portfolio website in minutes
        </p>
      </div>
      
      {status === 'idle' ? (
        <>
          <div className="max-w-3xl mx-auto mb-10 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Upload Your Resume</h2>
            <p className="text-gray-600 mb-6">
              We'll extract information from your resume to create your personalized portfolio
            </p>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
              />
              
              {resumeFile ? (
                <div className="flex items-center justify-center space-x-2">
                  <FileUp className="h-5 w-5 text-green-500" />
                  <span className="font-medium text-green-500">{resumeFile.name}</span>
                </div>
              ) : (
                <>
                  <FileUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">Drag and drop your resume, or</p>
                </>
              )}
              
              <button
                onClick={handleBrowseClick}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                {resumeFile ? 'Choose a Different File' : 'Browse Files'}
              </button>
            </div>
          </div>
          
          <TemplateSelector
            templates={templates}
            selectedTemplateId={selectedTemplateId}
            onSelect={handleTemplateSelect}
          />
          
          <div className="text-center mt-10">
            <button
              onClick={handleGenerate}
              disabled={!resumeFile || !selectedTemplateId}
              className={`inline-flex items-center px-6 py-3 rounded-md ${
                !resumeFile || !selectedTemplateId
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              Generate Portfolio
              <ChevronRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </>
      ) : (
        <div className="max-w-4xl mx-auto">
          {renderProgressSteps()}
          
          <div className="mt-10 bg-white rounded-lg p-8 shadow-md text-center">
            <div className="mb-6">
              {status === 'complete' ? (
                <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-10 w-10 text-green-500" />
                </div>
              ) : (
                <div className="w-20 h-20 mx-auto border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
              )}
            </div>
            
            <h2 className="text-2xl font-bold mb-2 text-gray-900">
              {renderStatusMessage()}
            </h2>
            
            {status === 'complete' ? (
              <div className="mt-6">
                <div className="flex items-center justify-center mb-4">
                  <Globe className="h-5 w-5 text-indigo-500 mr-2" />
                  <a 
                    href={portfolioUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-indigo-500 font-medium hover:underline"
                  >
                    {portfolioUrl}
                  </a>
                </div>
                
                <p className="text-gray-600 mb-6">
                  Your portfolio is now live and accessible from the URL above
                </p>
                
                <div className="space-x-4">
                  <a 
                    href={portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 inline-block"
                  >
                    View Portfolio
                  </a>
                  
                  <button
                    onClick={() => {
                      setStatus('idle');
                      setProgress(0);
                      setResumeFile(null);
                      setSelectedTemplateId(null);
                      setPortfolioUrl('');
                    }}
                    className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                  >
                    Create Another
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-6">
                <p className="text-gray-500 text-sm mb-4 animated-pulse">
                  This process typically takes 30-60 seconds
                </p>
                
                {status === 'generating' && (
                  <div className="max-w-md mx-auto text-left">
                    <div className="text-sm text-gray-500 mb-2">Working on:</div>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Extracting contact information
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Building experience section
                      </li>
                      <li className="flex items-center">
                        <div className="h-4 w-4 rounded-full border-2 border-indigo-200 border-t-indigo-600 animate-spin mr-2"></div>
                        Creating skills visualization
                      </li>
                      <li className="flex items-center text-gray-400">
                        <div className="h-4 w-4 rounded-full border border-gray-300 mr-2"></div>
                        Generating project showcase
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioGenerator;