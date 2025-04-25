import React, { useState } from 'react';
import { 
  Briefcase, 
  Server, 
  Code, 
  Palette, 
  BarChart3, 
  Calendar, 
  ShieldCheck, 
  Smartphone 
} from 'lucide-react';

interface JobRoleSelectorProps {
  onRoleSelect: (role: string) => void;
}

interface JobRole {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}

const roles: JobRole[] = [
  {
    id: 'frontend',
    title: 'Frontend Developer',
    icon: <Code className="h-8 w-8 text-indigo-500" />,
    description: 'Building user interfaces and web applications'
  },
  {
    id: 'backend',
    title: 'Backend Developer',
    icon: <Server className="h-8 w-8 text-indigo-500" />,
    description: 'Creating APIs and server-side applications'
  },
  {
    id: 'ux',
    title: 'UX Designer',
    icon: <Palette className="h-8 w-8 text-indigo-500" />,
    description: 'Designing user experiences and interfaces'
  },
  {
    id: 'data',
    title: 'Data Scientist',
    icon: <BarChart3 className="h-8 w-8 text-indigo-500" />,
    description: 'Analyzing data and building ML models'
  },
  {
    id: 'project',
    title: 'Project Manager',
    icon: <Calendar className="h-8 w-8 text-indigo-500" />,
    description: 'Coordinating projects and teams'
  },
  {
    id: 'security',
    title: 'Security Engineer',
    icon: <ShieldCheck className="h-8 w-8 text-indigo-500" />,
    description: 'Securing applications and infrastructure'
  },
  {
    id: 'mobile',
    title: 'Mobile Developer',
    icon: <Smartphone className="h-8 w-8 text-indigo-500" />,
    description: 'Creating iOS and Android applications'
  },
  {
    id: 'custom',
    title: 'Custom Role',
    icon: <Briefcase className="h-8 w-8 text-indigo-500" />,
    description: 'Define your own role and requirements'
  }
];

const JobRoleSelector: React.FC<JobRoleSelectorProps> = ({ onRoleSelect }) => {
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const [customRole, setCustomRole] = useState<string>('');
  
  const handleRoleClick = (role: JobRole) => {
    setSelectedRoleId(role.id);
  };
  
  const handleContinue = () => {
    if (!selectedRoleId) return;
    
    if (selectedRoleId === 'custom') {
      if (customRole.trim()) {
        onRoleSelect(customRole);
      }
    } else {
      const role = roles.find(r => r.id === selectedRoleId);
      if (role) {
        onRoleSelect(role.title);
      }
    }
  };
  
  return (
    <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-semibold mb-2 text-center">Select a Job Role</h2>
      <p className="text-gray-600 mb-8 text-center">
        Choose the position you're hiring for to start screening candidates
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {roles.map((role) => (
          <div
            key={role.id}
            className={`border rounded-lg p-5 cursor-pointer transition-all ${
              selectedRoleId === role.id
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
            }`}
            onClick={() => handleRoleClick(role)}
          >
            <div className="mb-3">{role.icon}</div>
            <h3 className="font-medium text-gray-900 mb-1">{role.title}</h3>
            <p className="text-sm text-gray-500">{role.description}</p>
          </div>
        ))}
      </div>
      
      {selectedRoleId === 'custom' && (
        <div className="mb-8">
          <label htmlFor="custom-role" className="block text-sm font-medium text-gray-700 mb-1">
            Custom Job Title
          </label>
          <input
            type="text"
            id="custom-role"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter the job title"
            value={customRole}
            onChange={(e) => setCustomRole(e.target.value)}
          />
        </div>
      )}
      
      <div className="text-center">
        <button
          onClick={handleContinue}
          disabled={!selectedRoleId || (selectedRoleId === 'custom' && !customRole.trim())}
          className={`px-6 py-3 rounded-md ${
            !selectedRoleId || (selectedRoleId === 'custom' && !customRole.trim())
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default JobRoleSelector;