import React from 'react';
import { FileText, FileCheck, Globe, Users } from 'lucide-react';
import { useNavigation } from '../hooks/useNavigation';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  path: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description, path }) => {
  const { setCurrentPath } = useNavigation();
  
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md transition-transform hover:scale-105">
      <div className="p-3 bg-indigo-100 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-center mb-4">{description}</p>
      <button
        onClick={() => setCurrentPath(path)}
        className="mt-auto px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors"
      >
        Try Now
      </button>
    </div>
  );
};

const Hero: React.FC = () => {
  return (
    <div className="px-4 py-12 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Accelerate Your Career with AI
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-gray-600">
          Our platform automates the entire job-seeking experience, from resume creation to landing your dream job.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <Feature
          icon={<FileText className="h-6 w-6 text-indigo-600" />}
          title="Resume Builder"
          description="Create professional resumes with AI assistance and modern templates."
          path="/resume-builder"
        />
        <Feature
          icon={<FileCheck className="h-6 w-6 text-indigo-600" />}
          title="Resume Analyzer"
          description="Get AI-powered feedback and learn how to improve your resume."
          path="/resume-analyzer"
        />
        <Feature
          icon={<Globe className="h-6 w-6 text-indigo-600" />}
          title="Portfolio Generator"
          description="Convert your resume into a stunning portfolio website instantly."
          path="/portfolio-generator"
        />
        <Feature
          icon={<Users className="h-6 w-6 text-indigo-600" />}
          title="HR Tools"
          description="For employers: screen candidates efficiently with AI assistance."
          path="/hr-module"
        />
      </div>
      
      <div className="mt-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Why Choose Resumelytics?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-3">AI-Powered</h3>
            <p className="text-gray-600">Our AI analyzes thousands of successful resumes to give you the best advice.</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-3">Time-Saving</h3>
            <p className="text-gray-600">Automate tedious parts of job hunting and focus on what matters.</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-3">Higher Success Rate</h3>
            <p className="text-gray-600">Users report 80% higher interview rates after using our platform.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;