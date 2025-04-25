import React, { useState, useEffect, useRef } from 'react';
import { FileDown, Globe, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import ResumeForm from '../ResumeBuilder/ResumeForm';
import ResumeTemplateSelector from '../ResumeBuilder/ResumeTemplateSelector';
import ResumePreview from '../ResumeBuilder/ResumePreview';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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

const initialResumeData: ResumeData = {
  personalInfo: {
    name: "",
    email: "",
    phone: "",
    location: "",
    title: "",
    summary: "",
  },
  experience: [{
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    description: "",
  }],
  education: [{
    institution: "",
    degree: "",
    field: "",
    graduationDate: "",
  }],
  skills: [""],
};

type GenerationStep = 'form' | 'templates' | 'generating' | 'complete';

const EndToEnd: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [selectedResumeTemplate, setSelectedResumeTemplate] = useState<number>(1);
  const [currentStep, setCurrentStep] = useState<GenerationStep>('form');
  const [portfolioUrl, setPortfolioUrl] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [previewKey, setPreviewKey] = useState<number>(0);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState<boolean>(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleDataChange = (newData: ResumeData) => {
    setResumeData(newData);
  };

  const handleResumeTemplateSelect = (templateId: number) => {
    setSelectedResumeTemplate(templateId);
    setPreviewKey(prev => prev + 1);
  };

  const handleGenerate = async () => {
    setCurrentStep('generating');
    setError(null);
    
    try {
      
      setProgress(10);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProgress(30);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProgress(50);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProgress(70);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProgress(90);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProgress(100);
      setPortfolioUrl('https://your-portfolio.netlify.app');
      setCurrentStep('complete');
    } catch (err) {
      setError('An error occurred during generation. Please try again.');
      console.error(err);
      setCurrentStep('templates');
    }
  };

  const handleDownloadResume = async () => {
    console.log('Download button clicked');
    
    if (!previewRef.current) {
      console.error('Preview element not found');
      setError('Could not find the resume preview element. Please try again.');
      return;
    }

    setIsGeneratingPDF(true);
    setError(null);

    try {
      console.log('Starting PDF generation...');
      
      
      const loadingToast = document.createElement('div');
      loadingToast.className = 'fixed top-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded-md shadow-lg z-50';
      loadingToast.textContent = 'Generating PDF...';
      document.body.appendChild(loadingToast);

     
      await new Promise(resolve => setTimeout(resolve, 1000));

      
      const clone = previewRef.current.cloneNode(true) as HTMLElement;
      clone.style.position = 'absolute';
    
      clone.style.left = '-9999px';
      clone.style.top = '-9999px';
      document.body.appendChild(clone);

      console.log('Capturing resume preview...');
      
      // Capture the resume preview as an image
      const canvas = await html2canvas(clone, {
        scale: 1.5,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        allowTaint: true
      });

      // Remove the clone
      document.body.removeChild(clone);

      console.log('Canvas created successfully');
      
      // Create a new PDF document
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Get the PDF dimensions
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Calculate the dimensions to fit the PDF
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      
      // Add the image to the PDF
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
      
      // Save the PDF
      const fileName = `${resumeData.personalInfo.name || 'resume'}.pdf`;
      pdf.save(fileName);
      
      console.log('PDF saved successfully');
      
      // Remove the loading indicator
      document.body.removeChild(loadingToast);
      
      // Show success message
      const successToast = document.createElement('div');
      successToast.className = 'fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-md shadow-lg z-50';
      successToast.textContent = 'PDF downloaded successfully!';
      document.body.appendChild(successToast);
      setTimeout(() => {
        document.body.removeChild(successToast);
      }, 3000);
      
    } catch (error) {
      console.error('PDF generation error:', error);
      setError('Failed to generate PDF. Please try again.');
      
      // Show detailed error in console for debugging
      if (error instanceof Error) {
        console.error('Error details:', error.message);
        console.error('Error stack:', error.stack);
      }
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'form':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Enter Your Information</h2>
              <ResumeForm
                resumeData={resumeData}
                onDataChange={handleDataChange}
                onNext={() => setCurrentStep('templates')}
              />
            </div>
          </div>
        );

      case 'templates':
        return (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4">Choose Resume Template</h2>
                  <ResumeTemplateSelector
                    selectedTemplate={selectedResumeTemplate}
                    onSelectTemplate={handleResumeTemplateSelect}
                    onNext={() => {}}
                    onBack={() => {}}
                  />
                </div>
              </div>
              
              <div>
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4">Preview</h2>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div ref={previewRef} id="resume-preview-container">
                      <ResumePreview 
                        key={previewKey}
                        resumeData={resumeData} 
                        templateId={selectedResumeTemplate} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <button
                onClick={handleGenerate}
                className="px-8 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 inline-flex items-center"
              >
                Generate Resume & Portfolio
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        );

      case 'generating':
        return (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="mb-6">
                <div className="w-20 h-20 mx-auto border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
              </div>
              
              <h2 className="text-2xl font-bold mb-4">Generating Your Assets</h2>
              <div className="mb-8">
                <div className="h-2 bg-gray-200 rounded-full mb-2">
                  <div
                    className="h-2 bg-indigo-600 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-600">{progress}% complete</div>
              </div>
              
              <div className="space-y-4 text-left max-w-md mx-auto">
                <div className="flex items-center">
                  {progress >= 30 ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  ) : (
                    <div className="h-5 w-5 border-2 border-gray-300 rounded-full mr-3"></div>
                  )}
                  <span className="text-gray-700">Generating resume PDF</span>
                </div>
                
                <div className="flex items-center">
                  {progress >= 60 ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  ) : (
                    <div className="h-5 w-5 border-2 border-gray-300 rounded-full mr-3"></div>
                  )}
                  <span className="text-gray-700">Creating portfolio website</span>
                </div>
                
                <div className="flex items-center">
                  {progress >= 90 ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  ) : (
                    <div className="h-5 w-5 border-2 border-gray-300 rounded-full mr-3"></div>
                  )}
                  <span className="text-gray-700">Deploying to the web</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'complete':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>
              
              <h2 className="text-2xl font-bold mb-2">Generation Complete!</h2>
              <p className="text-gray-600 mb-8">
                Your resume and portfolio website have been successfully created
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center justify-center mb-4">
                    <FileDown className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Resume PDF</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Download your professionally formatted resume
                  </p>
                  <button
                    onClick={handleDownloadResume}
                    disabled={isGeneratingPDF}
                    className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed"
                  >
                    {isGeneratingPDF ? (
                      <span className="flex items-center justify-center">
                        <div className="animate-spin h-5 w-5 mr-3 border-2 border-white border-t-transparent rounded-full"></div>
                        Generating PDF...
                      </span>
                    ) : (
                      'Download Resume'
                    )}
                  </button>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center justify-center mb-4">
                    <Globe className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Portfolio Website</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    View your online portfolio
                  </p>
                  <a
                    href={portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-center"
                  >
                    Visit Website
                  </a>
                  <p className="text-sm text-gray-500 mt-2">{portfolioUrl}</p>
                </div>
              </div>
              
              <button
                onClick={() => {
                  setCurrentStep('form');
                  setResumeData(initialResumeData);
                  setProgress(0);
                  setPortfolioUrl('');
                  setError(null);
                }}
                className="mt-8 px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Create Another
              </button>
            </div>
          </div>
        );
    }
  };

  // Add a hidden preview element in the complete step for PDF generation
  const renderHiddenPreview = () => {
    if (currentStep === 'complete') {
      return (
        <div className="hidden">
          <div ref={previewRef} id="resume-preview-container">
            <ResumePreview 
              key={previewKey}
              resumeData={resumeData} 
              templateId={selectedResumeTemplate} 
            />
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Resume & Portfolio Generator</h1>
        <p className="text-gray-600 mt-2">
          Create your professional resume and portfolio website in one go
        </p>
      </div>

      {error && (
        <div className="max-w-3xl mx-auto mb-6">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8">
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
              <div
                style={{ width: `${(currentStep === 'form' ? 33 : currentStep === 'templates' ? 66 : 100)}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600 transition-all duration-500"
              ></div>
            </div>
            <div className="flex justify-between text-sm font-medium text-gray-600">
              <div className={currentStep === 'form' ? 'text-indigo-600' : ''}>Enter Details</div>
              <div className={currentStep === 'templates' ? 'text-indigo-600' : ''}>Choose Templates</div>
              <div className={currentStep === 'generating' || currentStep === 'complete' ? 'text-indigo-600' : ''}>
                Generate & Deploy
              </div>
            </div>
          </div>
        </div>
      </div>

      {renderStep()}
      {renderHiddenPreview()}
    </div>
  );
};

export default EndToEnd;