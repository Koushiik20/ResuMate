import React, { useState, useEffect } from 'react';
import { Search, UserCheck, Clock, MoreHorizontal, PhoneCall, X, User, Send } from 'lucide-react';
import JobRoleSelector from './JobRoleSelector';
import CandidateList from './CandidateList';
import CandidateSummary from './CandidateSummary';

type ApplicationStatus = 'pending' | 'reviewed' | 'interview' | 'rejected' | 'hired';

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  skillMatch: number;
  lastCompany: string;
  experience: number;
  status: ApplicationStatus;
  appliedDate: string;
  resumeUrl: string;
}

const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '(555) 123-4567',
    skillMatch: 95,
    lastCompany: 'Google',
    experience: 5,
    status: 'pending',
    appliedDate: '2025-01-15',
    resumeUrl: '#',
  },
  {
    id: '2',
    name: 'Jamie Smith',
    email: 'jamie.smith@example.com',
    phone: '(555) 987-6543',
    skillMatch: 88,
    lastCompany: 'Microsoft',
    experience: 7,
    status: 'pending',
    appliedDate: '2025-01-17',
    resumeUrl: '#',
  },
  {
    id: '3',
    name: 'Taylor Williams',
    email: 'taylor.williams@example.com',
    phone: '(555) 234-5678',
    skillMatch: 82,
    lastCompany: 'Amazon',
    experience: 4,
    status: 'pending',
    appliedDate: '2025-01-18',
    resumeUrl: '#',
  },
  {
    id: '4',
    name: 'Morgan Davis',
    email: 'morgan.davis@example.com',
    phone: '(555) 345-6789',
    skillMatch: 78,
    lastCompany: 'Apple',
    experience: 3,
    status: 'pending',
    appliedDate: '2025-01-19',
    resumeUrl: '#',
  },
  {
    id: '5',
    name: 'Jordan Miller',
    email: 'jordan.miller@example.com',
    phone: '(555) 456-7890',
    skillMatch: 73,
    lastCompany: 'Netflix',
    experience: 2,
    status: 'pending',
    appliedDate: '2025-01-20',
    resumeUrl: '#',
  },
];

const candidateSkills = {
  '1': ['React', 'JavaScript', 'TypeScript', 'CSS', 'HTML', 'Node.js', 'GraphQL'],
  '2': ['Python', 'Java', 'Spring Boot', 'SQL', 'MongoDB', 'Docker'],
  '3': ['JavaScript', 'Vue.js', 'CSS', 'HTML', 'Node.js', 'Express'],
  '4': ['React', 'JavaScript', 'CSS', 'HTML', 'Redux'],
  '5': ['Angular', 'TypeScript', 'CSS', 'HTML', 'RxJS'],
};

const HRModule: React.FC = () => {
  const [jobRole, setJobRole] = useState<string>('');
  const [requiredSkills, setRequiredSkills] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [showInterviewConfirm, setShowInterviewConfirm] = useState<boolean>(false);
  
  const calculateSkillMatch = (candidateId: string) => {
    const candidateSkillSet = candidateSkills[candidateId as keyof typeof candidateSkills] || [];
    if (requiredSkills.length === 0) return 0;
    
    const matchingSkills = requiredSkills.filter(skill => 
      candidateSkillSet.some(candidateSkill => 
        candidateSkill.toLowerCase() === skill.toLowerCase()
      )
    );
    
    return Math.round((matchingSkills.length / requiredSkills.length) * 100);
  };
  
  useEffect(() => {
    if (requiredSkills.length > 0) {
      const updatedCandidates = mockCandidates.map(candidate => ({
        ...candidate,
        skillMatch: calculateSkillMatch(candidate.id),
      }));
      
      setCandidates(updatedCandidates);
      
      if (selectedCandidate) {
        const updatedSelectedCandidate = updatedCandidates.find(c => c.id === selectedCandidate.id);
        if (updatedSelectedCandidate) {
          setSelectedCandidate(updatedSelectedCandidate);
        }
      }
    }
  }, [requiredSkills]);

  const handleRoleSelect = (role: string) => {
    setJobRole(role);
    
    const roleSkillsMap: Record<string, string[]> = {
      'Frontend Developer': ['React', 'JavaScript', 'CSS', 'HTML', 'Responsive Design'],
      'Backend Developer': ['Node.js', 'Python', 'SQL', 'API Design', 'Cloud Services'],
      'UX Designer': ['Figma', 'User Research', 'Wireframing', 'Prototyping', 'Visual Design'],
      'Data Scientist': ['Python', 'Machine Learning', 'SQL', 'Data Visualization', 'Statistics'],
      'Project Manager': ['Agile', 'Scrum', 'JIRA', 'Risk Management', 'Stakeholder Communication'],
    };
    
    setRequiredSkills(roleSkillsMap[role] || []);
    setCandidates(mockCandidates);
  };
  
  const addSkill = (skill: string) => {
    if (skill && !requiredSkills.includes(skill)) {
      setRequiredSkills([...requiredSkills, skill]);
    }
  };
  
  const removeSkill = (skill: string) => {
    setRequiredSkills(requiredSkills.filter(s => s !== skill));
  };
  
  const handleCandidateSelect = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
  };
  
  const sendInterviewInvite = () => {
    if (!selectedCandidate) return;
    
    const updatedCandidates = candidates.map(candidate => 
      candidate.id === selectedCandidate.id 
        ? { ...candidate, status: 'interview' as ApplicationStatus } 
        : candidate
    );
    
    setCandidates(updatedCandidates);
    setSelectedCandidate({ ...selectedCandidate, status: 'interview' });
    setShowInterviewConfirm(true);
    
    setTimeout(() => {
      setShowInterviewConfirm(false);
    }, 5000);
  };
  
  const filteredCandidates = candidates.filter(candidate => 
    candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    candidate.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">HR Recruitment Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Screen, review, and manage candidates with AI assistance
        </p>
      </div>
      
      {!jobRole ? (
        <JobRoleSelector onRoleSelect={handleRoleSelect} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-5 mb-6">
              <h2 className="text-xl font-semibold mb-4">Job Requirements</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Role
                </label>
                <div className="flex items-center justify-between">
                  <span className="text-gray-900">{jobRole}</span>
                  <button
                    onClick={() => setJobRole('')}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Change
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Required Skills
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {requiredSkills.map((skill, index) => (
                    <div
                      key={index}
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                    >
                      {skill}
                      <button 
                        className="ml-1.5 text-indigo-600 hover:text-indigo-900"
                        onClick={() => removeSkill(skill)}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="flex mt-2">
                  <input
                    type="text"
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Add another skill"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        addSkill(e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                  <button
                    className="px-3 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700"
                    onClick={() => {
                      const input = document.querySelector('input');
                      if (input) {
                        addSkill(input.value);
                        input.value = '';
                      }
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Candidate Screening</h2>
                <div className="text-sm text-gray-500">
                  {filteredCandidates.length} candidates
                </div>
              </div>
              
              <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Search candidates"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex items-center mb-4 space-x-2 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                  <span>&gt;80% match</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
                  <span>70-80% match</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-gray-300 mr-1"></div>
                  <span>&lt;70% match</span>
                </div>
              </div>
              
              <CandidateList 
                candidates={filteredCandidates}
                selectedCandidate={selectedCandidate}
                onSelectCandidate={handleCandidateSelect}
              />
            </div>
          </div>
          
          <div className="lg:col-span-2">
            {selectedCandidate ? (
              <CandidateSummary 
                candidate={selectedCandidate}
                onSendInterview={sendInterviewInvite}
              />
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 h-full flex flex-col items-center justify-center text-center">
                <User className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No Candidate Selected</h3>
                <p className="text-gray-500 max-w-md">
                  Select a candidate from the list to view their detailed profile and AI-generated summary
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Interview Invitation Confirmation */}
      {showInterviewConfirm && (
        <div className="fixed bottom-6 right-6 bg-green-100 border-l-4 border-green-500 p-4 rounded shadow-lg max-w-md animate-slide-up">
          <div className="flex">
            <div className="flex-shrink-0">
              <Send className="h-5 w-5 text-green-500" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">Interview Invitation Sent!</h3>
              <div className="mt-1 text-sm text-green-700">
                Successfully sent interview invitation to {selectedCandidate?.name}
              </div>
              <button 
                className="mt-2 text-xs text-green-800 underline"
                onClick={() => setShowInterviewConfirm(false)}
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HRModule;