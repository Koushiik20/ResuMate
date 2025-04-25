import React from 'react';
import { User, Mail, Phone, MapPin, Globe, FileText } from 'lucide-react';
import { useResume } from '../context/ResumeContext';

const PersonalInfoForm: React.FC = () => {
  const { resumeData, updatePersonalInfo } = useResume();
  const { personalInfo } = resumeData;

  return (
    <div className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Personal Information</h2>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="fullName"
              value={personalInfo.fullName}
              onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder=""
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Professional Title
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FileText className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="title"
              value={personalInfo.title}
              onChange={(e) => updatePersonalInfo({ title: e.target.value })}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Software Engineer"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              id="email"
              value={personalInfo.email}
              onChange={(e) => updatePersonalInfo({ email: e.target.value })}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="john.doe@example.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="tel"
              id="phone"
              value={personalInfo.phone}
              onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="+91 123456789"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Location
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="location"
              value={personalInfo.location}
              onChange={(e) => updatePersonalInfo({ location: e.target.value })}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Hyderabad , Telanagana"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="website" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Website (Optional)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Globe className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="url"
              id="website"
              value={personalInfo.website}
              onChange={(e) => updatePersonalInfo({ website: e.target.value })}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="https://yourportfolio.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="summary" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Professional Summary
          </label>
          <textarea
            id="summary"
            value={personalInfo.summary}
            onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
            rows={4}
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="A brief summary of your professional background and goals..."
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;