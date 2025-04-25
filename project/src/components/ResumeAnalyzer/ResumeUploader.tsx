import React, { useState, useRef } from 'react';
import { UploadCloud, FilePlus2, File } from 'lucide-react';

interface ResumeUploaderProps {
  onUpload: (file: File) => void;
  disabled: boolean;
}

const ResumeUploader: React.FC<ResumeUploaderProps> = ({ onUpload, disabled }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (disabled) return;
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (isValidFile(file)) {
        setSelectedFile(file);
      }
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (isValidFile(file)) {
        setSelectedFile(file);
      }
    }
  };
  
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  
  const isValidFile = (file: File): boolean => {
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a PDF or Word document');
      return false;
    }
    return true;
  };
  
  const handleSubmit = () => {
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Upload Your Resume</h2>
      <p className="text-gray-600 mb-6">
        Upload your resume to get personalized feedback and recommendations
      </p>
      
      <div
        className={`border-2 border-dashed rounded-lg p-8 transition-colors ${
          isDragging 
            ? 'border-indigo-500 bg-indigo-50' 
            : disabled 
              ? 'border-gray-200 bg-gray-50 cursor-not-allowed' 
              : 'border-gray-300 hover:border-indigo-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="text-center">
          <div className="mx-auto w-14 h-14 mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <UploadCloud className={`h-8 w-8 ${disabled ? 'text-gray-400' : 'text-indigo-500'}`} />
          </div>
          
          <p className={`mb-2 font-medium ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>
            Drag and drop your resume here
          </p>
          <p className={`text-sm mb-4 ${disabled ? 'text-gray-400' : 'text-gray-500'}`}>
            Supported formats: PDF, DOC, DOCX
          </p>
          
          <button
            type="button"
            onClick={handleButtonClick}
            disabled={disabled}
            className={`px-4 py-2 rounded-md ${
              disabled 
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
            }`}
          >
            <FilePlus2 className="w-4 h-4 mr-2 inline-block" /> 
            Browse Files
          </button>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
            className="hidden"
            disabled={disabled}
          />
        </div>
      </div>
      
      {selectedFile && (
        <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50 flex items-center justify-between">
          <div className="flex items-center">
            <File className="h-6 w-6 text-indigo-500 mr-3" />
            <div>
              <p className="font-medium text-gray-800">{selectedFile.name}</p>
              <p className="text-sm text-gray-500">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Analyze Resume
          </button>
        </div>
      )}
      
      {disabled && (
        <div className="mt-4 text-center text-sm text-amber-600 bg-amber-50 p-3 rounded-md">
          Please select a job role first before uploading your resume
        </div>
      )}
    </div>
  );
};

export default ResumeUploader;