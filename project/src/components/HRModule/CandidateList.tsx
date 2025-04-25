import React from 'react';
import { Calendar, ChevronRight } from 'lucide-react';

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

interface CandidateListProps {
  candidates: Candidate[];
  selectedCandidate: Candidate | null;
  onSelectCandidate: (candidate: Candidate) => void;
}

const CandidateList: React.FC<CandidateListProps> = ({
  candidates,
  selectedCandidate,
  onSelectCandidate,
}) => {
  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'pending':
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">Pending</span>;
      case 'reviewed':
        return <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Reviewed</span>;
      case 'interview':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Interview</span>;
      case 'rejected':
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Rejected</span>;
      case 'hired':
        return <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">Hired</span>;
      default:
        return null;
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
  };
  
  const getMatchColor = (match: number) => {
    if (match >= 80) return 'bg-green-500';
    if (match >= 70) return 'bg-yellow-500';
    return 'bg-gray-300';
  };
  
  return (
    <div className="overflow-y-auto max-h-[600px] pr-1">
      {candidates.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No candidates found
        </div>
      ) : (
        <ul className="space-y-3">
          {candidates.map((candidate) => (
            <li 
              key={candidate.id}
              className={`rounded-lg border overflow-hidden transition-all ${
                selectedCandidate?.id === candidate.id
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <button
                className="w-full text-left p-4"
                onClick={() => onSelectCandidate(candidate)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full ${getMatchColor(candidate.skillMatch)} mr-2`}></div>
                      <h3 className="text-sm font-medium text-gray-900 truncate">{candidate.name}</h3>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {candidate.lastCompany} • {candidate.experience} {candidate.experience === 1 ? 'year' : 'years'}
                    </p>
                  </div>
                  <div className="flex flex-col items-end ml-4">
                    <div className="text-sm font-medium text-gray-900">{candidate.skillMatch}%</div>
                    <div className="text-xs text-gray-500">match</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDate(candidate.appliedDate)}
                  </div>
                  {getStatusBadge(candidate.status)}
                </div>
                
                <div className="flex items-center justify-between mt-3">
                  <div className="text-xs text-gray-500 truncate max-w-[70%]">
                    {candidate.email}
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CandidateList;