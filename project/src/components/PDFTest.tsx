import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useNavigation } from '../hooks/useNavigation';

const PDFTest: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { setCurrentPath } = useNavigation();

  const handleGeneratePDF = async () => {
    console.log('Test PDF generation - START');
    
    if (!contentRef.current) {
      console.error('Content element not found');
      return;
    }

    try {
      console.log('Starting PDF generation...');
      
      // Create a loading indicator
      const loadingToast = document.createElement('div');
      loadingToast.className = 'fixed top-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded-md shadow-lg z-50';
      loadingToast.textContent = 'Generating PDF...';
      document.body.appendChild(loadingToast);

      // Make sure the content is fully rendered
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create a clone of the content element to avoid any styling issues
      const clone = contentRef.current.cloneNode(true) as HTMLElement;
      clone.style.position = 'absolute';
      clone.style.left = '-9999px';
      clone.style.top = '-9999px';
      document.body.appendChild(clone);

      console.log('Capturing content...');
      
      // Capture the content as an image
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
      pdf.save('test.pdf');
      
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
      
      // Show detailed error in console for debugging
      if (error instanceof Error) {
        console.error('Error details:', error.message);
        console.error('Error stack:', error.stack);
      }
    } finally {
      console.log('Test PDF generation - END');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">PDF Generation Test</h1>
      
      <div className="mb-6 flex space-x-4">
        <button 
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          onClick={handleGeneratePDF}
        >
          Generate Test PDF
        </button>
        
        <button 
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          onClick={() => setCurrentPath('/resume-builder')}
        >
          Back to Resume Builder
        </button>
      </div>
      
      <div 
        ref={contentRef} 
        className="bg-white p-6 rounded-lg shadow-md max-w-2xl"
      >
        <h2 className="text-2xl font-bold mb-4">Test Content</h2>
        <p className="mb-4">
          This is a test content for PDF generation. If this works, we can apply the same approach to the resume builder.
        </p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="font-bold mb-2">Section 1</h3>
            <p>Some content for section 1</p>
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="font-bold mb-2">Section 2</h3>
            <p>Some content for section 2</p>
          </div>
        </div>
        <div className="border-t pt-4">
          <p className="text-sm text-gray-500">
            This is a footer section with some additional information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PDFTest; 