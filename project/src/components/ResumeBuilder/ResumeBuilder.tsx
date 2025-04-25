import React, { useState, useEffect, useRef } from 'react';
import ResumeForm from './ResumeForm';
import ResumeTemplateSelector from './ResumeTemplateSelector';
import ResumePreview from './ResumePreview';
import { FileDown, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
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

const ResumeBuilder: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState<number>(1);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [showTemplates, setShowTemplates] = useState<boolean>(false);
  const [previewKey, setPreviewKey] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleDataChange = (newData: ResumeData) => {
    setResumeData(newData);
  };

  const handleTemplateSelect = (templateId: number) => {
    setSelectedTemplate(templateId);
    setPreviewKey(prev => prev + 1);
  };

  const handleGeneratePDF = async () => {
    console.log('Download button clicked - DEBUG START');
    console.log('Preview ref:', previewRef.current);
    
    if (!previewRef.current) {
      console.error('Preview element not found');
      setError('Could not find the resume preview element. Please try again.');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      console.log('Starting PDF generation...');
      
      // Create a loading indicator
      const loadingToast = document.createElement('div');
      loadingToast.className = 'fixed top-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded-md shadow-lg z-50';
      loadingToast.textContent = 'Generating PDF...';
      document.body.appendChild(loadingToast);

      // Make sure the preview is fully rendered
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create a clone of the preview element to avoid any styling issues
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
        logging: true,
        backgroundColor: '#ffffff',
        allowTaint: true
      });

      // Remove the clone
      document.body.removeChild(clone);

      console.log('Canvas created successfully');
      console.log('Canvas dimensions:', canvas.width, 'x', canvas.height);
      
      // Create a new PDF document
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Get the PDF dimensions
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      console.log('PDF dimensions:', pdfWidth, 'x', pdfHeight);
      
      // Calculate the dimensions to fit the PDF
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      
      console.log('Image dimensions:', imgWidth, 'x', imgHeight);
      
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
      setIsGenerating(false);
      console.log('Download button clicked - DEBUG END');
    }
  };

  useEffect(() => {
    setPreviewKey(prev => prev + 1);
  }, [selectedTemplate]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Resume Builder</h1>
        <p className="text-gray-600 mt-2">Create a professional resume in minutes</p>
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

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Form */}
        <div className="w-full lg:w-1/2 space-y-6">
          <ResumeForm 
            resumeData={resumeData} 
            onDataChange={handleDataChange}
            onNext={() => setShowTemplates(true)}
          />
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Template Selection</h2>
              <button
                onClick={() => setShowTemplates(!showTemplates)}
                className="text-gray-500 hover:text-gray-700"
              >
                {showTemplates ? (
                  <ChevronUp className="h-6 w-6" />
                ) : (
                  <ChevronDown className="h-6 w-6" />
                )}
              </button>
            </div>
            
            {showTemplates && (
              <ResumeTemplateSelector
                selectedTemplate={selectedTemplate}
                onSelectTemplate={handleTemplateSelect}
                onNext={() => {}}
                onBack={() => {}}
              />
            )}
            
            <div className="mt-6 pt-6 border-t">
              <button 
                className="w-full flex items-center justify-center px-4 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 mb-4"
                onClick={handleGeneratePDF}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <span className="flex items-center">
                    <div className="animate-spin h-5 w-5 mr-3 border-2 border-white border-t-transparent rounded-full"></div>
                    Generating PDF...
                  </span>
                ) : (
                  <>
                    <FileDown className="mr-2 h-5 w-5" />
                    Download PDF
                  </>
                )}
              </button>
              
              <div className="text-center">
                <a 
                  href="/pdf-test" 
                  className="text-sm text-indigo-600 hover:text-indigo-800 mr-4"
                >
                  Test PDF Generation
                </a>
                <a 
                  href="/pdf-test.html" 
                  className="text-sm text-indigo-600 hover:text-indigo-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open PDF Test Page
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Preview */}
        <div className="w-full lg:w-1/2">
          <div className="sticky top-24">
            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Live Preview</h2>
              <p className="text-sm text-gray-600">See how your resume looks as you type</p>
            </div>
            <div ref={previewRef} id="resume-preview-container">
              <ResumePreview 
                key={previewKey}
                resumeData={resumeData} 
                templateId={selectedTemplate} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;